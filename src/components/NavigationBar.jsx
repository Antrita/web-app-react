// src/components/NavigationBar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

function NavigationBar() {
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">My Notes</Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-menu" />
        <Navbar.Collapse id="nav-menu">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/"
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/notes"
              className={location.pathname === '/notes' ? 'active' : ''}
            >
              Notes
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/todos"
              className={location.pathname === '/todos' ? 'active' : ''}
            >
              To-Do
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;