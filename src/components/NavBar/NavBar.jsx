import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <Navbar
      className={`nav-bar ${isHomePage ? "nav-bar-home" : ""}`}
      expand="lg"
    >
      {isHomePage && (
        <div className="navbar-bg">
          <h1>Carpinteria de aluminio y herreria</h1>
        </div>
      )}
      <Container className="navbar-content">
        <NavLink to="/">
          <Navbar.Brand className="brand-name">
            <h2>
              Aberturas <span>Ferrero</span>
            </h2>
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="menu">
            <NavLink to="/trabajos" className="nav-link">
              Trabajos
            </NavLink>
            <NavLink to="/servicios" className="nav-link">
              Servicios
            </NavLink>
            <NavLink to="/nosotros" className="nav-link">
              Nosotros
            </NavLink>
            <NavLink to="/contacto" className="nav-link">
              Contacto
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
