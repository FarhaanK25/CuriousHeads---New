import { api } from './api';

export const getUserBadges = async (userId: string) => {
  const response = await api.get(`/badges/${userId}`);
  return response.data;
};
