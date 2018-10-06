import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, InputGroupAddon, InputGroup } from 'reactstrap';
import './NewBet.css';
import axios from 'axios';

// TODO share some classes with newquestion
export default class NewBet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isWaitingResponse: false,
      success: false,
      error: false,
      option: "",
      odd_numerator: undefined,
      odd_denominator: undefined,
      amount: 0.0
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ option: this.props.defaultValue });
  }

  handleSubmit() {
    const { odds_numerator, odds_denominator, option, amount } = this.state;
    this.setState({ isWaitingResponse: true, error: false, success: false });
    axios.post(`http://localhost:4000/bet_primary`, {
      user_id: 1,
      odds_numerator,
      odds_denominator,
      option,
      amount,
      question_id: this.props.question.id
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
    const { defaultValue, question } = this.props;
    const { isWaitingResponse, success, error } = this.state;
    return (
      <div className="NewBetBg">
        <div className="NewBet">
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
                  <h4>{question.title}</h4>
                  <span className="closeButton" onClick={this.props.close}>x</span>
                </Col>
              </Row>
              <Form onSubmit={this.handleSubmit}>
                <Row>
                  <Col md={5}>
                    <FormGroup>
                      <Input type="select" name="option" id="option" defaultValue={defaultValue} onChange={this.handleChange} required>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={7}>
                    <FormGroup>
                      <Label>Your odds</Label>
                      <InputGroup>
                        <Input type="number" min="1" max="100" name="odds_numerator" id="odds_numerator" required onChange={this.handleChange}/>
                        <span className="odds_to">to</span>
                        <Input type="number" min="1" max="100" name="odds_denominator" id="odds_denominator" required onChange={this.handleChange}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Label for="amount">Amount</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                        <Input type="number" min="1" step="1" name="amount" id="amount" required onChange={this.handleChange}/>
                        <InputGroupAddon addonType="append">.00</InputGroupAddon>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Button>Place Bet</Button>
              </Form>
            </div>
          }
          <div className="clearfix"></div>
        </div>
      </div>
    )
  }
}
