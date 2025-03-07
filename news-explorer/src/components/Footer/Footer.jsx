import React from 'react';
import './Footer.css';
import githubIcon from '../../images/image-git.png'; // Você precisará criar estes ícones
import facebookIcon from '../../images/fb.png'; // ou usar imagens de outra fonte

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__copyright">© {new Date().getFullYear()} Supersite, Powered by News API</p>
        
        <div className="footer__links">
          <a href="/" className="footer__link">Home</a>
          <a href="https://practicum.com" target="_blank" rel="noreferrer" className="footer__link">TripleTen</a>
        </div>
        
        <div className="footer__social">
          <a href="https://github.com/seu-usuario" target="_blank" rel="noreferrer" className="footer__social-link">
            <img src={githubIcon} alt="GitHub" className="footer__social-icon" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer__social-link">
            <img src={facebookIcon} alt="Facebook" className="footer__social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;