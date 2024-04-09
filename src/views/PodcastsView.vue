<script>
export default {
  data () {
    return {
      podcasts: [],
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
        <button @click="logout">Выйти</button>
      </header>
      <main>
        <div class="list">
          <h1>Список подкастов с жалобами</h1>
          <table>
            <thead>
              <tr>
                <th>Название</th>
                <th>Жалобы</th>
                <th>Длительность</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="podcast in podcasts" :key="podcast.id">
                <td>{{ podcast.name }}</td>
                <td>{{ podcast.complaints }}</td>
                <td>{{ podcast.duration }}</td>
              </tr>
            </tbody>
          </table>
          <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1"><</button>
            <button @click="nextPage" :disabled="!hasNextPage">></button>
          </div>
        </div>
      </main>
      <footer>
        <img src="../assets/logo.png" alt="Logo">
      </footer>
    </div>
</template>
<style>
table {
  display: flex;
  justify-content: space-between;
  width: 1280px;
}
thead {
  width: 1280px;
}
tr {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.pagination {
  display: flex;
  flex-direction: row;
  background-color: rgba(26, 27, 34, 0.7);
}
.list {
  display: flex;
  flex-direction: column;
  background-color: rgba(26, 27, 34, 0.7);
  align-items: center;

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
button {
  display: block;
  width: 196px;
  height: 64px;
  font-size: 32px;
  padding: 10px;
  background-color: #3067DE;
  color: #fff;
  border: 1px solid #3067DE;
  border-radius: 16px;
  margin: 0 0;
}
main {
  background: rgba(26, 27, 34, 0.7);
}
    /* Стили таблицы, кнопок и т.д. */
</style>