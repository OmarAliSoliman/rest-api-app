import React, { Component } from "react";

//react bootstrap
import {Navbar, Nav, Container} from 'react-bootstrap';

// react router dom
import {NavLink} from 'react-router-dom'

class NavBar extends Component {
  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink activeClassName="active" className="nav-link" to="/">Admin</NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
