<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { computed, ref, onMounted, watch } from 'vue';

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const podcastId = route.params.id;
    const podcast = computed(() => store.getters.getPodcastById(parseInt(podcastId)));
    const solution = ref('')
    const selectedComplaint = ref(null);
    const isPlaying = ref(false);
    const currentTime = ref('00:00');
    const remainingTime = ref('');
    const volume = ref(1.0);
    let intervalId = null;
    const progressPercentage = ref(0);

    const player = ref(null);

    let currentPage = ref(1);
    const pageSize = 7;

    const selectComplaint = (complaint) => {
      selectedComplaint.value = complaint;
    };

    const logout = () => {
      localStorage.setItem('isAuthenticated', false);
      router.push('/login');
    };

    const filteredComplaints = ref([]);

    const updateFilteredComplaints = () => {
      const startIndex = (currentPage.value - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      filteredComplaints.value = podcast.value.complaints.slice(startIndex, endIndex);
    };

    watch(currentPage, () => {
      updateFilteredComplaints();
    });

    const totalPages = computed(() => Math.ceil(podcast.value.complaints.length / pageSize));

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      } else {
        currentPage.value = 1;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      } else {
        currentPage.value = totalPages.value;
      }
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

    const deletePodcast = () => {
      const podcastId = podcast.value.id;
      const solutionValue = solution.value; // Получаем решение из введенного текста
      store.commit('DELETE_PODCAST', { podcastId, solution: solutionValue }); // Передаем идентификатор подкаста и решение в мутатор
      router.push('/podcasts');
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

    const rejectComplaints = () => {
      const podcastId = podcast.value.id;
      const solutionValue = solution.value; // Получаем решение из введенного текста
      store.commit('REJECT_COMPLAINTS', { podcastId, solution: solutionValue }); // Передаем идентификатор подкаста и решение в мутатор
      router.push('/podcasts');
    };
    onMounted(() => {
      if (player.value) {
        player.value.addEventListener('loadedmetadata', () => {
          remainingTime.value = formatTime(player.value.duration);
        });
      }
      updateFilteredComplaints();
    });

    return {
      playPauseClass,
      seekTo,
      solution,
      podcast,
      selectedComplaint,
      isPlaying,
      currentTime,
      remainingTime,
      volume,
      player,
      progressPercentage,
      selectComplaint,
      play,
      pause,
      updateProgress,
      formatTime,
      onPlay,
      onPause,
      onEnd,
      togglePlayPause,
      setVolume,
      filteredComplaints,
      currentPage,
      pageSize,
      totalPages,
      prevPage,
      nextPage,
      deletePodcast,
      rejectComplaints,
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
          <img :src="podcast.imageUrl" alt="Podcast Image" />
          <h2>{{ podcast.name }}</h2>
          <p class="author">Автор: {{ podcast.author }}</p>
        </div>

        <div class="complaints">
          <h3>Количество жалоб: {{ podcast.complaintsCount }}</h3>
          <div class="menu">
            <div class="listOfComplaints">
              <table class="compl-table">
                <tbody>
                  <tr v-for="complaint in filteredComplaints" :key="complaint.id" @click="selectComplaint(complaint)"
                    style="cursor: pointer;">
                    <td class="complaint-unit">{{ complaint.title }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="pagination">
                <button class="pagination-button" @click="prevPage" :disabled="currentPage === 1"
                  style="cursor: pointer;"><</button>
                    <button class="pagination-button" @click="nextPage" :disabled="currentPage === totalPages.value"
                      style="cursor: pointer;">></button>
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
            <div class="seek-bar">
              <input type="range" :value="progressPercentage" min="0" max="100" step="0.1" @input="seekTo($event.target.value)">
            </div>
            <div class="volume-control">
              <input type="range" :value="volume" min="0" max="1" step="0.01" @input="setVolume($event.target.value)" />
            </div>
          </div>
        </div>
      </div>
      <div class="text-input-section">
        <div v-if="!solution" class="error-message">Введите решение перед удалением подкаста или отклонением жалоб.</div>
        <textarea v-model="solution" placeholder="Введите ваше решение" rows="4" cols="40"></textarea>
      </div>
      <div class="podcast-actions">
        <button class="delete" @click="deletePodcast" style="cursor: pointer;" :disabled="!solution">Удалить подкаст</button>
        <button class="approve" @click="rejectComplaints" style="cursor: pointer;" :disabled="!solution">Отклонить жалобы</button>
      </div>
    </main>
    <footer class="footer-podcast">
      <img src="../assets/logo.png" alt="Logo">
    </footer>
  </div>
</template>
<style>
.text-input-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: rgba(26, 27, 34, 0.7);
  margin: 0 0 10px 0;
}
textarea {
  resize: none;
  cursor: text;
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

.complaints-unit {
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