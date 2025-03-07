import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSearchSubmit }) {
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      setError('Por favor, insira uma palavra-chave');
      return;
    }
    setError('');
    onSearchSubmit(keyword);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <input
          type="text"
          className="search-form__input"
          placeholder="Digite um tema de pesquisa"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" className="search-form__button">Buscar</button>
      </div>
      {error && <span className="search-form__error">{error}</span>}
    </form>
  );
}

export default SearchForm;