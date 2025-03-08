// Header.jsx - Versão atualizada para mobile
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({ onLoginClick, onLogoutClick, isLoggedIn, userName }) {
  const location = useLocation();
  const isMainPage = location.pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`header ${isMainPage ? 'header_theme_dark' : ''}`}>
      <div className="header__container">
        {/* Logo Desktop */}
        <Link to="/" className="header__logo header__logo_desktop">NewsExplorer</Link>
        
        {/* Mobile Header */}
        <div className="header__mobile">
          <button 
            className={`header__menu-button ${isMobileMenuOpen ? 'header__menu-button_close' : ''}`}
            onClick={toggleMobileMenu}
          ></button>
          
          <Link to="/" className="header__logo header__logo_mobile">NewsExplorer</Link>
        </div>

        {/* Navigation (Desktop and Mobile) */}
        <Navigation 
          onLoginClick={onLoginClick}
          onLogoutClick={onLogoutClick}
          isLoggedIn={isLoggedIn}
          userName={userName}
          isMobileMenuOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </header>
  );
}

export default Header;