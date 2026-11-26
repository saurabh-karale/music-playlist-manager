import { useMemo } from 'react';
import Button from './Button.jsx';
import Input from './Input.jsx';
import Icon from './Icon.jsx';
import SongRow from './SongRow.jsx';
import EmptyState from './EmptyState.jsx';
import { filterSongs } from '../lib/songs.js';

export default function SongLibrary({ songs, loading, error, retry, search, setSearch, genre, setGenre, playlist, onAdd, player, onPlay }) {
  const genres = useMemo(() => ['All genres', ...new Set(songs.map(song => song.genre))].sort((a,b) => a === 'All genres' ? -1 : b === 'All genres' ? 1 : a.localeCompare(b)), [songs]);
  const filtered = filterSongs(songs, search, genre);
  return <section className="panel library-panel" aria-labelledby="library-title">
    <div className="panel-heading"><div><div className="eyebrow">01 / DISCOVER</div><h2 id="library-title">Song library</h2><p className="muted text-sm mt-1">Find a track and add it to your mix.</p></div><span className="count-pill">{songs.length} tracks</span></div>
    <div className="library-filters"><Input icon="search" aria-label="Search songs" placeholder="Search songs or artists..." value={search} onChange={e => setSearch(e.target.value)}/><label className="select-wrap"><Icon name="filter"/><select aria-label="Filter by genre" value={genre} onChange={e => setGenre(e.target.value)}>{genres.map(item => <option key={item}>{item}</option>)}</select></label></div>
    <div className="library-target"><Icon name="list" size={15}/><span>Adding to <strong>{playlist ? playlist.name : 'no playlist selected'}</strong></span><a className="jump-link" href="#playlist-title">View mix <Icon name="chevron" size={13}/></a></div>
    {loading ? <div className="loading-state" role="status"><span className="spinner"/>Loading songs…</div> : error ? <EmptyState icon="info" title="Could not load songs" description={error}><Button onClick={retry}>Try again</Button></EmptyState> : filtered.length === 0 ? <EmptyState icon="search" title="No results" description="Try another search or genre."><Button onClick={() => {setSearch(''); setGenre('All genres');}}>Clear filters</Button></EmptyState> : <>
      <div className="library-table-head"><span>TRACK</span><span>GENRE</span><span><Icon name="clock" size={15}/></span><span>ADD</span></div>
      <div className="song-list">{filtered.map(song => {const added = playlist?.songIds.includes(song.id); return <SongRow key={song.id} song={song} active={player.source === 'library' && player.songId === song.id} playing={player.playing} onPlay={() => onPlay(song.id, 'library')}><Button variant="icon" icon={added ? 'check' : 'plus'} className={added ? 'added-button' : ''} disabled={!playlist || added} onClick={() => onAdd(song.id)} aria-label={added ? `${song.title} already added` : `Add ${song.title} to playlist`} title={added ? 'Already in playlist' : playlist ? 'Add to playlist' : 'Create a playlist first'}/></SongRow>;})}</div>
      <div className="panel-footer">Showing {filtered.length} of {songs.length} songs</div>
    </>}
  </section>;
}
