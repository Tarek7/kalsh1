import React, { Component } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom'
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import './Header.css';
import logo from './images/logo_white.png';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div className="Header">
        <Navbar dark expand="md" className="Navbar" fixed="top">
          <Container>
            <NavbarBrand tag={RRNavLink} to="/"><img src={logo} alt="Kalshi" /></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/about/">About</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/mybets/">My Bets</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/signup/">Sign Up</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login/">Login</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        <Navbar dark expand="md" className="SubNavbar" fixed="top">
          <Container className="justify-content-center">
            <Nav navbar>
              <NavItem>
                <NavLink tag={RRNavLink} to="/questions/all/">All</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/questions/sports/">Sports</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/questions/politics/">Politics</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/questions/financials/">Financials</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/questions/entertainment/">Entertainment</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/questions/e-sports/">e-Sports</NavLink>
              </NavItem>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}
