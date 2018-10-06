import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem, Row, Col } from 'reactstrap';
import ContentLoader from "react-content-loader";
import axios from 'axios';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import NewQuestion from './NewQuestion';
import NewBet from './NewBet';
import PickUpBet from './PickUpBet';
import classNames from 'classnames';
import './Questions.css';

const titles = {
  'all': 'All Questions',
  'sports': 'Sports',
  'politics': 'Politics',
  'financials': 'Financials',
  'entertainment': 'Entertainment',
  'e-sports': 'e-Sports'
}

const MyLoader = props => (
	<ContentLoader
		speed={2}
    width={600}
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
		{...props}
	>
		<rect x="0" y="15" rx="5" ry="5" width="600" height="20" />
		<rect x="0" y="45" rx="5" ry="5" width="600" height="20" />
		<rect x="0" y="75" rx="5" ry="5" width="600" height="20" />
		<rect x="0" y="105" rx="5" ry="5" width="600" height="25" />
	</ContentLoader>
)

export default class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      isLoading: true,
      title: undefined,
      initialQuestions: [],
      questions: [],
      displayNewQuestion: false,
      newBetQuestion: null,
      newBetDefaultValue: "",
      pickUpBetData: null,
      collapsedId: 0,
    }

    this.filterList = this.filterList.bind(this)
    this.toggleDisplayNewQuestion = this.toggleDisplayNewQuestion.bind(this)
    this.displayNewBet = this.displayNewBet.bind(this)
  }

  componentDidMount() {
    this.loadQuestions(this.props.match.params.category);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.match.params.category !== nextProps.match.params.category) {
      this.loadQuestions(nextProps.match.params.category);
      this.setState({ displayNewQuestion: false, newBetQuestion: null, pickUpBetData: null });
    }
  }

  loadQuestions(category) {
    this.setState({ isLoading: true, error: false, title: titles[category] });
    axios.get(`http://localhost:4000/questions/${category}`)
    .then(res => {
      const questions = res.data.questions;
      console.log(questions);
      this.setState({ initialQuestions: questions, questions, isLoading: false });
    })
    .catch(error => {
      console.log(error);
      this.setState({ isLoading: false, error: true });
    });
  }

  filterList(event) {
    var updatedList = this.state.initialQuestions;
    updatedList = updatedList.filter(function(item){
      return item.title.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({ questions: updatedList });
  }

  toggleDisplayNewQuestion() {
    this.setState({ displayNewQuestion: ! this.state.displayNewQuestion });
  }

  displayNewBet(question, defaultValue) {
    this.setState({ newBetQuestion: question, newBetDefaultValue: defaultValue });
  }

  hideNewBet() {
    this.setState({ newBetQuestion: null, newBetDefaultValue: "" });
  }

  displayPickUpBet(title, option, bet) {
    this.setState({
      pickUpBetData: {
        title,
        option,
        bet
      }
    });
  }

  hidePickUpBet() {
    this.setState({ pickUpBetData: null });
  }

  setCollapsedId(collapsedId) {
    this.setState({ collapsedId });
  }

  renderQuestions() {
    const { error, isLoading, initialQuestions, questions, collapsedId } = this.state;
    if (error === true) {
      return(<div>An error ocurred. Please reload the page.</div>);
    } else if (isLoading === true) {
      return <MyLoader />;
    } else if (initialQuestions.length > 0) {
      return(
        <div>
          <div className="input-group">
            <input placeholder="Search" className="questionsSearch" onChange={this.filterList} />
           </div>
           <ListGroup>
             {questions.map((question) => (
               <ListGroupItem key={question.id}
                onClick={collapsedId !== question.id ? () => this.setCollapsedId(question.id) : null}
                className={classNames({ notcollapsed: collapsedId !== question.id })}
                >{question.title}
               { collapsedId === question.id
                 ? <FontAwesomeIcon icon={faChevronUp} className="questionChevronIcon" onClick={() => this.setCollapsedId(0)} />
                 : <FontAwesomeIcon icon={faChevronDown} className="questionChevronIcon" onClick={() => this.setCollapsedId(question.id)} />
               }
               <Row className={classNames({ betOverview: true, betOverviewVisible: collapsedId === question.id })}>
                <Col md={12} className="settleDateInfo">
                  Settles on <Moment format="MM/DD HH:mm">{question.settle_date}</Moment>
                </Col>
                <Col md={6} className="betOptionColumn">
                  <h4>YES</h4>
                  <Button onClick={() => this.displayNewBet(question, "yes")} className="buttonAddBet">+</Button>
                  {question.primary_bets.filter(bet => bet.option === "no" && bet.available_amount > 0).map((bet) => (
                    <div className="betDetails" key={"betdetails-" + bet.id}>
                      <span className="oddsText">{bet.odds_denominator} to {bet.odds_numerator}</span>
                      ${bet.available_amount}
                      <Button className="betButton" onClick={() => this.displayPickUpBet(question.title, "yes", bet)}>BET</Button>
                    </div>
                  ))}
                </Col>
                <Col md={6} className="betOptionColumn">
                  <h4>NO</h4>
                  <Button onClick={() => this.displayNewBet(question, "no")} className="buttonAddBet">+</Button>
                  {question.primary_bets.filter(bet => bet.option === "yes" && bet.available_amount > 0).map((bet) => (
                    <div className="betDetails" key={"betdetails-" + bet.id}>
                      <span className="oddsText">{bet.odds_denominator} to {bet.odds_numerator}</span>
                      ${bet.available_amount}
                      <Button className="betButton" onClick={() => this.displayPickUpBet(question.title, "no", bet)}>BET</Button>
                    </div>
                  ))}
                </Col>
               </Row>
               </ListGroupItem>
             ))}
           </ListGroup>
         </div>
       );
    } else {
      return(<div>No questions.</div>);
    }
  }

  // TODO If category doesn't exist, redirect to home or 404 page.
  render() {
    const { title, displayNewQuestion, newBetQuestion, newBetDefaultValue, pickUpBetData } = this.state;
    const defaultCategory = this.props.match.params.category !== "all" ? this.props.match.params.category : "entertainment";
    return (
      <div className="Questions">
        <div className="questionsHeader">
          <h2>{title}</h2>
          <Button color="secondary" onClick={this.toggleDisplayNewQuestion}>+ Suggest new question</Button>
        </div>
        { this.renderQuestions() }
        { displayNewQuestion &&
          <NewQuestion
            close={this.toggleDisplayNewQuestion.bind(this)}
            reload={() => this.loadQuestions(this.props.match.params.category)}
            defaultCategory={defaultCategory} />
        }
        { newBetQuestion !== null &&
          <NewBet
            close={this.hideNewBet.bind(this)}
            reload={() => this.loadQuestions(this.props.match.params.category)}
            question={newBetQuestion}
            defaultValue={newBetDefaultValue} />
        }
        { pickUpBetData !== null &&
          <PickUpBet
          close={this.hidePickUpBet.bind(this)}
          reload={() => this.loadQuestions(this.props.match.params.category)}
          data={pickUpBetData} />
        }
      </div>
    );
  }
}
