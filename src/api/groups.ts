import { api } from './api';

export const getAllGroups = async () => {
  const response = await api.get('/groups');
  return response.data;
};

export const getGroupById = async (groupId: string) => {
  const response = await api.get(`/groups/${groupId}`);
  return response.data;
};

export const createGroup = async (payload: any) => {
  const response = await api.post('/groups', payload);
  return response.data;
};

export const updateGroup = async (groupId: string, payload: any) => {
  const response = await api.put(`/groups/${groupId}`, payload);
  return response.data;
};
