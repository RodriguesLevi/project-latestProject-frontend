// SearchForm.js
import { useState } from 'react';
import "../SearchForm/SearchForm.css"; // Ajuste conforme a estrutura do projeto

function SearchForm({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(searchQuery);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        className="search-form__input" 
        placeholder="Procurar notícias"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        required
      />
      <button type="submit" className="search-form__button">Buscar</button>
    </form>
  );
}

export default SearchForm;