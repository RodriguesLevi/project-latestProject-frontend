import React, { useEffect } from 'react';
import './SuccessPopup.css';

function SuccessPopup({ isOpen, onClose, onLoginClick }) {
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
        <h3 className="popup__title">Registro bem-sucedido!</h3>
        <p className="success-popup__message">Sua conta foi criada com sucesso.</p>
        <button className="success-popup__button" onClick={onLoginClick}>
          Entrar
        </button>
      </div>
    </div>
  );
}

export default SuccessPopup;