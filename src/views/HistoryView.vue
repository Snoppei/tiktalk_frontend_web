<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('podcasts', ['history', 'currentPageHistory', 'pageSizeHistory']),
    hasNextPageHistory() {
      return this.history.length === this.pageSizeHistory;
    },
    hasPrevPageHistory() {
      return this.currentPageHistory > 1;
    },
    paginatedHistory() {
      return this.history || [];
    },
  },
  methods: {
    ...mapActions('podcasts', ['fetchHistoryPodcasts', 'setCurrentPageHistory', 'setCurrentPage']),
    logout() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('expires_in');
      localStorage.removeItem('token_received_at');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('currentPage');
      localStorage.removeItem('currentPageHistory');
      this.$router.push('/');
    },
    prevPage() {
      if (this.hasPrevPageHistory) {
        this.setCurrentPageHistory(this.currentPageHistory - 1);
      }
    },
    nextPage() {
      if (this.hasNextPageHistory) {
        this.setCurrentPageHistory(this.currentPageHistory + 1);
      }
    },
    updateCurrentPageHistory(page) {
      localStorage.setItem('currentPageHistory', page);
      this.setCurrentPageHistory(page);
    },
    formatDuration(duration) {
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    },
  },
  watch: {
    paginatedHistory: {
      immediate: true, 
      handler(newHistory) {
        if (newHistory.length === 0 && this.currentPageHistory > 1) {
          this.setCurrentPage(this.currentPageHistory - 1);
        }
        newHistory.forEach((podcast) => {
          if (podcast.audioUrl && !podcast.duration) {
            this.$store.dispatch('podcasts/fetchPodcastDurationHistory', podcast.id)
              .catch((error) => {
                console.error(`Ошибка получения длительности:`, error);
                this.$set(podcast, 'duration', null); 
                this.$set(podcast, 'durationError', 'Не удалось получить длительность');
              });
          }
        });
      },
    },
  },
  mounted() {
    const savedPage = localStorage.getItem('currentPageHistory');
    if (savedPage) {
      this.setCurrentPageHistory(Number(savedPage));
      this.fetchHistoryPodcasts()
        .then(() => {
          setTimeout(() => {
            this.showPage = true; 
          }, 50);
        });
    } else {
      this.fetchHistoryPodcasts()
        .then(() => {
          setTimeout(() => {
            this.showPage = true; 
          }, 50);
        });
    }
  },
  data() {
    return {
      showPage: false
    };
  }
};
</script>

<template>
  <div class="podcast-page" v-if="showPage">
    <header>
      <div class="nav-buttons">
        <a href="https://appmetrica.yandex.ru/overview?period=week&group=day&currency=rub&accuracy=medium&appId=4569310">Метрики</a>
        <router-link to="/podcasts">Список подкастов</router-link>
        <router-link to="/history">История</router-link>
      </div>
      <button class="logout" @click="logout" style="cursor: pointer;">Выйти</button>
    </header>
    <main>
      <div class="list">
        <h1>История</h1>
        <table class="podcasts">
          <thead>
            <tr class="tr-list1">
              <th>Название</th>
              <th>Действие</th>
              <th>Длительность</th> 
            </tr>
          </thead>
          <tbody>
            <tr class="tr-list" v-for="podcast in paginatedHistory" :key="podcast.id">
              <td>
                <router-link :to="`/history/${podcast.id}`">{{ podcast.name }}</router-link>
              </td>
              <td>
                <router-link :to="`/history/${podcast.id}`">
                  {{ podcast.reportType === 'DELETE' ? 'Удален' : 'Жалобы отклонены' }}
                </router-link>
              </td> 
              <td>
                <router-link :to="`/history/${podcast.id}`">{{ podcast.duration ? formatDuration(podcast.duration) : '' }}</router-link>
              </td>  
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button class="pagination-button" @click="prevPage" :disabled="currentPageHistory === 1" style="cursor: pointer;"><</button>
          <button class="pagination-button" @click="prevPage" :disabled="currentPageHistory === 1">{{ currentPageHistory }}</button>
          <button class="pagination-button" @click="nextPage" :disabled="!hasNextPageHistory" style="cursor: pointer;">></button>
        </div>
      </div>
    </main>
    <footer>
      <img src="../assets/logo.png" alt="Logo">
    </footer>
  </div>
</template>

<style>
.logout {
  display: block;
  width: 98px;
  height: 36px;
  font-size: 18px;
  padding: 5px;
  background-color: #FF453A;
  color: #fff;
  border: 1px solid #FF453A;
  border-radius: 16px;
  margin: 0 0 5px 0;
}

table {
  display: flex;
  flex-direction: column;
  width: 100%;
}

thead {
  width: 100%;
}

.tr-list1 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 7px 0 8px 0;
  position: relative;
}

.tr-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 7px 0 8px 0;
  position: relative;
}

.tr-list::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #757575;
}
.tr-list:hover::after { 
  border-bottom-color: #3067DE;
}

td {
  text-align: center;
}

footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.pagination {
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin: 15px 0 15px 0;
}

.list {
  display: flex;
  flex-direction: column;
  background-color: #25252C;
  align-items: center;
  padding: 5px;
  width: 1280px;
  border-radius: 10px;
}

.podcast-page {
  margin: 10px 0;
  width: 1280px;
  height: 100%;
}

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.pagination-button {
  display: block;
  width: 40px;
  height: 40px;
  font-size: 18px;
  padding: 10px;
  background-color: #1A1B22;
  color: #fff;
  border: 1px solid #1A1B22;
  border-radius: 0px;
  margin: 0 0;
}

main {
  background: rgba(26, 27, 34, 0.7);
}
</style>