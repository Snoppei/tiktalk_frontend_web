<script>
export default {
  data () {
    return {
      podcasts: [
        { id: 1, name: 'Подкаст 1', complaints: 26, duration: '12:34' },
        { id: 2, name: 'Подкаст 2', complaints: 25, duration: '13:45' },
        { id: 3, name: 'Подкаст 3', complaints: 24, duration: '14:56' },
        { id: 4, name: 'Подкаст 4', complaints: 18, duration: '10:23' },
        { id: 5, name: 'Подкаст 5', complaints: 32, duration: '15:01' },
        { id: 6, name: 'Подкаст 6', complaints: 15, duration: '09:47' },
        { id: 7, name: 'Подкаст 7', complaints: 21, duration: '11:59' },
        { id: 8, name: 'Подкаст 8', complaints: 29, duration: '14:32' },
        { id: 9, name: 'Подкаст 9', complaints: 19, duration: '10:56' },
        { id: 11, name: 'Подкаст 11', complaints: 23, duration: '12:18' },
        { id: 12, name: 'Подкаст 12', complaints: 23, duration: '12:18' },
        { id: 130, name: 'Подкаст 130', complaints: 23, duration: '12:18' },
        { id: 104, name: 'Подкаст 104', complaints: 23, duration: '12:18' },
        { id: 120, name: 'Подкаст 120', complaints: 23, duration: '12:18' },
        { id: 1110, name: 'Подкаст 1110', complaints: 23, duration: '12:18' },
        { id: 1034, name: 'Подкаст 1034', complaints: 23, duration: '12:18' },
        { id: 1120, name: 'Подкаст 1120', complaints: 23, duration: '12:18' },
        { id: 1044, name: 'Подкаст 1044', complaints: 23, duration: '12:18' },
      ],
      currentPage: 1,
      totalPages: 1 // Дополнительное поле для хранения общего количества страниц
    }
  },
  mounted () {
    this.getPodcasts()
  },
  methods: {
    getPodcasts () {
      // Загрузить список подкастов с сервера, обновив данные и общее количество страниц
      // ...
    },
    prevPage () {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getPodcasts(); // Обновить данные для новой страницы
      }
    },
    nextPage () {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.getPodcasts(); // Обновить данные для новой страницы
      }
    },
    logout () {
      // Выйти из системы
    },
    computed: {
      hasNextPage () {
        return this.currentPage < this.totalPages;
      }
    }
  }
}
</script>
<template>
    <div class="podcast-page">
        <header>
        <div class="nav-buttons">
            <router-link to="/metrics">Метрики</router-link>
            <router-link to="/podcasts">Список подкастов</router-link>
            <router-link to="/history">История</router-link>
        </div>
        <button class="logout" @click="logout">Выйти</button>
      </header>
      <main>
        <div class="list">
          <h1>Список подкастов с жалобами</h1>
          <table>
            <thead>
              <tr class="tr-list">
                <th>Название</th>
                <th>Жалобы</th>
                <th>Длительность</th>
              </tr>
            </thead>
            <tbody>
              <tr class="tr-list" v-for="podcast in podcasts" :key="podcast.id">
                <td>
                <router-link :to="`/podcasts/${podcast.id}`">{{ podcast.name }}</router-link>
                </td>
                <td>{{ podcast.complaints }}</td>
                <td>{{ podcast.duration }}</td>
              </tr>
            </tbody>
          </table>
          <div class="pagination">
            <button class="pagination-button" @click="prevPage" :disabled="currentPage === 1"><</button>
            <button class="pagination-button" @click="nextPage" :disabled="!hasNextPage">></button>
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
table {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
thead {
  width: 100%;
}
.tr-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* justify-content: space-between; */
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
    margin: 10px 0;
    width: 1280px;
    height: 100%;
}
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.nav-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 400px;
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