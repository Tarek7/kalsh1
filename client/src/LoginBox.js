import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButton } from './actions';

import './LoginBox.css';

class LoginBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    const { clickButton } = this.props;
    e.preventDefault();
    clickButton(this.state.email);
    this.props.close();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="LoginBoxBg">
        <div className="LoginBox">
          <div>
            <h4>Login</h4>
            <span className="closeButton" onClick={this.props.close}>x</span>
          </div>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" required onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" id="password" required />
            </FormGroup>
            <Button>Login</Button>
          </Form>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  currentUser: store.clickState.currentUser
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clickButton }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox);
