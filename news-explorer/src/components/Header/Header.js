// Header.js
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header() {
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <header className={`header ${isMainPage ? 'header_main' : 'header_saved'}`}>
      <div className="header__container">
        <h1 className="header__logo">NewsExplorer</h1>
        <Navigation />
      </div>
    </header>
  );
}

export default Header;