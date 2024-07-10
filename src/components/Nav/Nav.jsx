import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => (
  <nav className="nav">
    <ul className="nav-list">
      {[
        { name: "Inicio", path: "/" },
        { name: "Productos", path: "/products" },
        { name: "Sobre", path: "/about" },
        { name: "Contacto", path: "/contact" },
      ].map((item) => (
        <li key={item.name} className="nav-item">
          <Link to={item.path} className="nav-link">
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav;
