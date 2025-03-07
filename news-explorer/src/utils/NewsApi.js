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
      
      // Adicionando o parâmetro 'language=pt' para obter resultados em português
      const url = `${this._baseUrl}/everything?q=${encodeURIComponent(keyword)}&from=${from}&to=${to}&language=pt&pageSize=100&apiKey=${this._apiKey}`;
      
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return res.text().then(text => {
          console.error('Detalhes do erro da API:', text);
          throw new Error(`${res.status}`);
        });
      });
    }
  }
  
  // Use o servidor proxy do TripleTen para evitar problemas CORS e restrições da versão gratuita
  const newsApi = new NewsApi({
    baseUrl: 'https://nomoreparties.co/news/v2',
    apiKey: '6a3a19fe56824c65bedaf7e1d8997bf4', // Substitua pelo seu API key da News API
  });
  
  export default newsApi;