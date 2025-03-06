import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">© 2025 Supersite, Powered by News API</p>
        <div className="footer__links">
          <div className="footer__nav-links">
            <a href="/" className="footer__link">Início</a>
            <a href="https://practicum.com" className="footer__link">TripleTen</a>
          </div>
          <div className="footer__social-links">
            <a href="https://github.com" className="footer__social-icon footer__social-icon_github" target="_blank" rel="noreferrer"></a>
            <a href="https://facebook.com" className="footer__social-icon footer__social-icon_facebook" target="_blank" rel="noreferrer"></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;