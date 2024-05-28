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
  
  export const podcastsStore = {
    state: {
      podcasts: [],
      history: [],
      currentPage: 1, 
      pageSize: 10,
      sortParam: 'REPORTS_COUNT_DESC' 
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
      SET_PAGE_SIZE(state, size) { 
        state.pageSize = size;
      },
      SET_SORT_PARAM(state, sortParam) {
        state.sortParam = sortParam;
      },
    },
    actions: {
      async fetchPodcasts({ commit, state }) {
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
      setCurrentPage({ commit }, page) {
        commit('SET_CURRENT_PAGE', page);
      },
      setPageSize({ commit }, size) {
        commit('SET_PAGE_SIZE', size);
      },
      setSortParam({ commit }, sortParam) {
        commit('SET_SORT_PARAM', sortParam);
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