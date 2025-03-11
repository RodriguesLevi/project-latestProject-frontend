import React from 'react'; 
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element: Component, isLoggedIn, isChecking, ...props }) {
  if (isChecking) {
    return <div className="loading">Carregando...</div>;
  }
  
  return isLoggedIn ? <Component {...props} /> : <Navigate to="/" />;
}

export default ProtectedRoute;