import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldEllipsis, LogOut, Wrench, KeyRound } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import "./Nav.css";

const Nav = () => {
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleAdminDropdown = (e) => {
    e.stopPropagation();
    setIsAdminDropdownOpen(!isAdminDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsAdminDropdownOpen(false);
    navigate("/");
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsAdminDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
          <div
            className="nav-link admin-icon"
            onClick={toggleAdminDropdown}
            ref={dropdownRef}
          >
            <ShieldEllipsis />
            {isAdminDropdownOpen && (
              <div className="admin-dropdown">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/admin"
                      className="dropdown-link"
                      onClick={() => setIsAdminDropdownOpen(false)}
                    >
                      <Wrench size={16} />
                      Control Panel
                    </Link>
                    <button onClick={handleLogout} className="dropdown-link">
                      <LogOut size={16} /> Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/admin/login"
                    className="dropdown-link"
                    onClick={() => setIsAdminDropdownOpen(false)}
                  >
                    <KeyRound size={16} />
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
