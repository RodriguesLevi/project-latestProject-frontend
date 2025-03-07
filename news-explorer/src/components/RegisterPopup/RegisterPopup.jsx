import React, { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function RegisterPopup({ isOpen, onClose, onLoginClick, onRegister }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    name: ''
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
    } else if (name === 'name') {
      setFormErrors({
        ...formErrors,
        name: value.length >= 2 ? '' : 'O nome deve ter pelo menos 2 caracteres'
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formValues);
  };

  return (
    <PopupWithForm
      title="Cadastre-se"
      name="register"
      buttonText="Cadastre-se"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      linkText="Entrar"
      onLinkClick={onLoginClick}
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

      <label className="popup__label">Nome</label>
      <input
        type="text"
        name="name"
        className={`popup__input ${formErrors.name ? 'popup__input_type_error' : ''}`}
        placeholder="Digite seu nome"
        required
        value={formValues.name}
        onChange={handleChange}
      />
      <span className="popup__error">{formErrors.name}</span>
    </PopupWithForm>
  );
}

export default RegisterPopup;