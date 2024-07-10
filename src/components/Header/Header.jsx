import React from "react";
import { Scissors } from "lucide-react";
import Nav from "../Nav/Nav";
import "./Header.css";

const Header = () => (
  <header className="header">
    <div className="header-content">
      <h1 className="logo">
        <Scissors className="logo-icon" size={40} />
        <span className="logo-text">Costura a Tu Gusto</span>
      </h1>
      <Nav />
    </div>
  </header>
);

export default Header;
