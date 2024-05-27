<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getPodcasts } from '../model/api';

export default {
  setup() {
    const podcasts = ref([]);
    const router = useRouter();

    const currentPage = ref(1);
    const pageSize = 10; // колво подкастов с жалобами на одной странцие

    const totalPages = computed(() => Math.ceil(podcasts.value.length / pageSize));

    const hasNextPage = computed(() => currentPage.value < totalPages.value);

    const logout = () => {
      localStorage.setItem('isAuthenticated', false);
      router.push('/');
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const paginatedPodcasts = computed(() => {
      const startIndex = (currentPage.value - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return podcasts.value.slice(startIndex, endIndex);
    });

    const fetchPodcasts = async () => {
      try {
        const response = await getPodcasts(currentPage.value - 1, pageSize);
        podcasts.value = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке подкастов', error);
      }
    };

    onMounted(() => {
      fetchPodcasts();
    });

    return {
      paginatedPodcasts,
      currentPage,
      totalPages,
      hasNextPage,
      prevPage,
      nextPage,
      logout
    };
  },
};
</script>

<template>
  <div class="podcast-page">
    <header>
      <div class="nav-buttons">
        <router-link to="/metrics">Метрики</router-link>
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
            <tr class="tr-list">
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
              <td>{{ podcast.reportsCount }}</td>
              <!--<td>{{ podcast.duration }}</td>  Обратите внимание, что в API-ответе нет поля duration -->
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button class="pagination-button" @click="prevPage" :disabled="currentPage === 1" style="cursor: pointer;">&lt</button>
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
  width: 196px;
  height: 48px;
  font-size: 30px;
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
  /* justify-content: space-between; */
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
}

.list {
  display: flex;
  flex-direction: column;
  background-color: #25252C;
  align-items: center;
  padding: 5px;
  width: 1280px;

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
  width: 60px;
  height: 60px;
  font-size: 32px;
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