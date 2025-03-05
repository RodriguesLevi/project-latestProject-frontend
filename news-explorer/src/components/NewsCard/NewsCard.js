// NewsCard.js
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './NewsCard.css';

function NewsCard({ card }) {
  const [isSaved, setIsSaved] = useState(false);
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  function handleCardSave() {
    setIsSaved(!isSaved);
  }

  return (
    <article className="news-card">
      <div className="news-card__image-container">
        <img 
          src={card.urlToImage || 'https://via.placeholder.com/300'} 
          alt={card.title} 
          className="news-card__image" 
        />
        {isMainPage ? (
          <button 
            type="button" 
            className={`news-card__button ${isSaved ? 'news-card__button_saved' : ''}`}
            onClick={handleCardSave}
          >
            {!isSaved && <div className="news-card__tooltip">Salvar artigo</div>}
          </button>
        ) : (
          <>
            <div className="news-card__keyword">{card.keyword}</div>
            <button 
              type="button" 
              className="news-card__button news-card__button_delete"
              onClick={handleCardSave}
            >
              <div className="news-card__tooltip">Remover dos salvos</div>
            </button>
          </>
        )}
      </div>
      <div className="news-card__content">
        <p className="news-card__date">{new Date(card.publishedAt).toLocaleDateString()}</p>
        <h3 className="news-card__title">{card.title}</h3>
        <p className="news-card__text">{card.description}</p>
        <p className="news-card__source">{card.source?.name}</p>
      </div>
    </article>
  );
}

export default NewsCard;