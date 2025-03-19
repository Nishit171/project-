import api from './api';

export const login = async (formData) => {
  const { data } = await api.post('/api/auth/login', formData);
  localStorage.setItem('token', data.token);
  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
};
