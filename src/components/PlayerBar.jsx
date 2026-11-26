import Artwork from './Artwork.jsx';
import Button from './Button.jsx';
import Icon from './Icon.jsx';
import { formatDuration } from '../lib/songs.js';
export default function PlayerBar({ song, playing, queueName, canPlay, onToggle, onNext, onPrevious }) {
  return <footer className="player-bar" aria-label="Now playing">
    <div className="player-track"><Artwork song={song}/><div className="min-w-0"><div className="player-label"><span className={playing ? 'status-dot pulse' : 'status-dot'}/>NOW PLAYING</div><div className="player-title" title={song?.title}>{song?.title || 'Nothing playing'}</div><div className="player-artist" title={song?.artist}>{song?.artist || 'Choose a song to begin'}</div></div></div>
    <div className="player-controls"><Button variant="icon" icon="prev" aria-label="Previous song" title="Previous song" disabled={!canPlay} onClick={onPrevious}/><Button variant="primary" className="player-toggle" icon={playing ? 'pause' : 'play'} aria-label={playing ? 'Pause' : 'Play'} title={playing ? 'Pause' : 'Play'} disabled={!canPlay} onClick={onToggle}/><Button variant="icon" icon="next" aria-label="Next song" title="Next song" disabled={!canPlay} onClick={onNext}/></div>
    <div className="player-meta"><span className="flex gap-2 items-center"><Icon name="list" size={17}/><span className="player-queue" title={queueName}>{queueName}</span></span><span className="muted text-xs">{song ? `${formatDuration(song.duration)} · ` : ''}Simulated playback</span></div>
  </footer>;
}
