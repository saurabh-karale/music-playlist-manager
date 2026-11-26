import Icon from './Icon.jsx';
import Button from './Button.jsx';
import PlaylistCard from './PlaylistCard.jsx';
export default function Sidebar({ playlists, selectedId, onSelect, onCreate }) {
  return <aside className="sidebar" aria-label="Your playlists">
    <div className="brand"><span className="brand-mark"><Icon name="wave" size={25}/></span><div><span className="brand-name">mixtape<span>.</span></span><span className="brand-sub">YOUR MUSIC SPACE</span></div></div>
    <div className="sidebar-nav"><Icon name="library" size={20}/><span>Music workspace</span></div>
    <div className="sidebar-heading"><span>YOUR PLAYLISTS</span><Button variant="icon" icon="plus" onClick={onCreate} title="Create playlist" aria-label="Create playlist"/></div>
    <div className="playlist-nav">{playlists.length ? playlists.map(playlist => <PlaylistCard key={playlist.id} playlist={playlist} selected={playlist.id === selectedId} onSelect={() => onSelect(playlist.id)}/>) : <p className="muted text-sm px-2 py-3">No playlists yet. Create your first mix.</p>}</div>
    <Button icon="plus" className="sidebar-create w-full" onClick={onCreate}>New playlist</Button>
    <div className="sidebar-note"><Icon name="info" size={18}/><div><strong>Make it yours.</strong><p>All playlists are saved on this device automatically.</p></div></div>
    <div className="sidebar-bottom"><span className="status-dot"/> Local workspace</div>
  </aside>;
}
