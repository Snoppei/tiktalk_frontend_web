<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { computed, ref, onMounted, watch } from 'vue';
import { getFileByPodcastId } from '../model/minioapi';
import { getHistoryPodcastById } from '../model/api';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const podcastId = route.params.id;
    const podcast = ref(null);
    const isPlaying = ref(false);
    const currentTime = ref('00:00');
    const remainingTime = ref('');
    const volume = ref(1.0);
    let intervalId = null;
    const progressPercentage = ref(0);
    const imageSrc = ref(null);
    const audioSrc = ref(null);
    const player = ref(null);

    const fetchPodcastHistory = async () => {
      try {
        const response = await getHistoryPodcastById(podcastId);
        podcast.value = response.data;

        const imageUrl = `${response.data.imageUrl}`; 
        const audioUrl = `${response.data.audioUrl}`; 

        try {
          const imageResponse = await getFileByPodcastId(imageUrl);
          imageSrc.value = URL.createObjectURL(imageResponse.data);
          const audioResponse = await getFileByPodcastId(audioUrl);
          audioSrc.value = URL.createObjectURL(audioResponse.data);
        } catch (error) {
          console.error('Ошибка загрузки файлов с Minio:', error);
        }
      } catch (error) {
        console.error('Ошибка получения подкаста:', error);
        router.push('/history');
      }
    };

    const logout = () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('expires_in');
      localStorage.removeItem('token_received_at');
      localStorage.removeItem('isAuthenticated');
      router.push('/');
    };
    const play = () => {
      if (!isPlaying.value && player.value) {
        player.value.play();
        isPlaying.value = true;
        intervalId = setInterval(updateProgress, 100);
      }
    };

    const pause = () => {
      if (isPlaying.value && player.value) {
        player.value.pause();
        isPlaying.value = false;
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const updateProgress = () => {
      if (player.value) {
        const currentTimeVal = Math.floor(player.value.currentTime);
        const duration = Math.floor(player.value.duration);
        currentTime.value = formatTime(currentTimeVal);
        if (isPlaying.value) {
          remainingTime.value = formatTime(duration - currentTimeVal);
        } else {
          remainingTime.value = formatTime(duration);
        }
        const progress = (currentTimeVal / duration) * 100;
        progressPercentage.value = progress;
      }
    };

    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.round(seconds % 60);
      return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const onPlay = () => {
    };

    const onPause = () => {
    };

    const onEnd = () => {
      clearInterval(intervalId);
      intervalId = null;
      isPlaying.value = false;
      if (player.value.currentTime !== player.value.duration) {
        player.value.currentTime = player.value.duration;
        updateProgress();
      }
    };

    const togglePlayPause = () => {
      if (isPlaying.value) {
        pause();
      } else {
        play();
      }
    };

    const setVolume = (value) => {
      if (player.value) {
        player.value.volume = parseFloat(value);
        volume.value = parseFloat(value);
      }
    };

    const seekTo = (percentage) => {
      const duration = player.value.duration;
      const newTime = duration * (percentage / 100);
      player.value.currentTime = newTime;
      updateProgress();
    };

    const playPauseClass = computed(() => {
      return isPlaying.value ? 'pause' : 'play';
    });

    onMounted(() => {
      fetchPodcastHistory();
      if (player.value) {
        player.value.addEventListener('loadedmetadata', () => {
          remainingTime.value = formatTime(player.value.duration);
        });
      }
    });

    return {
      imageSrc,
      audioSrc,
      playPauseClass,
      seekTo,
      podcast,
      isPlaying,
      currentTime,
      remainingTime,
      volume,
      player,
      progressPercentage,
      play,
      pause,
      updateProgress,
      formatTime,
      onPlay,
      onPause,
      onEnd,
      togglePlayPause,
      setVolume,
      logout
    };
  },
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
      <button class="logout" @click="logout" style="cursor: pointer;">Выйти</button>
    </header>

    <main>
      <div class="complaints-section">
        <div class="podcast-preview">
          <img class="podcast-image":src="imageSrc" alt="Podcast Image" />
          <h2 v-if="podcast">{{ podcast.name }}</h2>
          <!-- <p class="author">Автор: {{ podcast.author }}</p> -->
        </div>

        <div class="complaints">
          <h3>Причина решения</h3>
          <div class="solution">
            <p v-if="podcast"> {{ podcast.verdict }}</p>
          </div>
        </div>
      </div>
      <div class="podcast-desription">
        <p class="description" v-if="podcast">{{ podcast.description }}</p>
      </div>
      <div class="wrapper" v-if="podcast">
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
            <div class="seek-bar">
              <input type="range" :value="progressPercentage" min="0" max="100" step="0.1" @input="seekTo($event.target.value)">
            </div>
            <div class="volume-control">
              <input type="range" :value="volume" min="0" max="1" step="0.01" @input="setVolume($event.target.value)" />
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer class="footer-podcast">
      <img src="../assets/logo.png" alt="Logo">
    </footer>
  </div>
</template>
<style>
.solution {
  padding: 5px 5px 5px 5px;
  margin: 5px 5px 5px 5px;
  height: 80%;
  background-color: rgba(26, 27, 34, 0.7);
}
.slash {
  color: #FFFFFF;
}
a {
  display: flex;
  justify-content: center;
  align-items: center;
}
.compl-table {
  height: 212px;
}
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
  width: 31px;
  height: 31px;
  padding: 5px;
}

.player-controls button.pause {
  background-image: url('../assets/pause.png');
  width: 31px;
  height: 31px;
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
  color: #FFFFFF;
}
.footer-podcast {
  margin: 80px 0 80px 0;
}
.seek-bar {
  display: flex;
  align-items: center;
}
.seek-bar input[type="range"] {
  width: 300px;
}

.seek-bar input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #25252C;
  cursor: pointer;
}

.seek-bar input[type="range"]::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #25252C;
  cursor: pointer;
}
</style>