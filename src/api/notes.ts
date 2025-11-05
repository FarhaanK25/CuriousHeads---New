import { api } from './api';

export const fetchNotes = async () => {
  const res = await api.get('/notes');
  return res.data;
};

export const uploadNote = async (file: File, title: string, description: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);
  formData.append('description', description);

  const res = await api.post('/notes/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};
