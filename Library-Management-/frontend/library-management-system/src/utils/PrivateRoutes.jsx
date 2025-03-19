import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, admin }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = user && user.token;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (admin && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return <Component />;
};

export default PrivateRoute;
