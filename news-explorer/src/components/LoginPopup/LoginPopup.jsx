import React, { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function LoginPopup({ isOpen, onClose, onRegisterClick, onLogin }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });

    // Validação simples
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setFormErrors({
        ...formErrors,
        email: emailRegex.test(value) ? '' : 'Por favor, insira um email válido'
      });
    } else if (name === 'password') {
      setFormErrors({
        ...formErrors,
        password: value.length >= 6 ? '' : 'A senha deve ter pelo menos 6 caracteres'
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formValues);
  };

  return (
    <PopupWithForm
      title="Entrar"
      name="login"
      buttonText="Entrar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      linkText="Inscreva-se"
      onLinkClick={onRegisterClick}
    >
      <label className="popup__label">Email</label>
      <input
        type="email"
        name="email"
        className={`popup__input ${formErrors.email ? 'popup__input_type_error' : ''}`}
        placeholder="Digite seu email"
        required
        value={formValues.email}
        onChange={handleChange}
      />
      <span className="popup__error">{formErrors.email}</span>

      <label className="popup__label">Senha</label>
      <input
        type="password"
        name="password"
        className={`popup__input ${formErrors.password ? 'popup__input_type_error' : ''}`}
        placeholder="Digite sua senha"
        required
        value={formValues.password}
        onChange={handleChange}
      />
      <span className="popup__error">{formErrors.password}</span>
    </PopupWithForm>
  );
}

export default LoginPopup;