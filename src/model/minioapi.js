import axios from 'axios';
import { parseBlob } from 'music-metadata-browser';


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

    return metadata.format.duration || null; 
  } catch (error) {
    console.error('Ошибка получения длительности:', error);
    return null;
  }
}