export const initialPlayer = { songId: null, playing: false, source: 'library', playlistId: null, elapsed: 0 };
export function stepTrack(queue, songId, direction) {
  if (!queue.length) return null;
  const index = queue.indexOf(songId);
  return index < 0 ? queue[direction > 0 ? 0 : queue.length - 1] : queue[(index + direction + queue.length) % queue.length];
}

// A simulated player advances in whole seconds, without loading any audio.
export function selectTrack(player, songId, source, playlistId, force = false) {
  const sameTrack = player.songId === songId && player.source === source && player.playlistId === playlistId;
  return { songId, source, playlistId, playing: force || !(sameTrack && player.playing),
    elapsed: sameTrack && !force ? player.elapsed : 0 };
}
export function navigateTrack(player, queue, direction) {
  const songId = stepTrack(queue, player.songId, direction);
  return songId === null ? player : { ...player, songId, elapsed: 0, playing: player.songId === null || player.playing };
}
export function seekTrack(player, seconds, duration) {
  if (player.songId === null || !Number.isFinite(seconds)) return player;
  return { ...player, elapsed: Math.max(0, Math.min(duration, Math.floor(seconds))) };
}
export function tickPlayer(player, queue, duration) {
  if (!player.playing || player.songId === null || duration <= 0) return player;
  if (player.elapsed + 1 >= duration) {
    const next = stepTrack(queue, player.songId, 1);
    return next === null ? { ...player, playing: false, elapsed: duration } : { ...player, songId: next, elapsed: 0 };
  }
  return { ...player, elapsed: player.elapsed + 1 };
}
