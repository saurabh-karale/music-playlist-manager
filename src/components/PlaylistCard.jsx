import Icon from './Icon.jsx';
export default function PlaylistCard({ playlist, selected, onSelect }) {
  return <button className={`playlist-card ${selected ? 'selected' : ''}`} onClick={onSelect} aria-pressed={selected}>
    <span className="playlist-icon"><Icon name="list" size={20}/></span><span className="min-w-0 flex-1 text-left"><span className="playlist-name" title={playlist.name}>{playlist.name}</span><span className="muted text-xs">{playlist.songIds.length} {playlist.songIds.length === 1 ? 'song' : 'songs'}</span></span>{selected && <Icon name="chevron" size={16}/>}
  </button>;
}
