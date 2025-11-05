import { api } from './api';

export const getAnswersByQuestionId = async (questionId: string) => {
  const response = await api.get(`/questions/${questionId}/answers`);
  return response.data;
};

export const createAnswer = async (questionId: string, payload: any) => {
  const response = await api.post(`/questions/${questionId}/answers`, payload);
  return response.data;
};
