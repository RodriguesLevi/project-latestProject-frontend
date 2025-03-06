// PopupWithForm.jsx
import { useEffect } from 'react';
import './PopupWithForm.css';

function PopupWithForm({ title, name, buttonText, children, isOpen, onClose, onSubmit }) {
  // Handler para tecla Esc
  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    // Adiciona o event listener quando o popup está aberto
    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
    }

    // Remove o event listener quando o componente é desmontado ou o popup fecha
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isOpen, onClose]);

  // Handler para clique fora do popup
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div 
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} 
      onClick={handleOverlayClick}
    >
      <div className="popup__container">
        <button 
          type="button" 
          className="popup__close-button" 
          onClick={onClose}
          aria-label="Fechar"
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>
          {children}
          <button type="submit" className="popup__button">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;