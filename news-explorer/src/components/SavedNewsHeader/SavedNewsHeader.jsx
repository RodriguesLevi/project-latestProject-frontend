// SavedNewsHeader.js
import './SavedNewsHeader.css';

function SavedNewsHeader({ savedCards }) {
  const keywords = savedCards.map(card => card.keyword);
  const uniqueKeywords = [...new Set(keywords)];
  
  // Obtém os 2 primeiros keywords e conta quantos mais existem
  const displayKeywords = uniqueKeywords.slice(0, 2);
  const remainingCount = uniqueKeywords.length - 2;

  return (
    <section className="saved-news-header">
      <div className="saved-news-header__container">
        <p className="saved-news-header__label">Artigos salvos</p>
        <h1 className="saved-news-header__title">
          {savedCards.length > 0 
            ? `Você tem ${savedCards.length} artigo${savedCards.length !== 1 ? 's' : ''} salvo${savedCards.length !== 1 ? 's' : ''}`
            : 'Você não tem artigos salvos'}
        </h1>
        {savedCards.length > 0 && (
          <p className="saved-news-header__subtitle">
            Por palavras-chave: 
            <span className="saved-news-header__keywords">
              {displayKeywords.join(', ')}
              {remainingCount > 0 && ` e ${remainingCount} outr${remainingCount === 1 ? 'a' : 'as'}`}
            </span>
          </p>
        )}
      </div>
    </section>
  );
}

export default SavedNewsHeader;