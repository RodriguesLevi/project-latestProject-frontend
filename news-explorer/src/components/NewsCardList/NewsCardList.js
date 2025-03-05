// NewsCardList.js
import { useState } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList({ cards, isMainPage }) {
  const [visibleCards, setVisibleCards] = useState(3);

  function handleShowMore() {
    setVisibleCards(visibleCards + 3);
  }

  return (
    <section className="news-card-list">
      <div className="news-card-list__container">
        {isMainPage && (
          <h2 className="news-card-list__title">Resultados da busca</h2>
        )}
        <div className="news-card-list__cards">
          {cards.slice(0, visibleCards).map((card, i) => (
            <NewsCard key={i} card={card} />
          ))}
        </div>
        {visibleCards < cards.length && isMainPage && (
          <button 
            className="news-card-list__button" 
            onClick={handleShowMore}
          >
            Mostrar mais
          </button>
        )}
      </div>
    </section>
  );
}

export default NewsCardList;