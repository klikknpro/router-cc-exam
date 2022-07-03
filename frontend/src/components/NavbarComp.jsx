import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";
import { Button } from "react-bootstrap";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const NavbarComp = () => {
  const navigate = useNavigate();
  const { auth, token, logout } = useAuth();

  const nav = (path) => {
    // console.log("rerouting");
    navigate(path);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;

/*
<nav className="navbar">
      <Button onClick={() => nav("/")} variant="contained" size="small">
        Home
      </Button>
      <Button onClick={() => nav("/profile")} variant="contained" size="small">
        My Profile
      </Button>
      {token ? (
        <Button onClick={logout} variant="contained" color="secondary" size="small">
          Logout
        </Button>
      ) : (
        <Button onClick={auth} variant="contained" color="info" size="small">
          Google login
        </Button>
      )}
    </nav>
*/
