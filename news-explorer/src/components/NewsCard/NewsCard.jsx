import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Importar useLocation
import './NewsCard.css';

function NewsCard({ card, isLoggedIn, onSaveArticle, onDeleteArticle }) {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation(); // Usar o hook useLocation para determinar a página atual
  const isSavedNewsPage = location.pathname === '/saved-news';

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const handleCardAction = () => {
    if (isSavedNewsPage) {
      onDeleteArticle(card._id);
    } else {
      if (isLoggedIn) {
        if (card.isSaved) {
          onDeleteArticle(card._id);
        } else {
          onSaveArticle(card);
        }
      }
    }
  };

  return (
    <article className="news-card">
      <div className="news-card__image-container">
        <img
          src={card.urlToImage || card.image || 'https://via.placeholder.com/300x200?text=Imagem+não+disponível'}
          alt={card.title}
          className="news-card__image"
        />
        <div className="news-card__save-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {!isLoggedIn && !isSavedNewsPage && isHovered && (
            <div className="news-card__tooltip">Faça o login para salvar os artigos</div>
          )}
          {isSavedNewsPage && isHovered && (
            <div className="news-card__tooltip">Remover dos salvos</div>
          )}
          <button
            className={`news-card__save-button ${
              isSavedNewsPage 
                ? 'news-card__save-button_trash' 
                : card.isSaved ? 'news-card__save-button_saved' : ''
            }`}
            onClick={handleCardAction}
            disabled={!isLoggedIn && !isSavedNewsPage}
          ></button>
        </div>
      </div>
      <div className="news-card__content">
        <span className="news-card__date">{formatDate(card.publishedAt || card.date)}</span>
        <h3 className="news-card__title">{card.title}</h3>
        <p className="news-card__text">{card.description || card.text}</p>
        <span className="news-card__source">{card.source?.name || card.source}</span>
      </div>
    </article>
  );
}

export default NewsCard;