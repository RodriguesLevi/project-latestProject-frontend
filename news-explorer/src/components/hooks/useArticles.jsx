import { useState, useEffect } from 'react';
import newsApi from '../../utils/NewsApi';

export function useArticles() {
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carregar artigos salvos do localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedArticles') || '[]');
    setSavedArticles(saved);
  }, []);

  // Função para buscar artigos
  const searchArticles = async (keyword) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await newsApi.getNews(keyword);
      setArticles(data.articles || []);
      // Salvar no localStorage
      localStorage.setItem('lastSearch', JSON.stringify(data));
    } catch (err) {
      console.error('Erro ao buscar artigos:', err);
      setError('Ocorreu um erro ao buscar notícias. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  // Função para salvar artigo
  const saveArticle = (article) => {
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

  // Função para excluir artigo
  const deleteArticle = (articleId) => {
    const updatedSavedArticles = savedArticles.filter(
      article => article._id !== articleId
    );
    setSavedArticles(updatedSavedArticles);
    localStorage.setItem('savedArticles', JSON.stringify(updatedSavedArticles));
  };

  return {
    articles,
    savedArticles,
    loading,
    error,
    searchArticles,
    saveArticle,
    deleteArticle
  };
}