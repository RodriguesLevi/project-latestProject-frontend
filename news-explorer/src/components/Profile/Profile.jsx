import React, { useState, useRef } from 'react';
import { useApp } from '../../contexts/AppContext';
import './Profile.css';

function Profile() {
  const { currentUser, savedArticles, } = useApp();
  const [activeTab, setActiveTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    bio: currentUser?.bio || '',
    email: currentUser?.email || ''
  });
  const [profileImage, setProfileImage] = useState(currentUser?.avatar || null);
  const fileInputRef = useRef(null);
  
  // Cálculo de estatísticas (mantido do código anterior)
  const keywordStats = savedArticles.reduce((acc, article) => {
    const keyword = article.keyword || 'sem-categoria';
    if (!acc[keyword]) {
      acc[keyword] = 0;
    }
    acc[keyword] += 1;
    return acc;
  }, {});
  
  const keywordsArray = Object.entries(keywordStats)
    .map(([keyword, count]) => ({ keyword, count }))
    .sort((a, b) => b.count - a.count);
  
  // Manipuladores para edição de perfil
  const handleEditClick = () => {
    setIsEditing(true);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    // Restaurar dados originais
    setFormData({
      name: currentUser?.name || '',
      bio: currentUser?.bio || '',
      email: currentUser?.email || ''
    });
    setProfileImage(currentUser?.avatar || null);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular atualização de dados
    const updatedUser = {
      ...currentUser,
      ...formData,
      avatar: profileImage
    };
    
    // Aqui você chamaria a função updateUserInfo do seu contexto
    // Simulação:
    console.log('Atualizando para:', updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    setIsEditing(false);
  };
  
  // Manipulador de upload de imagem
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      
      reader.readAsDataURL(file);
    }
  };
  

  return (
    <div className="profile">
      <div className="profile__header">
        <h1 className="profile__title">Perfil do Usuário</h1>
        
        <div className="profile__user-info">
          <div 
            className="profile__avatar-container"
            onClick={isEditing ? handleImageClick : undefined}
          >
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Avatar" 
                className="profile__avatar-image" 
              />
            ) : (
              <div className="profile__avatar-placeholder">
                {formData.name?.charAt(0) || 'U'}
              </div>
            )}
            
            {isEditing && (
              <div className="profile__avatar-overlay">
                <span className="profile__avatar-edit-icon">📷</span>
              </div>
            )}
            
            <input 
              type="file" 
              ref={fileInputRef}
              className="profile__file-input"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          
          {!isEditing ? (
            <div className="profile__details">
              <h2 className="profile__name">{currentUser?.name || 'Usuário'}</h2>
              <p className="profile__email">{currentUser?.email || 'email@exemplo.com'}</p>
              {currentUser?.bio && (
                <p className="profile__bio">{currentUser.bio}</p>
              )}
              <button 
                className="profile__edit-button"
                onClick={handleEditClick}
              >
                Editar Perfil
              </button>
            </div>
          ) : (
            <form className="profile__edit-form" onSubmit={handleSubmit}>
              <div className="profile__form-group">
                <label htmlFor="name" className="profile__form-label">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="profile__form-input"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="profile__form-group">
                <label htmlFor="email" className="profile__form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="profile__form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="profile__form-group">
                <label htmlFor="bio" className="profile__form-label">Biografia</label>
                <textarea
                  id="bio"
                  name="bio"
                  className="profile__form-textarea"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Conte um pouco sobre você..."
                />
              </div>
              
              <div className="profile__form-actions">
                <button 
                  type="button" 
                  className="profile__cancel-button"
                  onClick={handleCancelEdit}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="profile__save-button"
                >
                  Salvar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      
      <div className="profile__tabs">
        <button 
          className={`profile__tab ${activeTab === 'info' ? 'profile__tab_active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          Informações
        </button>
        <button 
          className={`profile__tab ${activeTab === 'stats' ? 'profile__tab_active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Estatísticas
        </button>
        <button 
          className={`profile__tab ${activeTab === 'saved' ? 'profile__tab_active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          Artigos Salvos
        </button>
      </div>
      
      <div className="profile__content">
        {activeTab === 'info' && (
          <div className="profile__info">
            <div className="profile__info-item">
              <span className="profile__info-label">Total de artigos salvos:</span>
              <span className="profile__info-value">{savedArticles.length}</span>
            </div>
            <div className="profile__info-item">
              <span className="profile__info-label">Membro desde:</span>
              <span className="profile__info-value">
                {new Date().toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            <div className="profile__preferences">
              <h3 className="profile__preferences-title">Preferências</h3>
              <div className="profile__preferences-form">
                <label className="profile__checkbox">
                  <input type="checkbox" defaultChecked />
                  <span>Receber notificações de novidades</span>
                </label>
                <label className="profile__checkbox">
                  <input type="checkbox" />
                  <span>Salvar histórico de pesquisas</span>
                </label>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'stats' && (
          <div className="profile__stats">
            <h3 className="profile__stats-title">Seus interesses</h3>
            
            <div className="profile__stats-container">
              {keywordsArray.length > 0 ? (
                <div className="profile__keywords-chart">
                  {keywordsArray.map(item => (
                    <div key={item.keyword} className="profile__keyword-bar">
                      <div className="profile__keyword-label">{item.keyword}</div>
                      <div 
                        className="profile__keyword-value" 
                        style={{ width: `${Math.min(100, item.count * 10)}%` }}
                      >
                        {item.count}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="profile__no-data">Você ainda não tem artigos salvos</p>
              )}
              
              <div className="profile__activity">
                <h4>Atividade recente</h4>
                <div className="profile__activity-timeline">
                  {savedArticles.slice(0, 5).map(article => (
                    <div key={article._id} className="profile__activity-item">
                      <div className="profile__activity-date">
                        {new Date(article.date).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="profile__activity-text">
                        Você salvou: "{article.title.substring(0, 50)}..."
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'saved' && (
          <div className="profile__saved-articles">
            <h3 className="profile__saved-title">Artigos Salvos</h3>
            
            {savedArticles.length > 0 ? (
              <div className="profile__article-grid">
                {savedArticles.map(article => (
                  <div key={article._id} className="profile__article-card">
                    <div className="profile__article-image-container">
                      <img 
                        src={article.image || 'https://via.placeholder.com/300x200?text=Imagem+não+disponível'} 
                        alt={article.title}
                        className="profile__article-image" 
                      />
                    </div>
                    <div className="profile__article-content">
                      <h4 className="profile__article-title">{article.title}</h4>
                      <p className="profile__article-date">
                        {new Date(article.date).toLocaleDateString('pt-BR')}
                      </p>
                      <p className="profile__article-source">{article.source}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="profile__no-data">Você ainda não salvou nenhum artigo</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;