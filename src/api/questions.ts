import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Fetch all questions
export const fetchQuestions = async () => {
  const res = await axios.get(`${API_URL}/questions`);
  return res.data;
};

// Post a new question
export const askQuestion = async (payload: {
  title: string;
  description: string;
  topic: string;
  difficulty: string;
}) => {
  const res = await axios.post(`${API_URL}/questions`, payload, {
    withCredentials: true, // if your backend uses cookies/session
  });
  return res.data;
};
// Fetch question by ID
export const fetchQuestionById = async (id: string) => {
  const res = await axios.get(`${API_URL}/questions/${id}`);
  return res.data;
};