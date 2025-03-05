// Navigation.js
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Navigation.css';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav className={`navigation ${isMenuOpen ? 'navigation_opened' : ''}`}>
      <button 
        className="navigation__menu-button" 
        onClick={toggleMenu}
      ></button>
      <div className={`navigation__container ${isMenuOpen ? 'navigation__container_visible' : ''}`}>
        <ul className="navigation__links">
          <li>
            <Link 
              to="/" 
              className={`navigation__link ${isMainPage ? 'navigation__link_active' : ''}`}
            >
              Início
            </Link>
          </li>
          <li>
            <Link 
              to="/saved-news" 
              className={`navigation__link ${!isMainPage ? 'navigation__link_active' : ''}`}
            >
              Artigos salvos
            </Link>
          </li>
        </ul>
        <button className="navigation__button">Entrar</button>
      </div>
    </nav>
  );
}

export default Navigation;