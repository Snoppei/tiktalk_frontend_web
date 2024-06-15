import { 
  getPodcasts, 
  getPodcastById, 
  getPersonById, 
  getReportsByPodcastId, 
  banPodcast, 
  rejectReports, 
  getHistoryPodcasts, 
  getHistoryPodcastById 
} from '../api'; 

import { createStore } from 'vuex';
import { getAudioDuration } from '../minioapi';



export const podcasts = {
  namespaced: true,
  state: {
    podcasts: [],
    history: [],
    currentPage: 1,
    currentPageHistory: 1,
    pageSize: 15,
    pageSizeHistory: 15,
    sortParam: 'REPORTS_COUNT_DESC',
    sortParamHistory: 'CREATION_DATE_ASC'
  },
  mutations: {
    SET_PODCASTS(state, podcasts) {
      state.podcasts = podcasts;
    },
    SET_HISTORY(state, history) {
      state.history = history;
    },
    DELETE_PODCAST(state, payload) {
      const { podcastId, solution } = payload;
      const index = state.podcasts.findIndex(podcast => podcast.id === podcastId);
      if (index !== -1) {
        state.history.push({
          ...state.podcasts[index],
          decision: "Подкаст удален",
          solution: solution
        });
        state.podcasts.splice(index, 1);
      }
    },
    REJECT_COMPLAINTS(state, payload) {
      const { podcastId, solution } = payload;
      const index = state.podcasts.findIndex(podcast => podcast.id === podcastId);
      if (index !== -1) {
        state.history.push({
          ...state.podcasts[index],
          decision: "Жалобы отклонены",
          solution: solution
        });
        state.podcasts.splice(index, 1);
      }
    },
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    },
    SET_CURRENT_PAGE_HISTORY(state, page) {
      state.currentPageHistory = page;
    },
    SET_PAGE_SIZE(state, size) { 
      state.pageSize = size;
    },
    SET_SORT_PARAM(state, sortParam) {
      state.sortParam = sortParam;
    },
    SET_SORT_PARAM_HISTORY(state, sortParam) {
      state.sortParamHistory = sortParam;
    },
    SET_PODCAST_DURATION(state, { podcastId, duration }) {
      const index = state.podcasts.findIndex(podcast => podcast.audioUrl === podcastId);
      if (index !== -1) {
        state.podcasts[index].duration = duration;
      }
    },
    SET_PODCAST_DURATION_HISTORY(state, { podcastId, duration }) {
      const index = state.history.findIndex(podcast => history.audioUrl === podcastId);
      if (index !== -1) {
        state.history[index].duration = duration;
      }
    }
  },
  actions: {
    async fetchPodcasts({ commit, state, dispatch }) {
      try {
        const response = await getPodcasts(
          state.currentPage - 1,
          state.pageSize,
          state.sortParam
        );
        commit('SET_PODCASTS', response.data);
      } catch (error) {
        console.error('Ошибка при загрузке подкастов:', error);
      }
    },
    setCurrentPage({ commit, dispatch }, page) {
      commit('SET_CURRENT_PAGE', page);
      localStorage.setItem('currentPage', page);
      dispatch('fetchPodcasts');
    },
    async fetchPodcastDetails({ commit }, podcastId) {
      try {
        const response = await getPodcastById(podcastId);
        return response.data;
      } catch (error) {
        console.error('Ошибка при загрузке подкаста:', error);
        throw error; 
      }
    },
    async fetchAuthor({ commit }, personId) {
      try {
        const response = await getPersonById(personId);
        return response.data;
      } catch (error) {
        console.error('Ошибка при загрузке автора:', error);
        throw error;
      }
    },
    async fetchReports({ commit }, { podcastId, page, size, sortParam }) {
      try {
        const response = await getReportsByPodcastId(podcastId, page, size, sortParam);
        return response.data;
      } catch (error) {
        console.error('Ошибка при загрузке жалоб:', error);
        throw error;
      }
    },
    async deletePodcast({ commit }, { podcastId, solution }) {
      try {
        await banPodcast(podcastId, solution);
        commit('DELETE_PODCAST', { podcastId, solution });
      } catch (error) {
        console.error('Ошибка при удалении подкаста:', error);
        throw error; 
      }
    },
    async rejectComplaints({ commit }, { podcastId, solution }) {
      try {
        await rejectReports(podcastId, solution);
        commit('REJECT_COMPLAINTS', { podcastId, solution });
      } catch (error) {
        console.error('Ошибка при отклонении жалоб:', error);
        throw error; 
      }
    },
    async fetchHistoryPodcasts({ commit, state }) {
      try {
        const response = await getHistoryPodcasts(state.currentPage, state.pageSize, state.sortParam);
        commit('SET_HISTORY', response.data);
      } catch (error) {
        console.error('Ошибка при загрузке истории подкастов:', error);
      }
    },
    async fetchHistoryPodcastDetails({ commit }, podcastId) {
      try {
        const response = await getHistoryPodcastById(podcastId);
        return response.data;
      } catch (error) {
        console.error('Ошибка при загрузке подкаста из истории:', error);
        throw error; 
      }
    },
    setPageSize({ commit }, size) {
      commit('SET_PAGE_SIZE', size);
    },
    setSortParam({ commit }, sortParam) {
      commit('SET_SORT_PARAM', sortParam);
    },
    setSortParamHistory({ commit }, sortParam) {
      commit('SET_SORT_PARAM_HISTORY', sortParam);
    },
    async fetchPodcastDuration({ commit }, audioUrl) {
      try {
        const duration = await getAudioDuration(audioUrl);
        commit('SET_PODCAST_DURATION', { podcastId: audioUrl, duration }); 
      } catch (error) {
        console.error('Ошибка при получении длительности:', error);
        commit('SET_PODCAST_DURATION', { 
          podcastId: audioUrl, 
          duration: null, 
          durationError: 'Не удалось получить длительность' 
        });
      }
    },
    async fetchPodcastDurationHistory({ commit }, audioUrl) {
      try {
        const duration = await getAudioDuration(audioUrl);
        commit('SET_PODCAST_DURATION', { podcastId: audioUrl, duration }); 
      } catch (error) {
        console.error('Ошибка при получении длительности:', error);
        commit('SET_PODCAST_DURATION', { 
          podcastId: audioUrl, 
          duration: null, 
          durationError: 'Не удалось получить длительность' 
        });
      }
    },
  },
  getters: {
    getPodcastById: (state) => (id) => {
      return state.podcasts.find(podcast => podcast.id === id);
    },
    getHistoryPodcastById: (state) => (id) => {
      return state.history.find(podcast => podcast.id === id);
    },
  },
};