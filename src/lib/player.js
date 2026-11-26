export const initialPlayer = { songId: null, playing: false, source: 'library', playlistId: null };
export function stepTrack(queue, songId, direction) {
  if (!queue.length) return null;
  const index = queue.indexOf(songId);
  return index < 0 ? queue[direction > 0 ? 0 : queue.length - 1] : queue[(index + direction + queue.length) % queue.length];
}
