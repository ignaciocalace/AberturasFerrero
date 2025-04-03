import React from "react";
import { NavLink } from "react-router-dom";
import "./NavFooter.scss";

function NavFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="nav-footer">
      <nav className="nav">
        <NavLink to="/" className="nav-link" activeclassname="active">
          Inicio
        </NavLink>
        <NavLink to="/servicios" className="nav-link" activeclassname="active">
          Servicios
        </NavLink>
        <NavLink to="/trabajos" className="nav-link" activeclassname="active">
          Trabajos
        </NavLink>
        <NavLink to="/nosotros" className="nav-link" activeclassname="active">
          Nosotros
        </NavLink>
        <NavLink to="/contacto" className="nav-link" activeclassname="active">
          Contacto
        </NavLink>
      </nav>
      <p className="text-muted">
        © {currentYear} Creado por
        <a
          href="https://www.ignaciocalace.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Ignacio Calace
        </a>
      </p>
    </footer>
  );
}

export default NavFooter;
