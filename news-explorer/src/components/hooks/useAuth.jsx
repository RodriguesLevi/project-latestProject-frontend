import { useState, useEffect } from 'react';
import mainApi from '../../utils/MainApi';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar token ao carregar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoading(true);
      mainApi.checkToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error('Erro ao verificar token:', err);
          localStorage.removeItem('token');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const { token } = await mainApi.login(email, password);
      localStorage.setItem('token', token);
      const userData = await mainApi.getUserInfo();
      setCurrentUser(userData);
      setIsLoggedIn(true);
      return userData;
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, name) => {
    setIsLoading(true);
    try {
      return await mainApi.register(email, password, name);
    } catch (err) {
      console.error('Erro ao registrar:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const updateProfile = async (userData) => {
    setIsLoading(true);
    try {
      // Simulação da chamada API
      // No futuro, você implementaria uma chamada real para seu backend
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = {
        ...currentUser,
        ...userData
      };
      
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      return updatedUser;
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    currentUser,
    isLoggedIn,
    isLoading,
    login,
    register,
    logout,
    updateProfile
  };
}