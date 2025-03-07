import React from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import './SavedNews.css';

function SavedNews({ articles, onDeleteArticle }) {
  return (
    <>
      <SavedNewsHeader articles={articles} />
      <div className="saved-news">
        {articles.length > 0 ? (
          <NewsCardList 
            cards={articles.map(article => ({
              ...article,
              title: article.title,
              description: article.text,
              publishedAt: article.date,
              urlToImage: article.image,
              source: { name: article.source },
              url: article.link,
              isSaved: true
            }))}
            isLoggedIn={true}
            onDeleteArticle={onDeleteArticle}
          />
        ) : (
          <p className="saved-news__empty">Você ainda não salvou nenhum artigo</p>
        )}
      </div>
    </>
  );
}

export default SavedNews;