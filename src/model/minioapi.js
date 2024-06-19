import axios from 'axios';
import { parseBlob } from 'music-metadata-browser';


const minioClient = axios.create({
  baseURL: 'https://tiktalkapp.ru',
});

export const getFileByPodcastId = (url) => {
  return minioClient.get(url, { responseType: 'blob' });
};

export async function getAudioDuration(audioUrl) {
  try {
    const response = await axios.get(audioUrl, { responseType: 'blob' });
    const metadata = await parseBlob(response.data);

    return metadata.format.duration; 
  } catch (error) {
    console.log(error);
    return null;
  }
}