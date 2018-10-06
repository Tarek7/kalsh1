import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import ContentLoader from "react-content-loader";
import axios from 'axios';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import './MyBets.css';
import { Button, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import NewQuestion from './NewQuestion';
import NewBet from './NewBet';
import PickUpBet from './PickUpBet';
import classNames from 'classnames';
import './Questions.css';
import qs from 'qs';

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

class AdminBets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      isLoading: true,
      title: undefined,
      bets: []
    }
      this.settleQuestionNo = this.settleQuestionNo.bind(this)
      this.settleQuestionYes = this.settleQuestionYes.bind(this)
  }

  settleQuestionYes(question) {

    const url = 'http://localhost:4000/settle_yes'
    const data = {
        question_primary_id: question.id,
    }
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url,
    };
    return axios(options).then(function (response) {
        console.log(response.data)
        })
      .catch(error => {
        throw error;
      });
    //question_primary_id
    // axios.post(`http://localhost:4000/settle_yes`, {
    //   question_primary_id: question.id,
    // })
    // .then(res => {
    //   this.setState({ isWaitingResponse: false, success: true });
    //   this.props.reload();
    // })
    // .catch(error => {
    //   this.setState({ isWaitingResponse: false, error: true });
    // });
    // alert('Settling question ' + question.id + ' YES')
  }

  settleQuestionNo(question) {
    const url = 'http://localhost:4000/settle_no'
    const data = {
        question_primary_id: question.id,
    }
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url,
    };
    return axios(options).then(function (response) {
        console.log(response.data)
        })
      .catch(error => {
        throw error;
      });
  }

  componentDidMount() {
    this.loadQuestions('All Questions');
  }

  setCollapsedId(collapsedId) {
    this.setState({ collapsedId });
  }

  loadQuestions(category) {
    this.setState({ isLoading: true, error: false, title: titles[category] });
    axios.get(`http://localhost:4000/questions/all`)
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
                  <h4>SETTLE FOR YES</h4>
                  <Button onClick={() => this.settleQuestionYes(question, "yes")} className="buttonAddBet">Settle Yes</Button>
                  {question.primary_bets.filter(bet => bet.option === "no" && bet.available_amount > 0).map((bet) => (
                    <div className="betDetails" key={"betdetails-" + bet.id}>
                      <span className="oddsText">{bet.odds_denominator} to {bet.odds_numerator}</span>
                      ${bet.available_amount}
                      <Button className="betButton" onClick={() => this.displayPickUpBet(question.title, "yes", bet)}>BET</Button>
                    </div>
                  ))}
                </Col>
                <Col md={6} className="betOptionColumn">
                  <h4>SETTLE FOR NO</h4>
                  <Button onClick={() => this.settleQuestionNo(question, "no")} className="buttonAddBet">SETTLE NO</Button>
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
    return (
      <div className="Questions">
        <div className="questionsHeader">
          <h2>Admin Page</h2>
        </div>
        { this.renderQuestions() }
      </div>
    );
  }
}

const mapStateToProps = store => ({
  currentUser: store.clickState.currentUser
});

export default connect(mapStateToProps)(AdminBets);
