// Preloader.js
import './Preloader.css';

function Preloader({ isLoading }) {
  return (
    <div className={`preloader ${isLoading ? 'preloader_visible' : ''}`}>
      <div className="preloader__container">
        <i className="preloader__circle"></i>
        <p className="preloader__text">Procurando notícias...</p>
      </div>
    </div>
  );
}

export default Preloader;