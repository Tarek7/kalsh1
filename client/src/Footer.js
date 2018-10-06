import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row } from 'reactstrap';
import facebook from './images/icon_facebook.png';
import instagram from './images/icon_instagram.png';
import twitter from './images/icon_twitter.png';
import './Footer.css';

const Footer = () => (
  <footer className="Footer">
    <Container className="p-3">
      <Row>
        <Col sm={6}>
          <div className="footerLinks">
            <Link to='/contact'>Contact</Link>
            <Link to='/faq'>FAQ</Link>
            <Link to='/help'>Help</Link>
          </div>
        </Col>
        <Col sm={6} className="footerIcons">
          <div>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><img src={facebook} alt="Facebook" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="Instagram" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><img src={twitter} alt="Twitter" /></a>
          </div>
          <h5>kalshi</h5>
        </Col>
      </Row>
    </Container>
  </footer>
)

export default Footer;
