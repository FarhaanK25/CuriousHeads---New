import { api } from './api';

export const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const getUserById = async (userId: string) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const updateUser = async (userId: string, payload: any) => {
  const response = await api.put(`/users/${userId}`, payload);
  return response.data;
};
