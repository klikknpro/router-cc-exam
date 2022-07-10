import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";
// import { button } from "@mui/material";

const NavbarComp = () => {
  const navigate = useNavigate();
  const { auth, token, logout } = useAuth();

  const nav = (path) => {
    // console.log("rerouting");
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h1 className="logo-title">router</h1>
        <h2 className="logo-subtitle">better prepare</h2>
      </div>
      <div className="navbar-menu">
        <button onClick={() => nav("/")} className="menu-home">
          home
        </button>
        {token && (
          <button onClick={() => nav("/my-routes")} className="menu-myRoutes">
            my routes
          </button>
        )}
        {token ? (
          <button onClick={logout} className="menu-logout">
            logout
          </button>
        ) : (
          <button onClick={auth} className="menu-login">
            login
          </button>
        )}
      </div>
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
