<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('podcasts', ['podcasts', 'currentPage', 'pageSize']),
    hasNextPage() {
      return this.podcasts.length === this.pageSize;
    },
    hasPrevPage() {
      return this.currentPage > 1;
    },
    paginatedPodcasts() {
      return this.podcasts || [];
    },
  },
  methods: {
    ...mapActions('podcasts', ['fetchPodcasts', 'setCurrentPage', 'setCurrentPageHistory']),
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
      if (this.hasPrevPage) {
        this.setCurrentPage(this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.hasNextPage) {
        this.setCurrentPage(this.currentPage + 1);
      }
    },
    updateCurrentPage(page) {
      localStorage.setItem('currentPage', page);
      this.setCurrentPage(page);
    },
    formatDuration(duration) {
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    },
  },
  watch: {
    paginatedPodcasts: {
      immediate: true, 
      handler(newPodcasts) {
        if (newPodcasts.length === 0 && this.currentPage > 1) {
          this.setCurrentPage(this.currentPage - 1);
        }
        newPodcasts.forEach((podcast) => {
          if (podcast.audioUrl && !podcast.duration) {
            this.$store.dispatch('podcasts/fetchPodcastDuration', podcast.audioUrl)
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
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      this.setCurrentPage(Number(savedPage));
      this.fetchPodcasts()
        .then(() => {
          setTimeout(() => {
            this.showPage = true; 
          }, 50);
        });
    } else {
      this.fetchPodcasts()
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
        <h1>Список подкастов с жалобами</h1>
        <table class="podcasts">
          <thead>
            <tr class="tr-list1">
              <th>Название</th>
              <th>Жалобы</th>
              <th>Длительность</th> 
            </tr>
          </thead>
          <tbody>
            <tr class="tr-list" v-for="podcast in paginatedPodcasts" :key="podcast.id">
              <td>
                <router-link :to="`/podcasts/${podcast.id}`">{{ podcast.name }}</router-link>
              </td>
              <td>
                <router-link :to="`/podcasts/${podcast.id}`">{{ podcast.reportsCount }}</router-link></td>
              <td>
                <router-link :to="`/podcasts/${podcast.id}`">{{ podcast.duration ? formatDuration(podcast.duration) : '' }}</router-link></td> 
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button class="pagination-button" @click="prevPage" :disabled="currentPage === 1" style="cursor: pointer;"><</button>
          <button class="pagination-button" @click="prevPage" :disabled="currentPage === 1">{{ currentPage }}</button>
          <button class="pagination-button" @click="nextPage" :disabled="!hasNextPage" style="cursor: pointer;">></button>
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

a {
  margin-top: 0;
}

table {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.podcasts {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 536px;
}

thead {
  width: 100%;
}

.tr-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 7px 0 8px 0;
  position: relative;
}

.tr-list1 {
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
table {
  background-color: rgba(26, 27, 34, 0.7);
}

td {
  text-align: center;
}

footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px 0;
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
  width: 1280px;
  height: 100%;
}

header {
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.nav-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 450px;
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