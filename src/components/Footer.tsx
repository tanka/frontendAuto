// src/components/Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white-50 py-4 mt-auto border-top border-secondary">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4 text-center text-md-start">
            <span>&copy; {currentYear} RepairFinder. All rights reserved.</span>
          </div>
          <div className="col-md-4 text-center">
            <i className="bi bi-wrench me-1"></i> Find trusted repair shops
          </div>
          <div className="col-md-4 text-center text-md-end">
            <a href="#" className="text-white-50 text-decoration-none me-3">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="text-white-50 text-decoration-none me-3">
              <i className="bi bi-twitter-x"></i>
            </a>
            <a href="#" className="text-white-50 text-decoration-none">
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;