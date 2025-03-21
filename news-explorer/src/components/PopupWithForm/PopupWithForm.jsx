import React, { useEffect } from 'react';
import './PopupWithForm.css';

function PopupWithForm({ 
  title, 
  name, 
  buttonText, 
  isOpen, 
  onClose, 
  onSubmit, 
  children,
  linkText = '',
  onLinkClick
}) {
  // Fecha o modal ao pressionar Esc
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
    }

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isOpen, onClose]);

  // Fechar ao clicar no overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={handleOverlayClick}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose}></button>
        <h3 className="popup__title">{title}</h3>
        <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>
          {children}
          <button className="popup__button" type="submit">{buttonText}</button>
        </form>
        {linkText && (
          <div className="popup__link-container">
            <span className="popup__link-text">ou</span>
            <button className="popup__link" type="button" onClick={onLinkClick}>{linkText}</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PopupWithForm;