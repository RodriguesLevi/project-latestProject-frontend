import React, { useState } from 'react';
import './NewsCard.css';

function NewsCard({ card, isLoggedIn, onSaveArticle, onDeleteArticle }) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const handleSaveClick = () => {
    if (!isLoggedIn) return;
    
    if (card.isSaved) {
      onDeleteArticle(card._id);
    } else {
      onSaveArticle(card);
    }
  };

  return (
    <article className="news-card">
      <div className="news-card__image-container">
        <img
          src={card.urlToImage || 'https://via.placeholder.com/300x200?text=Imagem+não+disponível'}
          alt={card.title}
          className="news-card__image"
        />
        <div className="news-card__save-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {!isLoggedIn && isHovered && (
            <div className="news-card__tooltip">Faça o login para salvar os artigos</div>
          )}
          <button
            className={`news-card__save-button ${card.isSaved ? 'news-card__save-button_saved' : ''}`}
            onClick={handleSaveClick}
            disabled={!isLoggedIn}
          ></button>
        </div>
      </div>
      <div className="news-card__content">
        <span className="news-card__date">{formatDate(card.publishedAt)}</span>
        <h3 className="news-card__title">{card.title}</h3>
        <p className="news-card__text">{card.description}</p>
        <span className="news-card__source">{card.source.name}</span>
      </div>
    </article>
  );
}

export default NewsCard;