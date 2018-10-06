import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, InputGroupAddon, InputGroup } from 'reactstrap';
import './PickUpBet.css';
import axios from 'axios';
import { connect } from 'react-redux';

// TODO some css classes are duplicated from newquestion and PickUpBet. should combine them.
class PickUpBet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isWaitingResponse: false,
      success: false,
      error: false,
      amount: 0.0
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ option: this.props.defaultValue });
  }

  handleSubmit() {
    const { amount } = this.state;
    const { currentUser } = this.props;
    this.setState({ isWaitingResponse: true, error: false, success: false });
    axios.post(`http://localhost:4000/pick_bet`, {
      user_id: currentUser.id,
      amount,
      bet_primary_id: this.props.data.bet.id
    })
    .then(res => {
      this.setState({ isWaitingResponse: false, success: true });
      this.props.reload();
    })
    .catch(error => {
      this.setState({ isWaitingResponse: false, error: true });
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { data } = this.props;
    const { isWaitingResponse, success, error } = this.state;
    return (
      <div className="PickUpBetBg">
        <div className="PickUpBet">
          { isWaitingResponse &&
            <div>
              <h4>Submitting...</h4>
              <span className="closeButton" onClick={this.props.close}>x</span>
            </div>
          }
          { !isWaitingResponse && success &&
            <div>
              <h4>Success!</h4>
              <span className="closeButton" onClick={this.props.close}>x</span>
            </div>
          }
          { !isWaitingResponse && error &&
            <div>
              <h4>Error!</h4>
              <span className="closeButton" onClick={this.props.close}>x</span>
            </div>
          }
          { !isWaitingResponse && !error && !success &&
            <div>
              <Row>
                <Col xs={12}>
                  <h4>{data.title}</h4>
                  <span className="closeButton" onClick={this.props.close}>x</span>
                </Col>
              </Row>
              <Form onSubmit={this.handleSubmit}>
                <Row>
                  <Col md={5}>
                    <div className="pickUpBetOption">{data.option}</div>
                  </Col>
                  <Col md={7}>
                    <FormGroup>
                      <h6>{data.bet.odds_denominator} to {data.bet.odds_numerator} odds</h6>
                      <h6>Total Amount: ${data.bet.available_amount}</h6>
                      <br />
                      <Label for="amount">Your amount</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                        <Input type="number" min="1" step="1" max={data.bet.available_amount} name="amount" id="amount" required onChange={this.handleChange}/>
                        <InputGroupAddon addonType="append">.00</InputGroupAddon>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Button>Bet</Button>
              </Form>
            </div>
          }
          <div className="clearfix"></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  currentUser: store.clickState.currentUser
});

export default connect(mapStateToProps)(PickUpBet);
