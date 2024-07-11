import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldEllipsis } from "lucide-react";
import "./Nav.css";

const Nav = () => {
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);

  const toggleAdminDropdown = () => {
    setIsAdminDropdownOpen(!isAdminDropdownOpen);
  };

  return (
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
        <li className="nav-item">
          <div className="nav-link admin-icon" onClick={toggleAdminDropdown}>
            <ShieldEllipsis />
          </div>
          {isAdminDropdownOpen && (
            <div className="admin-dropdown">
              <Link to="/admin/login" className="dropdown-link">
                Login
              </Link>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
