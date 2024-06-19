import axios from 'axios';
import { refreshToken } from './keycloak';
import router from '../router';

const apiClient = axios.create({
  baseURL: 'https://tiktalkapp.ru/tiktalk/api',
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
  },
});

apiClient.interceptors.request.use(async config => {
  const token = localStorage.getItem('access_token');

  if (token) {
    const tokenReceivedAt = parseInt(localStorage.getItem('token_received_at'), 10);
    const expiresIn = parseInt(localStorage.getItem('expires_in'), 10);
    if (!isNaN(tokenReceivedAt) && !isNaN(expiresIn)) { 
      const expirationTime = tokenReceivedAt + expiresIn;
      const currentTime = Math.floor(Date.now() / 1000);


      if (currentTime > expirationTime) { 
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('expires_in');
        localStorage.removeItem('token_received_at');
        localStorage.removeItem('isAuthenticated');
        router.push('/'); 
        return Promise.reject(new Error('Token expired'));
      } 

      if (currentTime + 300 > expirationTime) {
        try {
          const refreshedToken = await refreshToken(localStorage.getItem('refresh_token'));
          localStorage.setItem('access_token', refreshedToken.access_token);
          localStorage.setItem('refresh_token', refreshedToken.refresh_token);
          localStorage.setItem('token_received_at', Math.floor(Date.now() / 1000));
          localStorage.setItem('expires_in', refreshedToken.expires_in);
        } catch (error) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('expires_in');
          localStorage.removeItem('token_received_at');
          localStorage.removeItem('isAuthenticated');
          router.push({ name: 'Login' }); 
        }
      }
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
  }
  return config;
});

export const getPodcasts = (page = 0, size = 15, sortParam = 'REPORTS_COUNT_DESC') => {
  return apiClient.get('/podcast/', {
    params: { page, size, sortParam }
  });
}

export const getPodcastById = (podcastId) => {
  return apiClient.get(`/podcast/${podcastId}`);
};

export const getPersonById = (id) => {
  return apiClient.get(`/person/${id}`);
};

export const getReportsByPodcastId = (podcastId, page = 0, size = 7, sortParam = 'ID_DESC') => {
  return apiClient.get(`/report/reports/by-podcast/${podcastId}`, { 
    params: { page, size, sortParam }
  });
};

export const banPodcast = (podcastId, verdict) => {
  return apiClient.post(`/podcast/ban/podcast/${podcastId}?verdict=${verdict}`);
};

export const rejectReports = (podcastId, verdict) => {
  return apiClient.post(`/podcast/reject/${podcastId}?verdict=${verdict}`);
};

export const getHistoryPodcasts = (page = 0, size = 15, sortParam = 'ID_ASC') => {
  return apiClient.get('/reported-podcast/' , {
    params: { page, size, sortParam }
  });
};

export const getHistoryPodcastById = (podcastId) => {
  return apiClient.get(`/reported-podcast/${podcastId}`);
};