import axios from 'axios';

const minioClient = axios.create({
  baseURL: 'http://localhost:9000', // Замените на ваш адрес и порт Minio
  // Дополнительные настройки для Minio, если нужно (например, аутентификация)
});

export const getFileByPodcastId = (url) => {
  return minioClient.get(url.slice(20), { responseType: 'blob' });
};