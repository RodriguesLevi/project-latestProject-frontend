import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__copyright">© {new Date().getFullYear()} Supersite, Powered by News API</p>
        <div className="footer__links">
          <a href="/" className="footer__link">Home</a>
          <a href="https://practicum.com" target="_blank" rel="noreferrer" className="footer__link">TripleTen</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;