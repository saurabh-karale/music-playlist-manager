import { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import SongLibrary from './components/SongLibrary.jsx';
import PlaylistDetails from './components/PlaylistDetails.jsx';
import PlaylistModal from './components/PlaylistModal.jsx';
import PlayerBar from './components/PlayerBar.jsx';
import Button from './components/Button.jsx';
import Icon from './components/Icon.jsx';
import { fetchSongs } from './lib/api.js';
import { loadPlaylists, savePlaylists, addSong, removeSong, moveSong } from './lib/playlists.js';
import { initialPlayer, selectTrack, navigateTrack, seekTrack, tickPlayer } from './lib/player.js';

export default function App() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [request, setRequest] = useState(0);
  const [playlists, setPlaylists] = useState(loadPlaylists);
  const [selectedId, setSelectedId] = useState(() => playlists[0]?.id ?? null);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All genres');
  const [modal, setModal] = useState(null);
  const [player, setPlayer] = useState(initialPlayer);
  const [saved, setSaved] = useState(true);
  const [notice, setNotice] = useState('');

  // Abort the request if the component unmounts or the user retries.
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError('');
    fetchSongs(controller.signal).then(data => { if (!controller.signal.aborted) setSongs(data); })
      .catch(() => { if (!controller.signal.aborted) setError('Check your connection and try again.'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [request]);
  useEffect(() => { setSaved(savePlaylists(playlists)); }, [playlists]);
  useEffect(() => { if (!notice) return; const timeout = setTimeout(() => setNotice(''), 2800); return () => clearTimeout(timeout); }, [notice]);

  const songById = useMemo(() => new Map(songs.map(song => [song.id, song])), [songs]);
  const selected = playlists.find(item => item.id === selectedId);
  const selectedSongs = (selected?.songIds ?? []).map(id => songById.get(id)).filter(Boolean);
  const sourcePlaylist = playlists.find(item => item.id === player.playlistId);
  const libraryQueue = useMemo(() => songs.map(song => song.id), [songs]);
  const queue = useMemo(() => player.source === 'playlist' && sourcePlaylist
    ? sourcePlaylist.songIds.filter(id => songById.has(id)) : libraryQueue,
    [player.source, sourcePlaylist, songById, libraryQueue]);
  const currentSong = songById.get(player.songId);
  const queueName = player.source === 'playlist' && sourcePlaylist ? sourcePlaylist.name : 'Song library';

  // Start one timer while playing; clean it up on pause, track change or unmount.
  useEffect(() => {
    if (!player.playing || !currentSong) return;
    const timer = setInterval(() => setPlayer(previous =>
      previous.songId === currentSong.id ? tickPlayer(previous, queue, currentSong.duration) : previous
    ), 1000);
    return () => clearInterval(timer);
  }, [player.playing, currentSong, queue]);

  function updateSelected(update) {
    setPlaylists(previous => previous.map(item => item.id === selectedId ? { ...item, songIds: update(item.songIds) } : item));
  }
  function createOrRename(name) {
    if (modal.mode === 'rename') {
      setPlaylists(previous => previous.map(item => item.id === modal.id ? { ...item, name } : item));
      setNotice('Playlist renamed.');
    } else {
      const id = globalThis.crypto?.randomUUID?.() ?? `playlist-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setPlaylists(previous => [...previous, { id, name, songIds: [] }]); setSelectedId(id); setNotice('Playlist created.');
    }
    setModal(null);
  }
  function deletePlaylist(id) {
    const remaining = playlists.filter(item => item.id !== id);
    setPlaylists(remaining);
    if (selectedId === id) setSelectedId(remaining[0]?.id ?? null);
    if (player.playlistId === id) setPlayer(initialPlayer);
    setModal(null); setNotice('Playlist deleted.');
  }
  function addToPlaylist(id) {
    if (!selected || selected.songIds.includes(id)) return;
    updateSelected(ids => addSong(ids, id)); setNotice(`Added to ${selected.name}.`);
  }
  function removeFromPlaylist(id) {
    if (!selected) return;
    updateSelected(ids => removeSong(ids, id));
    if (player.playlistId === selectedId && player.songId === id) {
      const remaining = selected.songIds.filter(item => item !== id && songById.has(item));
      const next = remaining[selected.songIds.indexOf(id)] ?? remaining[0];
      setPlayer(next ? { ...player, songId: next, elapsed: 0 } : initialPlayer);
    }
    setNotice('Song removed from playlist.');
  }
  function playSong(id, source, force = false) {
    const playlistId = source === 'playlist' ? selectedId : null;
    setPlayer(previous => selectTrack(previous, id, source, playlistId, force));
  }
  function togglePlayer() {
    if (currentSong) setPlayer(previous => ({ ...previous, playing: !previous.playing }));
    else if (queue.length) setPlayer(previous => ({ ...previous, songId: queue[0], playing: true, elapsed: 0 }));
  }
  function navigate(direction) {
    setPlayer(previous => navigateTrack(previous, queue, direction));
  }
  const openCreate = () => setModal({ mode: 'create' });
  const modalPlaylist = playlists.find(item => item.id === modal?.id);

  return <div className="app-shell">
    <Sidebar playlists={playlists} selectedId={selectedId} onSelect={setSelectedId} onCreate={openCreate}/>
    <main className="workspace min-w-0">
      <header className="workspace-header"><div className="header-copy"><div className="eyebrow header-kicker"><span className="status-dot"/> MUSIC / COLLECTION</div><h1>Find your rhythm<span>.</span></h1><p>Discover tracks. Curate playlists. Keep your favorites close.</p></div><Button variant="primary" icon="plus" onClick={openCreate}>New playlist</Button></header>
      <div className="workspace-stats"><div><Icon name="library"/><span><strong>{songs.length}</strong> library tracks</span></div><div><Icon name="list"/><span><strong>{playlists.length}</strong> {playlists.length === 1 ? 'playlist' : 'playlists'}</span></div><div><Icon name={saved ? 'check' : 'info'}/><span>{saved ? 'Saved locally' : 'Storage unavailable'}</span></div></div>
      {!saved && <p className="storage-warning" role="alert">Local storage is unavailable. Changes may be lost after a refresh.</p>}
      <div className="workspace-grid">
        <SongLibrary songs={songs} loading={loading} error={error} retry={() => setRequest(value => value + 1)} search={search} setSearch={setSearch} genre={genre} setGenre={setGenre} playlist={selected} onAdd={addToPlaylist} player={player} onPlay={playSong}/>
        <PlaylistDetails playlist={selected} songs={selectedSongs} loading={loading} error={error} onCreate={openCreate} onRename={() => setModal({ mode: 'rename', id: selectedId })} onDelete={() => setModal({ mode: 'delete', id: selectedId })} onRemove={removeFromPlaylist} onMove={(id,direction) => updateSelected(ids => moveSong(ids,id,direction))} player={player} onPlay={playSong} onPlayAll={() => selectedSongs.length && playSong(selectedSongs[0].id,'playlist',true)}/>
      </div>
      <div className="workspace-footer">MIXTAPE <span> / </span> A little space for the music you love.</div>
    </main>
    <PlayerBar song={currentSong} elapsed={player.elapsed} onSeek={seconds => currentSong && setPlayer(previous => seekTrack(previous, seconds, currentSong.duration))} playing={player.playing} queueName={queueName} canPlay={queue.length > 0} onToggle={togglePlayer} onNext={() => navigate(1)} onPrevious={() => navigate(-1)}/>
    <div role="status" aria-live="polite" className={`toast ${notice ? 'visible' : ''}`}>{notice && <><Icon name="check"/><span>{notice}</span></>}</div>
    {modal && <PlaylistModal key={`${modal.mode}-${modal.id ?? ''}`} mode={modal.mode} playlist={modalPlaylist} playlists={playlists} onClose={() => setModal(null)} onSave={createOrRename} onDelete={deletePlaylist}/>}
  </div>;
}
