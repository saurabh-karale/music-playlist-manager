export const STORAGE_KEY = 'mixtape.playlists.v1';
const initial = () => [{ id: 'first-mix', name: 'My first mix', songIds: [1, 3, 6] }];

export function loadPlaylists(storage) {
  try {
    const raw = (storage ?? window.localStorage).getItem(STORAGE_KEY);
    if (raw === null) return initial();
    const data = JSON.parse(raw);
    if (!Array.isArray(data) || !data.every(p => typeof p.id === 'string' &&
      typeof p.name === 'string' && Array.isArray(p.songIds))) return initial();
    return data.map(p => ({ ...p, songIds: [...new Set(p.songIds)] }));
  } catch { return initial(); }
}
export function savePlaylists(playlists, storage) {
  try { (storage ?? window.localStorage).setItem(STORAGE_KEY, JSON.stringify(playlists)); return true; }
  catch { return false; }
}
export function validateName(name, playlists, ignoreId) {
  const trimmed = name.trim();
  if (!trimmed) return 'Playlist name is required.';
  if (trimmed.length > 60) return 'Use 60 characters or fewer.';
  if (playlists.some(p => p.id !== ignoreId && p.name.trim().toLowerCase() === trimmed.toLowerCase()))
    return 'A playlist with this name already exists.';
  return '';
}
export function addSong(ids, id) { return ids.includes(id) ? ids : [...ids, id]; }
export function removeSong(ids, id) { return ids.filter(item => item !== id); }
export function moveSong(ids, id, direction) {
  const from = ids.indexOf(id), to = from + direction;
  if (from < 0 || to < 0 || to >= ids.length) return ids;
  const next = [...ids];
  [next[from], next[to]] = [next[to], next[from]];
  return next;
}
