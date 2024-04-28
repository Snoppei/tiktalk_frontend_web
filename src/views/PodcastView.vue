<script>
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    let podcast = null;

    return {
      podcast,
    };
  },
  mounted() {
    const podcastId = this.$route.params.id;
    const podcasts = this.$store.state.podcasts;
    const foundPodcast = podcasts.find(podcast => podcast.id === parseInt(podcastId));

    if (foundPodcast) {
      this.podcast = foundPodcast;
    } else {
      console.error('Подкаст с таким идентификатором не найден');
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
        </div>
        <button class="logout" @click="logout">Выйти</button>
      </header>
  
      <main>
        <div class="complaints-section">
            <div class="podcast-preview">
                <img :src="podcast.imageUrl" alt="Podcast Image" />
                <h2>{{ podcast.name }}</h2>
                <p class="author">Автор: {{ podcast.author }}</p>
            </div>
    
            <div class="complaints">
                <h3>Количество жалоб: {{ podcast.complaintsCount }}</h3>
                <div class="menu">
                    <div class="listOfComplaints">
                        <table>
                            <tbody>
                            <tr v-for="complaint in podcast.complaints" :key="podcast.complaint.id" @click="selectComplaint(complaint)">
                                <td class="complaint-unit">{{ podcast.complaint.title }}</td>
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
        <div class="podcast-desription">
          <p class="description">{{ podcast.description }}</p>
        </div>
        <div class="wrapper">
          <div class="podcast-player">
            <audio ref="player" :src="podcast.audioUrl" @play="onPlay" @pause="onPause" @ended="onEnd">
              <source :src="podcast.audioUrl" type="audio/mpeg">
              </source>
            </audio>
            <div class="player-controls">
              <button @click="togglePlayPause" :class="playPauseClass"></button>
              <div class="player-time">
                <span class="current-time">{{ currentTime }}</span>
                <p class="slash"> / </p>
                <span class="remaining-time">{{ remainingTime }}</span>
              </div>
              <div class="progress-bar">
                <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
              </div>
              <div class="volume-control">
                <input type="range" :value="volume" min="0" max="1" step="0.01" @input="setVolume($event.target.value)"/>
              </div>
            </div>
          </div>
        </div>
        <div class="podcast-actions">
          <button class="delete">Удалить подкаст</button>
          <button class="approve">Отклонить жалобы</button>
        </div> 
      </main>
      <footer class="footer-podcast">
        <img src="../assets/logo.png" alt="Logo">
      </footer>
    </div>
  </template>
  
<style>
.podcast-desription {
  margin: 20px 0 10px 0;
}
.listOfComplaints {
  background-color: rgba(26, 27, 34, 0.7);
}
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
td {
  padding: 0;
}
.complaint-details {
  padding: 0 5px 5px 5px;
  height: 100%;
  background-color: rgba(26, 27, 34, 0.7);
}
.complaint-details p {
  padding-top: 2px;
}
.podcast-preview {
  width: 100%;
  height: auto;
}
.current-time {
  color: #000000;
}
.remaining-time {
  color: #000000;
}
.slash {
  color: #000000;
}
.podcast-actions {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 40px;
  width: 100%;
}
.complaints h3 {
  margin-left: 5px;
}
.complaints {
  background-color: #25252C;
  width: 100%;
  height: 100%;
}
.complaints-unit{
  display: block;
}
.delete {
  display: block;
  width: 300px;
  height: 64px;
  font-size: 30px;
  padding: 10px;
  background-color: #FF453A;
  color: #fff;
  border: 1px solid #FF453A;
  border-radius: 16px;
  margin: 0 0;
}
.approve {
  display: block;
  width: 300px;
  height: 64px;
  font-size: 30px;
  padding: 10px;
  background-color: #3067DE;
  color: #fff;
  border: 1px solid #3067DE;
  border-radius: 16px;
  margin: 0 0;
}
.menu {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 5px;
  padding: 5px;
}
.complaint-unit {
  display: block;
  margin-top: 2px;
  margin-bottom: 2px;
  border: 1px solid #0d0d0f;
  background-color: #1A1B22;
}
.pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
  margin: 5px 0 5px 0;
}
.complaints-section {
  display: grid;
  grid-template-columns: 1fr 3fr;
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
  border: 1px solid #EFF1F2;
  background-color: #EFF1F2;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 10px;
  margin: 20px 0 20px 0;
}

.player-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.player-controls button {
  width: 15px;
  height: 17px;
  padding: 5px;
  background-color: transparent;
  background-image: url('../assets/play.png');
  background-size: cover;
  border: none;
  cursor: pointer;
}

.player-controls button.play {
  background-image: url('../assets/play.png');
  width: 15px;
  height: 17px;
  padding: 5px;
}

.player-controls button.pause {
  background-image: url('../assets/pause.png');
  width: 15px;
  height: 16px;
  padding: 5px;
}

.progress-bar {
  width: 50%;
  height: 5px;
  background-color: #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #3067DE;
  transition: width 0.5s ease;
}

.volume-control {
  display: flex;
  align-items: center;
}

.volume-control input[type="range"] {
  width: 100px;
  margin-right: 0;
  margin-bottom: 0;
}

.player-time {
  display: flex;
  justify-content: space-between;
}

.player-time span {
  font-size: 14px;
}
.footer-podcast {
  margin: 80px 0 80px 0;
}
</style>