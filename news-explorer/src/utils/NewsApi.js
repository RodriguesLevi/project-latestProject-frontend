class NewsApi {
    constructor({ baseUrl, apiKey }) {
      this._baseUrl = baseUrl;
      this._apiKey = apiKey;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }
  
    getNews(keyword) {
      const currentDate = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 7);
      
      const from = sevenDaysAgo.toISOString().split('T')[0];
      const to = currentDate.toISOString().split('T')[0];
      
      return fetch(`${this._baseUrl}/everything?q=${keyword}&from=${from}&to=${to}&pageSize=100&apiKey=${this._apiKey}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(this._checkResponse);
    }
  }
  
  // Use o servidor proxy do TripleTen para evitar problemas CORS e restrições da versão gratuita
  const newsApi = new NewsApi({
    baseUrl: 'https://nomoreparties.co/news/v2',
    apiKey: 'SUA_API_KEY_AQUI', // Substitua pelo seu API key da News API
  });
  
  export default newsApi;