import Artwork from './Artwork.jsx';
import Icon from './Icon.jsx';
import { formatDuration } from '../lib/songs.js';

export default function SongRow({ song, active, playing, onPlay, children, compact = false }) {
  return <div className={`song-row ${compact ? 'compact-row' : 'library-row'} ${active ? 'active-song' : ''}`}>
    <button className="song-art-button" onClick={onPlay} aria-label={`${active && playing ? 'Pause' : 'Play'} ${song.title}`} title={`${active && playing ? 'Pause' : 'Play'} ${song.title}`}>
      <Artwork song={song}/><span className="art-play"><Icon name={active && playing ? 'pause' : 'play'} size={19}/></span>
    </button>
    <div className="song-text min-w-0"><span className="song-title" title={song.title}>{song.title}</span><span className="song-artist" title={song.artist}>{song.artist}</span>{!compact && <span className="mobile-genre">{song.genre}</span>}</div>
    {!compact && <span className="genre-tag">{song.genre}</span>}
    <span className="duration tabular-nums">{formatDuration(song.duration)}</span>
    <div className="song-actions">{children}</div>
  </div>;
}
