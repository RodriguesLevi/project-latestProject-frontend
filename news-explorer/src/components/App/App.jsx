import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import SuccessPopup from '../SuccessPopup/SuccessPopup';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import newsApi from '../../utils/NewsApi';
import './App.css';

function App() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  // Verificar token ao carregar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsCheckingToken(true);
      mainApi.checkToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
          // Buscar artigos salvos
          return mainApi.getSavedArticles();
        })
        .then((articles) => {
          setSavedArticles(articles);
        })
        .catch((err) => {
          console.error('Erro ao verificar token:', err);
          localStorage.removeItem('token');
        })
        .finally(() => {
          setIsCheckingToken(false);
        });
    } else {
      setIsCheckingToken(false);
    }
  }, []);

  // Carregar resultados salvos da pesquisa do localStorage
  useEffect(() => {
    const savedSearch = localStorage.getItem('lastSearch');
    if (savedSearch) {
      setSearchResults(JSON.parse(savedSearch));
    }
  }, []);

  const handleLoginClick = () => {
    setIsRegisterPopupOpen(false);
    setIsSuccessPopupOpen(false);
    setIsLoginPopupOpen(true);
  };

  const handleRegisterClick = () => {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsSuccessPopupOpen(false);
  };

  const handleLogin = ({ email, password }) => {
    setIsLoading(true);
    mainApi.login(email, password)
      .then(({ token }) => {
        localStorage.setItem('token', token);
        return mainApi.getUserInfo();
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeAllPopups();
        // Buscar artigos salvos
        return mainApi.getSavedArticles();
      })
      .then((articles) => {
        setSavedArticles(articles);
      })
      .catch((err) => {
        console.error('Erro ao fazer login:', err);
        setSearchError('Credenciais inválidas. Tente novamente.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegister = ({ email, password, name }) => {
    setIsLoading(true);
    mainApi.register(email, password, name)
      .then(() => {
        setIsRegisterPopupOpen(false);
        setIsSuccessPopupOpen(true);
      })
      .catch((err) => {
        console.error('Erro ao registrar:', err);
        setSearchError('Erro ao criar conta. Tente novamente.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setIsLoggedIn(false);
    setSavedArticles([]);
  };

  const handleSearchSubmit = (keyword) => {
    setIsLoading(true);
    setSearchError(null);
    
    newsApi.getNews(keyword)
      .then((data) => {
        setSearchResults(data);
        // Salvar resultados no localStorage
        localStorage.setItem('lastSearch', JSON.stringify(data));
      })
      .catch((err) => {
        console.error('Erro ao buscar notícias:', err);
        setSearchError('Ocorreu um erro ao buscar notícias. Tente novamente mais tarde.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSaveArticle = (article) => {
    if (!isLoggedIn) {
      handleLoginClick();
      return;
    }

    const articleData = {
      keyword: article.keyword || 'Sem palavra-chave',
      title: article.title,
      text: article.description,
      date: article.publishedAt,
      source: article.source.name,
      link: article.url,
      image: article.urlToImage
    };

    mainApi.saveArticle(articleData)
      .then((savedArticle) => {
        setSavedArticles([...savedArticles, savedArticle]);
        
        // Salvar no localStorage para nossa simulação
        const currentSaved = JSON.parse(localStorage.getItem('savedArticles') || '[]');
        localStorage.setItem('savedArticles', JSON.stringify([...currentSaved, savedArticle]));
      })
      .catch((err) => {
        console.error('Erro ao salvar artigo:', err);
      });
  };

  const handleDeleteArticle = (articleId) => {
    mainApi.deleteArticle(articleId)
      .then(() => {
        setSavedArticles(savedArticles.filter(article => article._id !== articleId));
      })
      .catch((err) => {
        console.error('Erro ao excluir artigo:', err);
      });
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Header 
          onLoginClick={handleLoginClick} 
          onLogoutClick={handleLogout}
          isLoggedIn={isLoggedIn}
          userName={currentUser?.name}
        />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <Main 
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
                searchResults={searchResults}
                searchError={searchError}
                onSearchSubmit={handleSearchSubmit}
                onSaveArticle={handleSaveArticle}
                onDeleteArticle={handleDeleteArticle}
                savedArticles={savedArticles}
              />
            } 
          />
          
          <Route 
            path="/saved-news" 
            element={
              <ProtectedRoute 
                element={SavedNews}
                isLoggedIn={isLoggedIn}
                isChecking={isCheckingToken}
                articles={savedArticles}
                onDeleteArticle={handleDeleteArticle}
              />
            } 
          />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        
        <Footer />

        <LoginPopup 
          isOpen={isLoginPopupOpen}
          onClose={closeAllPopups}
          onRegisterClick={handleRegisterClick}
          onLogin={handleLogin}
          isLoading={isLoading}
        />

        <RegisterPopup
          isOpen={isRegisterPopupOpen}
          onClose={closeAllPopups}
          onLoginClick={handleLoginClick}
          onRegister={handleRegister}
          isLoading={isLoading}
        />

        <SuccessPopup
          isOpen={isSuccessPopupOpen}
          onClose={closeAllPopups}
          onLoginClick={handleLoginClick}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;