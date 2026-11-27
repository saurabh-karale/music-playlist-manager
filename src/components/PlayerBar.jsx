import Artwork from './Artwork.jsx';
import Button from './Button.jsx';
import Icon from './Icon.jsx';
import { formatDuration } from '../lib/songs.js';
export default function PlayerBar({ song, elapsed, onSeek, playing, queueName, canPlay, onToggle, onNext, onPrevious }) {
  const duration = song?.duration ?? 0;
  const position = Math.min(elapsed, duration);
  const progress = duration ? position / duration * 100 : 0;
  return <footer className="player-bar" aria-label="Now playing (simulated playback)">
    <div className="player-track"><Artwork song={song}/><div className="min-w-0"><div className="player-label"><span className={playing ? 'status-dot pulse' : 'status-dot'}/>NOW PLAYING</div><div className="player-title" title={song?.title}>{song?.title || 'Nothing playing'}</div><div className="player-artist" title={song?.artist}>{song?.artist || 'Choose a song to begin'}</div></div></div>
    <div className="player-center"><div className="player-controls"><Button variant="icon" icon="prev" aria-label="Previous song" title="Previous song" disabled={!canPlay} onClick={onPrevious}/><Button variant="primary" className="player-toggle" icon={playing ? 'pause' : 'play'} aria-label={playing ? 'Pause' : 'Play'} title={playing ? 'Pause' : 'Play'} disabled={!canPlay} onClick={onToggle}/><Button variant="icon" icon="next" aria-label="Next song" title="Next song" disabled={!canPlay} onClick={onNext}/></div>
      <div className="player-progress">
        <span className="player-time">{formatDuration(position)}</span>
        <input type="range" className="player-seek" aria-label="Song progress" aria-valuetext={`${formatDuration(position)} of ${formatDuration(duration)}`} min={0} max={duration || 1} step={1} value={position} disabled={!song} onChange={event => onSeek(Number(event.target.value))} style={{ '--progress': `${progress}%` }}/>
        <span className="player-time">{formatDuration(duration)}</span>
      </div>
    </div>
    <div className="player-meta"><span className="flex gap-2 items-center"><Icon name="list" size={17}/><span className="player-queue" title={queueName}>{queueName}</span></span><span className="muted text-xs">Simulated playback</span></div>
  </footer>;
}
