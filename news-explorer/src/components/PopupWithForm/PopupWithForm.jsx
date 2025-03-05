// PopupWithForm.js
import { useEffect } from 'react';
import './PopupWithForm.css';

function PopupWithForm({ title, name, buttonText, children, isOpen, onClose, onSubmit }) {
  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
    }

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isOpen, onClose]);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={handleOverlayClick}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__button">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;