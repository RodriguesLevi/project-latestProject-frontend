// Main.js
import { useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';
import About from '../About/About';
import Footer from '../Footer/Footer';
import './Main.css';

function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  
  // Mock data para exemplo
  const mockCards = [
    {
      title: "Título da notícia",
      description: "Descrição da notícia com detalhes sobre o assunto tratado",
      publishedAt: "2025-03-05T12:00:00Z",
      source: { name: "News Source" },
      urlToImage: "https://via.placeholder.com/300"
    },
    // Adicione mais itens semelhantes para testar
  ];

  function handleSearch() {
    setIsLoading(true);
    setIsSearched(true);
    
    // Simula uma busca na API
    setTimeout(() => {
      setCards(mockCards);
      setIsLoading(false);
    }, 1500);
  }

  return (
    <>
      <div className="main">
        <Header />
        <div className="main__search-container">
          <h1 className="main__title">O que está acontecendo no mundo?</h1>
          <p className="main__subtitle">Encontre as últimas notícias sobre qualquer assunto e salve-as em sua conta pessoal.</p>
          <SearchForm onSearch={handleSearch} />
        </div>
      </div>
      {isSearched && (
        <>
          <Preloader isLoading={isLoading} />
          {!isLoading && cards.length > 0 && (
            <NewsCardList 
              cards={cards}
              isMainPage={true}
            />
          )}
          {!isLoading && cards.length === 0 && (
            <div className="main__not-found">
              <h2 className="main__not-found-title">Nada encontrado</h2>
              <p className="main__not-found-text">Desculpe, mas não encontramos nada com base na sua pesquisa.</p>
            </div>
          )}
        </>
      )}
      <About />
      <Footer />
    </>
  );
}

export default Main;