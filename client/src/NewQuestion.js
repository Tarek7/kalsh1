import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './NewQuestion.css';
import axios from 'axios';

export default class NewQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isWaitingResponse: false,
      success: false,
      error: false,
      title: '',
      category: '',
      settle_date: '',
      settle_time: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ category: this.props.defaultCategory });
  }

  handleSubmit() {
    const { title, category, settle_date, settle_time } = this.state;
    this.setState({ isWaitingResponse: true, error: false, success: false });
    axios.post(`http://localhost:4000/question`, {
      title,
      category,
      settle_date: settle_date + ' ' + settle_time
    })
    .then(res => {
      this.setState({ isWaitingResponse: false, success: true });
      this.props.reload();
    })
    .catch(error => {
      console.log(error);
      this.setState({ isWaitingResponse: false, error: true });
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { defaultCategory } = this.props;
    const { isWaitingResponse, success, error } = this.state;
    return (
      <div className="NewQuestionBg">
        <div className="NewQuestion">
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
                  <h4>New Question</h4>
                  <span className="closeButton" onClick={this.props.close}>x</span>
                </Col>
              </Row>
              <Form onSubmit={this.handleSubmit}>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="title">Title</Label>
                      <Input type="text" name="title" id="title" required onChange={this.handleChange}/>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="category">Category</Label>
                      <Input type="select" name="category" id="category" defaultValue={defaultCategory} onChange={this.handleChange}>
                        <option value="entertainment">Entertainment</option>
                        <option value="e-sports">e-Sports</option>
                        <option value="financials">Financials</option>
                        <option value="politics">Politics</option>
                        <option value="sports">Sports</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={8}>
                    <Row>
                      <Col xs={7}>
                        <FormGroup>
                          <Label for="settle_date">Settle Date</Label>
                          <Input type="date" name="settle_date" id="settle_date" required onChange={this.handleChange} />
                        </FormGroup>
                      </Col>
                      <Col xs={5}>
                        <FormGroup>
                          <Label for="settle_time">&nbsp;</Label>
                          <Input type="time" name="settle_time" id="settle_time" required onChange={this.handleChange} defaultValue="00:00"/>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button>Suggest Question</Button>
              </Form>
            </div>
          }
          <div className="clearfix"></div>
        </div>
      </div>
    )
  }
}
