import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({ onLoginClick, onLogoutClick, isLoggedIn, userName }) {
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <header className={`header ${isMainPage ? 'header_theme_dark' : ''}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">NewsExplorer</Link>
        <Navigation 
          onLoginClick={onLoginClick}
          onLogoutClick={onLogoutClick}
          isLoggedIn={isLoggedIn}
          userName={userName}
        />
      </div>
    </header>
  );
}

export default Header;