import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem, Row, Col } from 'reactstrap';
import ContentLoader from "react-content-loader";
import axios from 'axios';
import Moment from 'react-moment';
import classNames from 'classnames';
import './MyBets.css';

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

export default class MyBets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      isLoading: true,
      title: undefined,
      bets: []
    }
  }

  componentDidMount() {
    this.loadBets();
  }

  loadBets() {
    this.setState({ isLoading: true, error: false });
    axios.get(`http://localhost:4000/mybets`, { params: {
      user_id: 1
    }})
    .then(res => {
      const bets = res.data.bets;
      console.log(bets);
      this.setState({ bets, isLoading: false });
    })
    .catch(error => {
      console.log(error);
      this.setState({ isLoading: false, error: true });
    });
  }

  renderBets() {
    const { bets, isLoading, error } = this.state;
    if (error === true) {
      return(<div>An error ocurred. Please reload the page.</div>);
    } else if (isLoading === true) {
      return <MyLoader />;
    } else if (bets.length > 0) {
      return(
        <div>
           <ListGroup className="MyBets">
             {bets.map((bet) => (
               <ListGroupItem key={"bet-" + bet.id}>
               <b>{bet.question.title}</b>
               <br />
               {bet.type === "primary" ?
                 <div>
                   <span className="myBetsOption">{bet.option}</span>
                   <span>{bet.odds_numerator} to {bet.odds_denominator}</span>
                   <span>${bet.amount}</span>
                   <span><Moment format="MM/DD HH:mm">{bet.question.settle_date}</Moment></span>
                   <div className="myBetsResult">NOT SETTLED</div>
                 </div>
               :
                 <div>
                   <span className="myBetsOption">{bet.primary_bet.option === "yes" ? "no":"yes"}</span>
                   <span>{bet.primary_bet.odds_numerator} to {bet.primary_bet.odds_denominator}</span>
                   <span>${bet.amount}</span>
                   <span><Moment format="MM/DD HH:mm">{bet.question.settle_date}</Moment></span>
                   <div className="myBetsResult">NOT SETTLED</div>
                 </div>
               }
               </ListGroupItem>
             ))}
           </ListGroup>
         </div>
       );
    } else {
      return(<div>No bets.</div>);
    }
  }

  // TODO If category doesn't exist, redirect to home or 404 page.
  render() {
    const { title, displayNewQuestion, newBetQuestion, newBetDefaultValue, pickUpBetData } = this.state;
    return (
      <div className="Questions">
        <div className="questionsHeader">
          <h2>My Bets</h2>
        </div>
        { this.renderBets() }
      </div>
    );
  }
}
