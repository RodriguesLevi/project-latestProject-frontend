import React from 'react';
import './Preloader.css';

function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader__circle"></div>
      <p className="preloader__text">Buscando notícias...</p>
    </div>
  );
}

export default Preloader;