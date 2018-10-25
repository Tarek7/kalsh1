import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Col, Row, Button, Form, FormGroup, Label, Input, InputGroupAddon, InputGroup  } from 'reactstrap';
import ContentLoader from "react-content-loader";
import axios from 'axios';
import Moment from 'react-moment';
import { connect } from 'react-redux';
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

class MyBets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      isLoading: true,
      title: undefined,
      bets: [],
			balance: 0,
      showing_transfer_stuff: false,
      displayingSuccess: false,
    }
    this.renderBalance = this.renderBalance.bind(this);
    this.setShowStuffToTrue = this.setShowStuffToTrue.bind(this);
    this.moneyTransferRequest = this.moneyTransferRequest.bind(this);
    // this.displayingSuccess = this.displayingSuccess.bind(this);
  }

  componentDidMount() {
    this.loadBets();
  }

  loadBets() {
		const { currentUser } = this.props;
    this.setState({ isLoading: true, error: false, balance: currentUser.balance });
    axios.get(`http://localhost:4000/mybets`, { params: {
      user_id: currentUser.id
    }})
    .then(res => {
      const bets = res.data.bets;
      this.setState({ bets, isLoading: false });
    })
    .catch(error => {
      console.log(error);
      this.setState({ isLoading: false, error: true });
    });
  }

  setShowStuffToTrue() {
    this.setState({showing_transfer_stuff: true});
  }

  moneyTransferRequest() {
    this.setState({transfer_message: 'Transfer initaited: click here to see the transaction'})
  }


  renderBalance() {
    if (this.state.showing_transfer_stuff == true) {
    console.log('inside render balance')
    const { currentUser } = this.props;
    const { isLoading, error, balance } = this.state;
    if (error === true) {
     return (
       <div>
         <h4>Error!</h4>
         <span className="closeBButton">x</span>
       </div>
      )
    } else if (isLoading === false && balance != undefined) {
      return (
        <div>
            <Row>
              <Col xs={12}>
                <h4>Transfer balance</h4>
                <span className="closeButton">x</span>
              </Col>
            </Row>
            <Form >
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="amount">Amount</Label>
                    <Input type="select" name="category" id="category" onChange={this.handleChange}>
                      <option value="entertainment"> 1.00 </option>
                      <option value="sports">Edit amount</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="category">Stable coin wallet</Label>
                    <Input type="select" name="category" id="category" onChange={this.handleChange}>
                      <option value="entertainment">0x123f681646d4a755815f9cb19e1acc8565a0c2ac</option>
                      <option value="sports">Add wallet</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <br/>
            </Form>
                          <button onClick={this.moneyTransferRequest}>Transfer Balance</button>
                           <a href = 'https://etherscan.io/tx/0xcca83cd362e9a5af42ab4dc6a76286c68b2ee696a433908b376cb65fe6d968f9'>{this.state.transfer_message}</a>
          </div>
        )
      }
    }
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
               <ListGroupItem key={"bet-" + bet.id + "-" + bet.option}>
               <b>{bet.question.title}</b>
               <br />
               {bet.option === "yes" ?
                 <div>
                   <span className="myBetsOption">YES</span>
                   <span>{bet.yes_odds_numerator} to {bet.yes_odds_denominator}</span>
                   <span>${bet.amount}</span>
                   <span><Moment format="MM/DD HH:mm">{bet.question.settle_date}</Moment></span>
                   <div className="myBetsResult">{bet.settled ? "SETTLED": "NOT SETTLED"}</div>
                 </div>
               :
                 <div>
                   <span className="myBetsOption">NO</span>
                   <span>{bet.yes_odds_denominator} to {bet.yes_odds_numerator}</span>
                   <span>${bet.amount}</span>
                   <span><Moment format="MM/DD HH:mm">{bet.question.settle_date}</Moment></span>
                   <div className="myBetsResult">{bet.settled ? "SETTLED": "NOT SETTLED"}</div>
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

	renderBalanceButton() {
		const { bets, balance, isLoading, error } = this.state;
		if (error === true) {
			return (
				<div>
					<h4>Error!</h4>
					<span className="closeBButton">x</span>
				</div>
			)
		} else if (isLoading === false && balance != undefined) {
			return (
        <div className="Balance">
          <button onClick={this.setShowStuffToTrue}> Balance: ${balance} </button>
        </div>
      )
		}
  }


  // TODO If category doesn't exist, redirect to home or 404 page.
  render() {
    return (
      <div className="Questions">
        <div className="questionsHeader">
          <h2>My Bets</h2>
        </div>
        { this.renderBets() }
        { this.renderBalanceButton() }
        { this.renderBalance() }
      </div>
    );
  }
}

const mapStateToProps = store => ({
  currentUser: store.clickState.currentUser
});

export default connect(mapStateToProps)(MyBets);
