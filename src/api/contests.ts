import { api } from './api';

export const getAllContests = async () => {
  const response = await api.get('/contests');
  return response.data;
};

export const getContestById = async (contestId: string) => {
  const response = await api.get(`/contests/${contestId}`);
  return response.data;
};

export const createContest = async (payload: any) => {
  const response = await api.post('/contests', payload);
  return response.data;
};

export const updateContest = async (contestId: string, payload: any) => {
  const response = await api.put(`/contests/${contestId}`, payload);
  return response.data;
};
