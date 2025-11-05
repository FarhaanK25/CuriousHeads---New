import { api } from './api';

export const getAllTopics = async () => {
  const response = await api.get('/topics');
  return response.data;
};
