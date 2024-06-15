import axios from 'axios';

function getAccessToken() {
  return localStorage.getItem('access_token');
}

const apiClient = axios.create({
  baseURL: 'http://localhost:8089/tiktalk/api',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

apiClient.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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
  return apiClient.get(`//`);
};

// http://localhost:8089/tiktalk/api/album/?page=0&size=10&sortParam=ID_ASC