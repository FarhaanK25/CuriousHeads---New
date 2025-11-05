import { api } from './api';

// List notifications
export const getNotifications = async () => {
  const res = await api.get('/notifications'); // no userId needed
  return res.data;
};

// Mark notification as read
export const markNotificationRead = async (id: string) => {
  const res = await api.post(`/notifications/${id}/read`);
  return res.data;
};
