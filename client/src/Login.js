import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <h2>Login</h2>
        <Form>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" required />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" required />
          </FormGroup>
          <Button>Login</Button>
        </Form>
      </div>
    );
  }
}

export default Login;
