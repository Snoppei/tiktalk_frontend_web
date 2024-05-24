

export const podcastsStore = {
    state: {
        podcasts: [{
                id: 1,
                name: 'Подкаст 1',
                author: "Автор 1",
                imageUrl: "../src/assets/podcastPic.png",
                audioUrl: "../src/assets/sample-3s.mp3",
                description: "Описание подкаста 1. Описание подкаста 1. Описание подкаста 1. Описание подкаста 1. Описание подкаста 1. Описание подкаста 1. Описание подкаста 1. Описание подкаста 1. Описание подкаста 1. ",
                complaints: [
                    { id: 1, title: 'Жалоба 1', message: 'Содержание жалобы 1' },
                    { id: 2, title: 'Жалоба 2', message: 'Содержание жалобы 2' },
                    { id: 3, title: 'Жалоба 3', message: 'Содержание жалобы 3' },
                    { id: 4, title: 'Жалоба 4', message: 'Содержание жалобы 4' },
                    { id: 5, title: 'Жалоба 5', message: 'Содержание жалобы 5' },
                    { id: 6, title: 'Жалоба 6', message: 'Содержание жалобы 6' },
                    { id: 7, title: 'Жалоба 7', message: 'Содержание жалобы 7' },
                    { id: 44, title: 'Жалоба 44', message: 'Содержание жалобы 44' },
                ],
                get complaintsCount() {
                    return this.complaints.length;
                },
                duration: '0:03'
            },
            {
                id: 2,
                name: 'Подкаст 2',
                author: "Автор 2",
                imageUrl: "../src/assets/podcastPic.png",
                audioUrl: "../src/assets/sample-3s.mp3",
                description: "Описание подкаста 2. Описание подкаста 2. Описание подкаста 2. Описание подкаста 2. Описание подкаста 2. Описание подкаста 2. Описание подкаста 2. Описание подкаста. Описание подкаста 2. ",
                complaints: [
                    { id: 8, title: 'Жалоба 8', message: 'Содержание жалобы 8' },
                    { id: 9, title: 'Жалоба 9', message: 'Содержание жалобы 9' }
                ],
                get complaintsCount() {
                    return this.complaints.length;
                },
                duration: '0:03'
            },
            {
                id: 3,
                name: 'Подкаст 3',
                author: "Автор 3",
                imageUrl: "../src/assets/podcastPic.png",
                audioUrl: "../src/assets/sample-3s.mp3",
                description: "Описание подкаста 3. Описание подкаста 3. Описание подкаста 3. Описание подкаста 3. Описание подкаста 3. Описание подкаста 3. Описание подкаста 3. Описание подкаста 3. Описание подкаста 3. ",
                complaints: [
                    { id: 10, title: 'Жалоба 10', message: 'Содержание жалобы 10' },
                    { id: 11, title: 'Жалоба 11', message: 'Содержание жалобы 11' }
                ],
                get complaintsCount() {
                    return this.complaints.length;
                },
                duration: '0:03'
            },
            {
                id: 4,
                name: 'Подкаст 4',
                author: "Автор 4",
                imageUrl: "../src/assets/podcastPic.png",
                audioUrl: "../src/assets/sample-3s.mp3",
                description: "Описание подкаста 4. Описание подкаста 4. Описание подкаста 4. Описание подкаста 4. Описание подкаста 4. Описание подкаста 4. Описание подкаста 4. Описание подкаста 4. Описание подкаста 4. ",
                complaints: [
                    { id: 12, title: 'Жалоба 12', message: 'Содержание жалобы 12' },
                    { id: 13, title: 'Жалоба 13', message: 'Содержание жалобы 13' }
                ],
                get complaintsCount() {
                    return this.complaints.length;
                },
                duration: '0:03'
            },
            {
                id: 5,
                name: 'Подкаст 5',
                author: "Автор 5",
                imageUrl: "../src/assets/podcastPic.png",
                audioUrl: "../src/assets/sample-3s.mp3",
                description: "Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. ",
                complaints: [
                    { id: 14, title: 'Жалоба 14', message: 'Содержание жалобы 14' },
                    { id: 15, title: 'Жалоба 15', message: 'Содержание жалобы 15' }
                ],
                get complaintsCount() {
                    return this.complaints.length;
                },
                duration: '0:03'
            },
            {
                id: 6,
                name: 'Подкаст 6',
                author: "Автор 6",
                imageUrl: "../src/assets/podcastPic.png",
                audioUrl: "../src/assets/sample-3s.mp3",
                description: "Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. ",
                complaints: [
                    { id: 16, title: 'Жалоба 16', message: 'Содержание жалобы 16' },
                    { id: 17, title: 'Жалоба 17', message: 'Содержание жалобы 17' }
                ],
                get complaintsCount() {
                    return this.complaints.length;
                },
                duration: '0:03'
            },
            {
                id: 7,
                name: 'Подкаст 7',
                author: "Автор 7",
                imageUrl: "../src/assets/podcastPic.png",
                audioUrl: "../src/assets/sample-3s.mp3",
                description: "Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. ",
                complaints: [
                    { id: 18, title: 'Жалоба 18', message: 'Содержание жалобы 18' },
                    { id: 19, title: 'Жалоба 19', message: 'Содержание жалобы 19' }
                ],
                get complaintsCount() {
                    return this.complaints.length;
                },
                duration: '0:03'
            },
            {
                id: 8,
                name: 'Подкаст 8',
                author: "Автор 8",
                imageUrl: "../src/assets/podcastPic.png",
                audioUrl: "../src/assets/sample-3s.mp3",
                description: "Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. ",
                complaints: [
                    { id: 20, title: 'Жалоба 20', message: 'Содержание жалобы 20' },
                    { id: 21, title: 'Жалоба 21', message: 'Содержание жалобы 21' }
                ],
                get complaintsCount() {
                    return this.complaints.length;
                },
                duration: '0:03'
            },
            {
                id: 9,
                name: 'Подкаст 9',
                author: "Автор 9",
                imageUrl: "../src/assets/podcastPic.png",
                audioUrl: "../src/assets/sample-3s.mp3",
                description: "Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. ",
                complaints: [
                    { id: 22, title: 'Жалоба 22', message: 'Содержание жалобы 22' },
                    { id: 23, title: 'Жалоба 23', message: 'Содержание жалобы 23' }
                ],
                get complaintsCount() {
                    return this.complaints.length;
                },
                duration: '0:03'
            },
            {
                id: 10,
                name: 'Подкаст 10',
                author: "Автор 10",
                imageUrl: "../src/assets/podcastPic.png",
                audioUrl: "../src/assets/sample-3s.mp3",
                description: "Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. ",
                complaints: [
                    { id: 24, title: 'Жалоба 24', message: 'Содержание жалобы 24' },
                    { id: 25, title: 'Жалоба 25', message: 'Содержание жалобы 25' }
                ],
                get complaintsCount() {
                    return this.complaints.length;
                },
                duration: '0:03'
            },
            {
                id: 11,
                name: 'Подкаст 11',
                author: "Автор 11",
                imageUrl: "../src/assets/podcastPic.png",
                audioUrl: "../src/assets/sample-3s.mp3",
                description: "Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. ",
                complaints: [
                    { id: 26, title: 'Жалоба 26', message: 'Содержание жалобы 26' },
                    { id: 27, title: 'Жалоба 27', message: 'Содержание жалобы 27' }
                ],
                get complaintsCount() {
                    return this.complaints.length;
                },
                duration: '0:03'
            },
            {
                id: 12,
                name: 'Подкаст 12',
                author: "Автор 12",
                imageUrl: "../src/assets/podcastPic.png",
                audioUrl: "../src/assets/sample-3s.mp3",
                description: "Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. ",
                complaints: [
                    { id: 28, title: 'Жалоба 28', message: 'Содержание жалобы 28' },
                    { id: 29, title: 'Жалоба 29', message: 'Содержание жалобы 29' }
                ],
                get complaintsCount() {
                    return this.complaints.length;
                },
                duration: '0:03'
            },
            {
                id: 13,
                name: 'Подкаст 13',
                author: "Автор 13",
                imageUrl: "../src/assets/podcastPic.png",
                audioUrl: "../src/assets/sample-3s.mp3",
                description: "Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. ",
                complaints: [
                    { id: 30, title: 'Жалоба 30', message: 'Содержание жалобы 30' },
                    { id: 31, title: 'Жалоба 31', message: 'Содержание жалобы 31' }
                ],
                get complaintsCount() {
                    return this.complaints.length;
                },
                duration: '0:03'
            },
            {
                id: 14,
                name: 'Подкаст 14',
                author: "Автор 14",
                imageUrl: "../src/assets/podcastPic.png",
                audioUrl: "../src/assets/sample-3s.mp3",
                description: "Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. ",
                complaints: [
                    { id: 32, title: 'Жалоба 32', message: 'Содержание жалобы 32' },
                    { id: 33, title: 'Жалоба 33', message: 'Содержание жалобы 33' }
                ],
                get complaintsCount() {
                    return this.complaints.length;
                },
                duration: '0:03'
            },
            {
                id: 15,
                name: 'Подкаст 15',
                author: "Автор 15",
                imageUrl: "../src/assets/podcastPic.png",
                audioUrl: "../src/assets/sample-3s.mp3",
                description: "Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. ",
                complaints: [
                    { id: 34, title: 'Жалоба 34', message: 'Содержание жалобы 34' },
                    { id: 35, title: 'Жалоба 35', message: 'Содержание жалобы 35' }
                ],
                get complaintsCount() {
                    return this.complaints.length;
                },
                duration: '0:03'
            },
            {
                id: 16,
                name: 'Подкаст 16',
                author: "Автор 16",
                imageUrl: "../src/assets/podcastPic.png",
                audioUrl: "../src/assets/sample-3s.mp3",
                description: "Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. ",
                complaints: [
                    { id: 36, title: 'Жалоба 36', message: 'Содержание жалобы 36' },
                    { id: 37, title: 'Жалоба 37', message: 'Содержание жалобы 37' }
                ],
                get complaintsCount() {
                    return this.complaints.length;
                },
                duration: '0:03'
            },
            {
                id: 17,
                name: 'Подкаст 17',
                author: "Автор 17",
                imageUrl: "../src/assets/podcastPic.png",
                audioUrl: "../src/assets/sample-3s.mp3",
                description: "Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. ",
                complaints: [
                    { id: 38, title: 'Жалоба 38', message: 'Содержание жалобы 38' },
                    { id: 39, title: 'Жалоба 39', message: 'Содержание жалобы 39' }
                ],
                get complaintsCount() {
                    return this.complaints.length;
                },
                duration: '0:03'
            },
            {
                id: 18,
                name: 'Подкаст 18',
                author: "Автор 18",
                imageUrl: "../src/assets/podcastPic.png",
                audioUrl: "../src/assets/sample-3s.mp3",
                description: "Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. ",
                complaints: [
                    { id: 40, title: 'Жалоба 40', message: 'Содержание жалобы 40' },
                    { id: 41, title: 'Жалоба 41', message: 'Содержание жалобы 41' }
                ],
                get complaintsCount() {
                    return this.complaints.length;
                },
                duration: '0:03'
            },
            {
                id: 199,
                name: 'Подкаст 19',
                author: "Автор 19",
                imageUrl: "../src/assets/podcastPic.png",
                audioUrl: "../src/assets/sample-3s.mp3",
                description: "Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. Описание подкаста. ",
                complaints: [
                    { id: 42, title: 'Жалоба 42', message: 'Содержание жалобы 42' },
                    { id: 43, title: 'Жалоба 43', message: 'Содержание жалобы 43' }
                ],
                get complaintsCount() {
                    return this.complaints.length;
                },
                duration: '0:03'
            }
        ],
        history: []
    },
mutations: {
  DELETE_PODCAST(state, payload) {
    const { podcastId, solution } = payload;
    const index = state.podcasts.findIndex(podcast => podcast.id === podcastId);
    if (index !== -1) {
      state.history.push({
        id: state.podcasts[index].id,
        name: state.podcasts[index].name,
        imageUrl: state.podcasts[index].imageUrl,
        audioUrl: state.podcasts[index].audioUrl,
        author: state.podcasts[index].author,
        description: state.podcasts[index].description,
        decision: "Подкаст удален",
        solution: solution,
        duration: state.podcasts[index].duration
      });
      state.podcasts.splice(index, 1);
    }
  },
  REJECT_COMPLAINTS(state, payload) {
    const { podcastId, solution } = payload;
    const index = state.podcasts.findIndex(podcast => podcast.id === podcastId);
    if (index !== -1) {
      state.history.push({
        id: state.podcasts[index].id,
        name: state.podcasts[index].name,
        imageUrl: state.podcasts[index].imageUrl,
        audioUrl: state.podcasts[index].audioUrl,
        author: state.podcasts[index].author,
        description: state.podcasts[index].description,
        decision: "Жалобы отклонены",
        solution: solution,
        duration: state.podcasts[index].duration
      });
      state.podcasts.splice(index, 1);
    }
  }
},
    actions: {
        deletePodcast({ commit }, payload) {
            commit('DELETE_PODCAST', payload);
        },
        rejectComplaints({ commit }, payload) {
            commit('REJECT_COMPLAINTS', payload);
        }
    },
    getters: {
        PODCASTS: state => {
            return state.podcasts;
        },
        HISTORY: state => {
            return state.history;
        },
        getPodcastById: (state) => (id) => {
            return state.podcasts.find(podcast => podcast.id === id);
        },
        getHistoryPodcastById: (state) => (id) => {
            return state.history.find(podcast => podcast.id === id);
        },
    },
};