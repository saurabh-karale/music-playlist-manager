export function formatDuration(seconds = 0) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}
export function playlistSummary(songs) {
  const seconds = songs.reduce((sum, song) => sum + song.duration, 0);
  const minutes = Math.floor(seconds / 60);
  const time = seconds > 0 && minutes === 0 ? '<1 min' : `${minutes} min`;
  return `${songs.length} ${songs.length === 1 ? 'song' : 'songs'} · ${time}`;
}
export function filterSongs(songs, search, genre) {
  const term = search.trim().toLowerCase();
  return songs.filter(song => (genre === 'All genres' || song.genre === genre) &&
    `${song.title} ${song.artist} ${song.genre}`.toLowerCase().includes(term));
}
