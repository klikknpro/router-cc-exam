import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";
import { Button } from "@mui/material";
import logo from "../img/router_logo.png";

const NavbarComp = () => {
  const navigate = useNavigate();
  const { auth, token, logout } = useAuth();

  const nav = (path) => {
    // console.log("rerouting");
    navigate(path);
  };

  return (
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
  );
};

export default NavbarComp;

/*
import { Navbar, Container, Nav } from "react-bootstrap";

    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} width="280" className="d-inline-block align-top" alt="Router Project" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/feed">
              Feed
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              My Profile
            </Nav.Link>
            {token ? <Nav.Item onClick={logout}>Logout</Nav.Item> : <Nav.Item onClick={auth}>Google login</Nav.Item>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
*/
