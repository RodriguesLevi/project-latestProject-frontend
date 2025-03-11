class MainApi {
    constructor({ baseUrl }) {
      this._baseUrl = baseUrl;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }
  
    // Simulações de métodos de API - serão substituídos por chamadas reais quando seu backend estiver pronto
    register(_email, _password, name) {
      // Simulação de registro
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ _email, name });
        }, 1000);
      });
    }
  
    login(_email, _password) {
      // Simulação de login
      return new Promise((resolve) => {
        setTimeout(() => {
          const token = "simulado-token-jwt-" + Math.random().toString(36).substring(2);
          localStorage.setItem('token', token);
          resolve({ token });
        }, 1000);
      });
    }
  
    checkToken(_token) {
      // Simulação de verificação de token
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            _id: "user123",
            email: "user@example.com",
            name: "Usuário Teste" 
          });
        }, 500);
      });
    }
  
    getUserInfo() {
      // Simulação de obtenção de informações do usuário
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            _id: "user123",
            email: "user@example.com",
            name: "Usuário Teste" 
          });
        }, 500);
      });
    }
  
    saveArticle(article) {
      // Simulação de salvamento de artigo
      return new Promise((resolve) => {
        setTimeout(() => {
          const savedArticle = {
            _id: Date.now().toString(),
            ...article,
            owner: "user123"
          };
          resolve(savedArticle);
        }, 500);
      });
    }
  
    getSavedArticles() {
      // Simulação de obtenção de artigos salvos
      return new Promise((resolve) => {
        const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '[]');
        setTimeout(() => {
          resolve(savedArticles);
        }, 500);
      });
    }
  
    deleteArticle(articleId) {
      // Simulação de exclusão de artigo
      return new Promise((resolve) => {
        setTimeout(() => {
          const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '[]');
          const updatedArticles = savedArticles.filter(article => article._id !== articleId);
          localStorage.setItem('savedArticles', JSON.stringify(updatedArticles));
          resolve({ message: "Artigo excluído com sucesso" });
        }, 500);
      });
    }
  }
  
  const mainApi = new MainApi({
    baseUrl: 'https://api.seu-dominio.com', // Será substituído pelo URL real do seu backend
  });
  
  export default mainApi;