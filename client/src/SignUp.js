import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class SignUp extends Component {
  render() {
    return (
      <div>
        <h2>Sign Up</h2>
        {/*
          <form id="signup" name="signup" method="post" action="http://localhost:4000/signin">
            <label for="email">Email Address</label>
            <input class="text" name="email" type="email" />
            <label for="username">Firstname</label>
            <input name="username" type="text" />
            <label for="password">Password</label>
            <input name="password" type="password" />
            <input class="btn" type="submit" value="Sign Up teste" />
          </form>
        */}
        <Form>
          <Row form>
            <Col md={5}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" required />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="birthdate">Date of Birth</Label>
                <Input type="date" name="birthdate" id="birhdate" required />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" required />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input type="text" name="username" id="username" required />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" required />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="password_confirm">Re-type password</Label>
                <Input type="password" name="password_confirm" id="password_confirm" required />
              </FormGroup>
            </Col>
          </Row>
          <hr />
          <h5>Billing Details</h5>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="cc_number">Credit Card Number</Label>
                <Input type="text" name="cc_number" id="cc_number" />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="ccv">CCV</Label>
                <Input type="text" name="ccv" id="ccv" />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="cc_expiration_date">Expiration Date</Label>
                <Input type="date" name="cc_expiration_date" id="cc_expiration_date" />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="cc_name">Name on Card</Label>
                <Input type="text" name="cc_name" id="cc_name" />
              </FormGroup>
            </Col>
          </Row>
          <Button>Create Account</Button>
        </Form>
      </div>
    );
  }
}

export default SignUp;
