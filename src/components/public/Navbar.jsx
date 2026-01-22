import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { companyService } from "../../services/companyService";

const Navbar = () => {
  const location = useLocation();
  const [companyName, setCompanyName] = useState("Café Aroma");

  useEffect(() => {
    loadCompanyConfig();
  }, []);

  const loadCompanyConfig = async () => {
    try {
      const config = await companyService.getCompanyConfig();
      if (config && config.name) {
        setCompanyName(config.name);
      }
    } catch (error) {
      console.error("Error loading company config:", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary sticky-top shadow-sm"
      role="navigation"
    >
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          <i className="fas fa-coffee me-2" aria-hidden="true"></i>
          <span>{companyName}</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/") ? "active" : ""}`}
                to="/"
                aria-current={isActive("/") ? "page" : undefined}
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/menu") ? "active" : ""}`}
                to="/menu"
                aria-current={isActive("/menu") ? "page" : undefined}
              >
                Menú
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/news") ? "active" : ""}`}
                to="/news"
                aria-current={isActive("/news") ? "page" : undefined}
              >
                Noticias
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/about") ? "active" : ""}`}
                to="/about"
                aria-current={isActive("/about") ? "page" : undefined}
              >
                Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/contact") ? "active" : ""}`}
                to="/contact"
                aria-current={isActive("/contact") ? "page" : undefined}
              >
                Contacto
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-primary fw-semibold" to="/admin">
                <i className="fas fa-user-shield me-1" aria-hidden="true"></i>
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
