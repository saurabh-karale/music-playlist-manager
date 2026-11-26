import axios from 'axios';

export async function fetchSongs(signal) {
  const { data } = await axios.get(`${import.meta.env.BASE_URL}songs.json`, { signal });
  if (!Array.isArray(data)) throw new Error('Invalid song library');
  return data;
}
