import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8089/tiktalk/api',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
});

export const getPodcasts = (page = 0, size = 10, sortParam = 'REPORTS_COUNT_DESC') => {
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
  return apiClient.post(`/podcast/ban/podcast/${podcastId}`, verdict);
};

export const rejectReports = (podcastId, verdict) => {
  return apiClient.post(`/podcast/reject/podcast/${podcastId}`, verdict);
};

export const getHistoryPodcasts = (page = 0, size = 10, sortParam = '') => {
  return apiClient.get('//' , {
    params: {}
  });
};

export const getHistoryPodcastById = (podcastId) => {
  return apiClient.get(`//`);
};

// http://localhost:8089/tiktalk/api/album/?page=0&size=10&sortParam=ID_ASC