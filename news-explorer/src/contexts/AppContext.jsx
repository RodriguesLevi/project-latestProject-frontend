import React, { createContext, useContext, useState, useEffect } from 'react';
import newsApi from '../utils/NewsApi';
import mainApi from '../utils/MainApi';

// Criando o contexto
const AppContext = createContext();

// Provider component que envolverá a aplicação
export function AppProvider({ children }) {
  // Estados para artigos e pesquisa
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Estados para autenticação
  const [currentUser, setCurrentUser] = useState(() => {
    // Tenta carregar do localStorage
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Verificar token ao iniciar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthLoading(true);
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
          setAuthLoading(false);
        });
    } else {
      setAuthLoading(false);
    }
  }, []);

  // Carregar artigos salvos do localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedArticles') || '[]');
    setSavedArticles(saved);
  }, []);

  // Funções para busca de artigos
  const searchArticles = async (keyword) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await newsApi.getNews(keyword);
      setArticles(data.articles || []);
      // Salvar no localStorage
      localStorage.setItem('lastSearch', JSON.stringify(data));
      return data;
    } catch (err) {
      console.error('Erro ao buscar artigos:', err);
      setError('Ocorreu um erro ao buscar notícias. Tente novamente mais tarde.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Funções para gerenciar artigos salvos
  const saveArticle = (article) => {
    if (!isLoggedIn) return null;
    
    const newSavedArticle = {
      _id: Date.now().toString(), // temporário
      title: article.title,
      text: article.description || article.content,
      date: article.publishedAt,
      source: article.source?.name || 'Fonte desconhecida',
      link: article.url,
      image: article.urlToImage,
      keyword: article.keyword || 'geral'
    };
    
    const updatedSavedArticles = [...savedArticles, newSavedArticle];
    setSavedArticles(updatedSavedArticles);
    localStorage.setItem('savedArticles', JSON.stringify(updatedSavedArticles));
    
    return newSavedArticle;
  };

  const deleteArticle = (articleId) => {
    const updatedSavedArticles = savedArticles.filter(
      article => article._id !== articleId
    );
    setSavedArticles(updatedSavedArticles);
    localStorage.setItem('savedArticles', JSON.stringify(updatedSavedArticles));
  };

  // Funções para autenticação
  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const { token } = await mainApi.login(email, password);
      localStorage.setItem('token', token);
      const userData = await mainApi.getUserInfo();
      setCurrentUser(userData);
      setIsLoggedIn(true);
      
      // Buscar artigos salvos
      const savedArticles = await mainApi.getSavedArticles();
      setSavedArticles(savedArticles);
      
      return userData;
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (email, password, name) => {
    setAuthLoading(true);
    try {
      return await mainApi.register(email, password, name);
    } catch (err) {
      console.error('Erro ao registrar:', err);
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setIsLoggedIn(false);
    setSavedArticles([]);
  };

  // Função para atualizar informações do usuário
  const updateUserInfo = async (userData) => {
    try {
      // Simular uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Atualizar o usuário com os novos dados
      const updatedUser = { ...currentUser, ...userData };
      
      // Salvar no localStorage
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // Atualizar o estado
      setCurrentUser(updatedUser);
      
      console.log('Perfil atualizado com sucesso:', updatedUser);
      
      return updatedUser;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  };

  // Criando o objeto de contexto com todos os valores e funções
  const value = {
    // Artigos e busca
    articles,
    savedArticles,
    loading,
    error,
    searchArticles,
    saveArticle,
    deleteArticle,
    
    // Autenticação
    currentUser,
    isLoggedIn,
    authLoading,
    login,
    register,
    logout,
    updateUserInfo
  };

  return (
    <AppContext.Provider value={value}>
      {children} 
    </AppContext.Provider>
  );
}

// Hook customizado para facilitar o uso do contexto
export function useApp() {
  return useContext(AppContext);
}