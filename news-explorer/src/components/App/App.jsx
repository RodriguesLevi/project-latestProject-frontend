// App.js (atualizado para incluir modais)
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/savedNews';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './App.css';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  function handleLoginClick() {
    setIsLoginOpen(true);
  }

  function handleRegisterClick() {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  }

  function handleLoginSuccess() {
    // Lógica para processar o login
    setIsLoginOpen(false);
  }

  function handleRegisterSuccess() {
    setIsRegisterOpen(false);
    setIsSuccessOpen(true);
  }

  function handleCloseAllPopups() {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsSuccessOpen(false);
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Main onLoginClick={handleLoginClick} />} />
          <Route path="/saved-news" element={<SavedNews />} />
        </Routes>

        <PopupWithForm
          title="Entrar"
          name="login"
          buttonText="Entrar"
          isOpen={isLoginOpen}
          onClose={handleCloseAllPopups}
          onSubmit={handleLoginSuccess}
        >
          <label className="popup__label">Email</label>
          <input 
            type="email" 
            className="popup__input" 
            placeholder="Email" 
            required 
          />
          <label className="popup__label">Senha</label>
          <input 
            type="password" 
            className="popup__input" 
            placeholder="Senha" 
            required 
          />
          <p className="popup__redirect">
            ou <button type="button" className="popup__redirect-button" onClick={handleRegisterClick}>Inscreva-se</button>
          </p>
        </PopupWithForm>

        <PopupWithForm
          title="Inscreva-se"
          name="register"
          buttonText="Inscrever-se"
          isOpen={isRegisterOpen}
          onClose={handleCloseAllPopups}
          onSubmit={handleRegisterSuccess}
        >
          <label className="popup__label">Email</label>
          <input 
            type="email" 
            className="popup__input" 
            placeholder="Email" 
            required 
          />
          <label className="popup__label">Senha</label>
          <input 
            type="password" 
            className="popup__input" 
            placeholder="Senha" 
            required 
          />
          <label className="popup__label">Nome</label>
          <input 
            type="text" 
            className="popup__input" 
            placeholder="Nome" 
            required 
          />
          <p className="popup__redirect">
            ou <button type="button" className="popup__redirect-button" onClick={() => {setIsRegisterOpen(false); setIsLoginOpen(true);}}>Entrar</button>
          </p>
        </PopupWithForm>

        <PopupWithForm
          title="Registro bem-sucedido!"
          name="success"
          buttonText="Entrar"
          isOpen={isSuccessOpen}
          onClose={handleCloseAllPopups}
          onSubmit={() => {setIsSuccessOpen(false); setIsLoginOpen(true);}}
        >
          <p className="popup__message">
            Seu registro foi concluído com sucesso!
          </p>
        </PopupWithForm>
      </div>
    </BrowserRouter>
  );
}

export default App;