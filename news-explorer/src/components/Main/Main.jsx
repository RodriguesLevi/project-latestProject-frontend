import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';
import About from '../About/About';
import NewsFilter from '../NewsFilter/NewsFilter';
import './Main.css';

function Main({ 
  isLoggedIn, 
  isLoading, 
  searchResults, 
  searchError, 
  onSearchSubmit,
  onSaveArticle,
  onDeleteArticle,
  savedArticles
  
}) {
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Verifica se já existem resultados de pesquisa salvos
  useEffect(() => {
    if (searchResults) {
      setSearchPerformed(true);
    }
  }, [searchResults]);

  const handleSearchSubmit = (keyword) => {
    setSearchPerformed(true);
    onSearchSubmit(keyword);
  };
  const handleFilterChange = (filter) => {
    console.log("Filtro aplicado:", filter);
  };
  
  // Função para verificar se um artigo está salvo
  const isArticleSaved = (article) => {
    return savedArticles.some(savedArticle => 
      savedArticle.link === article.url || 
      savedArticle.title === article.title
    );
  };

  return (
    <div className="main">
      <div className="main__search-container">
        <h1 className="main__title">Explorador de Notícias</h1>
        <p className="main__subtitle">Busque as notícias mais recentes sobre o assunto que você quiser</p>
        <SearchForm onSearchSubmit={handleSearchSubmit} />
      </div>

      {searchPerformed && (
        <div className="main__results">
            {searchPerformed && !isLoading && !searchError && searchResults?.articles?.length > 0 && (
    <NewsFilter onFilter={handleFilterChange} />
  )}

          {isLoading ? (
            <Preloader />
          ) : searchError ? (
            <p className="main__error">{searchError}</p>
          ) : searchResults && searchResults.articles && searchResults.articles.length === 0 ? (
            <p className="main__not-found">Nada encontrado</p>
          ) : searchResults && searchResults.articles ? (
            <NewsCardList 
              cards={searchResults.articles.map(article => ({
                ...article,
                _id: article.url, // Usamos a URL como ID temporário
                isSaved: isArticleSaved(article)
              }))} 
              isLoggedIn={isLoggedIn}
              onSaveArticle={onSaveArticle}
              onDeleteArticle={onDeleteArticle}
            />
          ) : null}
        </div>
      )}
      
      
      <About />
    </div>
  );
}

export default Main;