import axios from 'axios';
import { parseBlob } from 'music-metadata-browser';
// import jsmediatags from 'jsmediatags';


const minioClient = axios.create({
  baseURL: 'http://localhost:9000',
});

export const getFileByPodcastId = (url) => {
  return minioClient.get(url, { responseType: 'blob' });
};

export async function getAudioDuration(audioUrl) {
  try {
    const response = await axios.get(audioUrl, { responseType: 'blob' });
    const metadata = await parseBlob(response.data);

    // Возвращаем null, если длительность не найдена в метаданных
    return metadata.format.duration || null; 
  } catch (error) {
    console.error('Ошибка получения длительности:', error);
    return null; // Возвращаем null в случае ошибки
  }
}

// async function getDurationFromMetadata(audioUrl) {
//   return new Promise((resolve, reject) => {
//     jsmediatags.read(audioUrl, {
//       onSuccess: function(tag) {
//         const duration = tag.tags.duration; // Длительность в секундах (может быть undefined)
//         resolve(duration);
//       },
//       onError: function(error) {
//         console.error('Ошибка чтения метаданных:', error);
//         reject(error);
//       },
//     });
//   });
// }

// export async function getAudioDuration(audioUrl) {
//   try {
//     console.log('Запрос к Minio:', audioUrl);

//     const response = await minioClient.get(audioUrl, { responseType: 'blob' });
//     console.log('Ответ Minio:', response);

//     const blob = response.data;
//     console.log('Blob:', blob);

//     const duration = await new MP3Duration(blob).getDuration(); // Создаем объект MP3Duration и вызываем метод getDuration()
//     console.log('Длительность:', duration); // Проверка
//     return duration;

//   } catch (error) {
//     console.error('Ошибка при получении длительности:', error);
//     throw error;
//   }
// }