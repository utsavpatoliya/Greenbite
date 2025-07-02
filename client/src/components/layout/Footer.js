import React from 'react';

const Footer = () => {
  return (
    <footer className="footer enhanced-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img src={require('../../images/logo.png')} alt="Logo" className="footer-img-logo" />
          <span className="footer-title">Greenbite</span>
        </div>
        <div className="footer-social">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="footer-social-link" title="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="footer-social-link" title="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="mailto:info@greenbite.com" className="footer-social-link" title="Email">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
        <div className="footer-contact">
          <div><strong>Contact:</strong></div>
          <div>123 Food Street, City, Country</div>
          <div>Phone: +1 234 567 8901</div>
          <div>Email: info@greenbite.com</div>
        </div>
        <div className="footer-copy">
          &copy; {new Date().getFullYear()} Greenbite. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 