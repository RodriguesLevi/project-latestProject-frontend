import React, { useState } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList({ cards, isLoggedIn, onSaveArticle, onDeleteArticle }) {
  const [visibleCards, setVisibleCards] = useState(3);
  
  const handleShowMoreClick = () => {
    setVisibleCards(prevVisible => prevVisible + 3);
  };

  return (
    <section className="news-card-list">
      <h2 className="news-card-list__title">Resultados da busca</h2>
      <div className="news-card-list__grid">
        {cards.slice(0, visibleCards).map(card => (
          <NewsCard 
            key={card._id || card.url} 
            card={card} 
            isLoggedIn={isLoggedIn}
            onSaveArticle={onSaveArticle}
            onDeleteArticle={onDeleteArticle}
          />
        ))}
      </div>
      {visibleCards < cards.length && (
        <button 
          className="news-card-list__more-button"
          onClick={handleShowMoreClick}
        >
          Mostrar mais
        </button>
      )}
    </section>
  );
}

export default NewsCardList;