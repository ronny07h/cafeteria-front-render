import React, { useState, useEffect } from "react";
import { companyService } from "../../services/companyService";

const Footer = () => {
  const [companyName, setCompanyName] = useState("Café Aroma");
  const currentYear = new Date().getFullYear();

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

  return (
    <footer className="bg-body-tertiary py-4 mt-auto" role="contentinfo">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0 text-body-secondary">
              &copy; {currentYear} {companyName}. Todos los derechos reservados.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a
              href="https://www.facebook.com/ronny.sanchez.31924?locale=es_LA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body-secondary me-3"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a
              href="https://www.instagram.com/aandy__bc/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body-secondary me-3"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
