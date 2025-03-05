// SavedNews.js
import { useState } from 'react';
import Header from '../Header/Header';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Footer from '../Footer/Footer';
import './SavedNews.css';

function SavedNews() {
  // Dados mock para testar o componente
  const [savedCards, ] = useState([
    {
      title: "Notícia Salva 1",
      description: "Descrição da notícia salva 1",
      publishedAt: "2025-03-05T12:00:00Z",
      source: { name: "News Source" },
      urlToImage: "https://via.placeholder.com/300",
      keyword: "Nature"
    },
    // Adicione mais para testar
  ]);

  return (
    <>
      <Header />
      <SavedNewsHeader savedCards={savedCards} />
      <NewsCardList 
        cards={savedCards} 
        isMainPage={false}
      />
      <Footer />
    </>
  );
}

export default SavedNews;