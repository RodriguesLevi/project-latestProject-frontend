// Navigation.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation({ onLoginClick, onLogoutClick, isLoggedIn, userName, isMobileMenuOpen, onClose }) {
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <nav className={`navigation ${isMobileMenuOpen ? 'navigation_opened' : ''}`}>
      <div className="navigation__container">
        <NavLink 
          to="/" 
          className={({isActive}) => `navigation__link ${isActive ? 'navigation__link_active' : ''}`}
          onClick={onClose}
        >
          Home
        </NavLink>
        
        {isLoggedIn && (
          <NavLink 
            to="/saved-news" 
            className={({isActive}) => `navigation__link ${isActive ? 'navigation__link_active' : ''}`}
            onClick={onClose}
          >
            Artigos Salvos
          </NavLink>
        )}
        
        {isLoggedIn ? (
          <button 
            className={`navigation__button navigation__button_type_logout ${!isMainPage ? 'navigation__button_theme_light' : ''}`}
            onClick={onLogoutClick}
          >
            {userName}
          </button>
        ) : (
          <button 
            className={`navigation__button ${!isMainPage ? 'navigation__button_theme_light' : ''}`}
            onClick={onLoginClick}
          >
            Entrar
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;