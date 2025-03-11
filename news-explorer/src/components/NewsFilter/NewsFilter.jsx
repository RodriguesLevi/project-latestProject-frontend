import React, { useState } from 'react';
import './NewsFilter.css';

const categories = [
  'Tecnologia', 'Política', 'Negócios', 'Saúde', 
  'Ciência', 'Esportes', 'Entretenimento'
];

function NewsFilter({ onFilter }) {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [dateRange, setDateRange] = useState('week');

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    applyFilters(category, dateRange);
  };

  const handleDateRangeChange = (e) => {
    const newRange = e.target.value;
    setDateRange(newRange);
    applyFilters(activeCategory, newRange);
  };

  const applyFilters = (category, range) => {
    onFilter({
      category: category === 'Todas' ? null : category,
      dateRange: range
    });
  };

  return (
    <div className="news-filter">
      <div className="news-filter__categories">
        <button 
          className={`news-filter__category ${activeCategory === 'Todas' ? 'news-filter__category_active' : ''}`}
          onClick={() => handleCategoryClick('Todas')}
        >
          Todas
        </button>
        
        {categories.map(category => (
          <button 
            key={category}
            className={`news-filter__category ${activeCategory === category ? 'news-filter__category_active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="news-filter__date-range">
        <select 
          className="news-filter__select"
          value={dateRange}
          onChange={handleDateRangeChange}
        >
          <option value="day">Último dia</option>
          <option value="week">Última semana</option>
          <option value="month">Último mês</option>
        </select>
      </div>
    </div>
  );
}

export default NewsFilter;