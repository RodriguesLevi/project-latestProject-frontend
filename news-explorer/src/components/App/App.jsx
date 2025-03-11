import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import SuccessPopup from '../SuccessPopup/SuccessPopup';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { useApp } from '../../contexts/AppContext';
import Profile from '../Profile/Profile';
import './App.css';

function App() {
  const { 
    isLoggedIn, 
    isLoading: authLoading, 
    login, 
    register, 
    logout,
    currentUser,
    loading: articlesLoading,
    error,
    articles,
    savedArticles,
    searchArticles,
    saveArticle,
    deleteArticle
  } = useApp();

  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

  const closeAllPopups = () => {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsSuccessPopupOpen(false);
  };

  const handleLoginClick = () => {
    setIsRegisterPopupOpen(false);
    setIsSuccessPopupOpen(false);
    setIsLoginPopupOpen(true);
  };

  const handleRegisterClick = () => {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(true);
  };

  const handleLogin = async ({ email, password }) => {
    try {
      await login(email, password);
      closeAllPopups();
    } catch (err) {
      console.error('Erro ao fazer login:', err);
    }
  };

  const handleRegister = async ({ email, password, name }) => {
    try {
      await register(email, password, name);
      setIsRegisterPopupOpen(false);
      setIsSuccessPopupOpen(true);
    } catch (err) {
      console.error('Erro ao registrar:', err);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleSearchSubmit = (keyword) => {
    searchArticles(keyword);
  };

  const handleSaveArticle = (article) => {
    if (!isLoggedIn) {
      handleLoginClick();
      return;
    }
    saveArticle(article);
  };

  const handleDeleteArticle = (articleId) => {
    deleteArticle(articleId);
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
                isLoading={articlesLoading}
                searchResults={{ articles }}
                searchError={error}
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
                isChecking={authLoading}
                articles={savedArticles}
                onDeleteArticle={handleDeleteArticle}
              />
            } 
          />
          
          <Route path="*" element={<Navigate to="/" />} />

          <Route 
    path="/profile" 
    element={
      <ProtectedRoute 
        element={Profile}
        isLoggedIn={isLoggedIn}
        isChecking={authLoading}
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
          isLoading={authLoading}
        />

        <RegisterPopup
          isOpen={isRegisterPopupOpen}
          onClose={closeAllPopups}
          onLoginClick={handleLoginClick}
          onRegister={handleRegister}
          isLoading={authLoading}
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