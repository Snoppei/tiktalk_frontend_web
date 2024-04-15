<script>
export default {
  data() {
    return {
      podcast: {
        imageUrl: "../src/assets/podcastPic.png",
        title: "Загадки Вселенной",
        author: "Космический Голос",
        description: "Путешествие по тайнам космоса. Черные дыры, темная материя, жизнь на других планетах - мы обсуждаем все самые интересные загадки Вселенной."
      },
      complaints: [
        { id: 1, title: "Некорректные данные о черных дырах", message: "1" },
        { id: 2, title: "Слишком много научных терминов, сложно для понимания", message: "2" },
        { id: 3, title: "Автор предвзят в своих выводах о жизни на Марсе", message: "3" },
        { id: 4, title: "Плохое качество звука", message: "4" },
        { id: 5, title: "Музыкальное оформление отвлекает", message: "5" } 
      ],
      currentPage: 1,
      totalPages: 1,
      selectedComplaint: null
    };
  },
  methods: {
    selectComplaint(complaint) {
      this.selectedComplaint = complaint;
    }
  }
};
</script>

<template>
    <div id="podcast-complaints">
      <header>
        <div class="nav-buttons">
            <router-link to="/metrics">Метрики</router-link>
            <router-link to="/podcasts">Список подкастов</router-link>
            <router-link to="/history">История</router-link>
        </div>
        <button class="logout" @click="logout">Выйти</button>
      </header>
  
      <main>
        <div class="complaints-section">
            <div class="podcast-preview">
                <img :src="podcast.imageUrl" alt="Podcast Image" />
                <h2>{{ podcast.title }}</h2>
                <p class="author">Автор: {{ podcast.author }}</p>
                <p class="description">{{ podcast.description }}</p>
            </div>
    
            <div class="complaints">
                <h3>Количество жалоб: {{ complaints.length }}</h3>
                <div class="menu">
                    <div>
                        <table>
                            <tbody>
                            <tr class="complaint-unit" v-for="complaint in complaints" :key="complaint.id" @click="selectComplaint(complaint)">
                                <td>{{ complaint.title }}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="pagination">
                            <button class="pagination-button" @click="prevPage" :disabled="currentPage === 1"><</button>
                            <button class="pagination-button" @click="nextPage" :disabled="!hasNextPage">></button>
                        </div>
                    </div>
                    <div class="complaint-details" v-if="selectedComplaint">
                        <p>{{ selectedComplaint.message }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="podcast-player">
          <audio ref="player" :src="podcast.audioUrl" @play="onPlay" @pause="onPause" @ended="onEnd">
            <source :src="podcast.audioUrl" type="audio/mpeg">
              Your browser does not support the audio tag.
            </source>
          </audio>
  
          <div class="player-controls">
            <button @click="play" :disabled="isPlaying">Play</button>
            <button @click="pause" :disabled="!isPlaying">Pause</button>
            <div class="progress-bar">
              <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
            </div>
            <div class="volume-control">
              <input type="range" v-model="volume" min="0" max="1" step="0.01" />
              <i class="fas fa-volume-up" v-if="volume > 0"></i>
              <i class="fas fa-volume-off" v-if="volume === 0"></i>
            </div>
          </div>
          <div class="player-time">
            <span class="current-time">{{ currentTime }}</span>
            <span class="remaining-time">{{ remainingTime }}</span>
          </div>
        </div>
  
        <div class="podcast-actions">
          <button>Удалить подкаст</button>
          <button>Одобрить подкаст</button>
        </div>

        <div class="podcast-actions">
          <button>Удалить подкаст</button>
          <button>Одобрить подкаст</button>
        </div>
      </main>
      <footer>
        <img src="../assets/logo.png" alt="Logo">
      </footer>
    </div>
  </template>
  
<style>
.complaints-unit{
    display: block;
}
.menu {
    display: grid;
    grid-template-columns: 3fr 4fr;
}
.complaints-section {
    display: flex;
    flex-direction: row;
}
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
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.podcast-player {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.player-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.player-controls button {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.progress-bar {
  width: 100%;
  height: 5px;
  background-color: #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.5s ease;
}

.volume-control {
  display: flex;
  align-items: center;
}

.volume-control input[type="range"] {
  width: 100px;
  margin-right: 10px;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

.volume-control input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background-color: #4caf50;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.volume-control input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background-color: #4caf50;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.volume-control i {
  font-size: 20px;
  cursor: pointer;
}

.player-time {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.player-time span {
  font-size: 14px;
}
</style>