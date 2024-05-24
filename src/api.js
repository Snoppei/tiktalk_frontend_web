import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8089/tiktalk/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPodcasts = (page = 0, size = 10, sortParam = 'REPORTS_COUNT_DESC') => {
  return apiClient.get('/podcast/', {
    params: { page, size, sortParam }
  });
};