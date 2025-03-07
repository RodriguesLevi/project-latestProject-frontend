import React from 'react';
import './SavedNewsHeader.css';

function SavedNewsHeader({ articles }) {
  // Extrair palavras-chave únicas dos artigos
  const keywords = articles
    .map(article => article.keyword)
    .filter((value, index, self) => self.indexOf(value) === index);
  
  // Formatar a lista de palavras-chave
  const formatKeywords = () => {
    if (keywords.length === 0) return '';
    if (keywords.length === 1) return keywords[0];
    if (keywords.length === 2) return `${keywords[0]} e ${keywords[1]}`;
    
    return `${keywords[0]}, ${keywords[1]} e ${keywords.length - 2} ${keywords.length - 2 === 1 ? 'outro' : 'outros'}`;
  };

  return (
    <div className="saved-news-header">
      <div className="saved-news-header__container">
        <p className="saved-news-header__title">Artigos salvos</p>
        <h1 className="saved-news-header__count">
          {articles.length > 0 
            ? `Você tem ${articles.length} ${articles.length === 1 ? 'artigo salvo' : 'artigos salvos'}`
            : 'Você não tem artigos salvos'}
        </h1>
        {articles.length > 0 && (
          <p className="saved-news-header__keywords">
            Por palavras-chave: <span className="saved-news-header__keywords-list">{formatKeywords()}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default SavedNewsHeader;