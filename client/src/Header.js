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
import LoginBox from './LoginBox';

import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      displayLoginBox: false,
    };

    this.toggle = this.toggle.bind(this);
    this.toggleDisplayLoginBox = this.toggleDisplayLoginBox.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleDisplayLoginBox() {
    this.setState({ displayLoginBox: ! this.state.displayLoginBox });
  }

  render() {
    const { displayLoginBox } = this.state;
    const { currentUser } = this.props;
    return (
      <div>
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
                  { !currentUser.hasOwnProperty("isAdmin") &&
                  console.log("here")
                    // <NavItem>
                    //   <NavLink tag={RRNavLink} to="/admin/">Admin</NavLink>
                    // </NavItem>
                  }
                  { !currentUser.hasOwnProperty("id") &&
                    <NavItem>
                      <NavLink tag={RRNavLink} to="/signup/">Sign Up</NavLink>
                    </NavItem>
                  }
                  { !currentUser.hasOwnProperty("id")
                  ? <NavItem>
                      <NavLink onClick={this.toggleDisplayLoginBox} className="headerLoginLink">Login</NavLink>
                    </NavItem>
                  : <NavItem>
                      <NavLink tag={RRNavLink} to="/mybets/">My Bets</NavLink>
                    </NavItem>
                  }
                  { currentUser.hasOwnProperty("id") &&
                    <NavItem>
                      <NavLink tag={RRNavLink} to="/mybets/"> {currentUser.name}</NavLink>
                    </NavItem>
                  }
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
        {displayLoginBox &&
          <LoginBox
            close={this.toggleDisplayLoginBox.bind(this)}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = store => ({
  currentUser: store.clickState.currentUser
});

export default connect(mapStateToProps)(Header);
