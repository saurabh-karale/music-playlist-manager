import Artwork from './Artwork.jsx';
import Button from './Button.jsx';
import Icon from './Icon.jsx';
import SongRow from './SongRow.jsx';
import EmptyState from './EmptyState.jsx';
import { playlistSummary } from '../lib/songs.js';
export default function PlaylistDetails({ playlist, songs, loading, error, onCreate, onRename, onDelete, onRemove, onMove, player, onPlay, onPlayAll }) {
  return <section className="panel details-panel" aria-labelledby="playlist-title">
    <div className="panel-heading"><div><div className="eyebrow">02 / CURATE</div><h2 id="playlist-title">Your mix</h2><p className="muted text-sm mt-1">Make the order your own.</p></div></div>
    {!playlist ? <EmptyState icon="list" title="No playlist selected" description="Create a playlist to start collecting songs."><Button variant="primary" icon="plus" onClick={onCreate}>Create playlist</Button></EmptyState> : <>
      <div className="playlist-hero"><Artwork song={songs[0]} className="hero-art"/><div className="min-w-0 flex-1"><span className="hero-label">PLAYLIST</span><h3 title={playlist.name}>{playlist.name}</h3><p>{loading || error ? `${playlist.songIds.length} saved tracks` : playlistSummary(songs)}</p></div></div>
      <div className="playlist-tools"><Button variant="primary" icon="play" onClick={onPlayAll} disabled={!songs.length}>Play mix</Button><div className="flex gap-2"><Button variant="icon" icon="edit" aria-label="Rename playlist" title="Rename playlist" onClick={onRename}/><Button variant="icon" icon="trash" className="delete-button" aria-label="Delete playlist" title="Delete playlist" onClick={onDelete}/></div></div>
      <div className="details-divider"/>
      {loading ? <div className="loading-state" role="status"><span className="spinner"/>Loading playlist…</div> : error ? <EmptyState icon="info" title="Songs unavailable" description="Reload the song library to view your tracks."/> : !songs.length ? <EmptyState title="Your playlist is empty" description="Add songs from the library using the + buttons."/> : <><div className="queue-heading"><span>TRACK ORDER</span><span>REORDER / REMOVE</span></div><div className="queue-list">{songs.map((song,index) => <SongRow compact key={song.id} song={song} active={player.source === 'playlist' && player.playlistId === playlist.id && player.songId === song.id} playing={player.playing} onPlay={() => onPlay(song.id, 'playlist')}>
        <Button variant="icon" icon="up" aria-label={`Move ${song.title} up`} title="Move up" disabled={index === 0} onClick={() => onMove(song.id,-1)}/><Button variant="icon" icon="down" aria-label={`Move ${song.title} down`} title="Move down" disabled={index === songs.length - 1} onClick={() => onMove(song.id,1)}/><Button variant="icon" icon="close" aria-label={`Remove ${song.title}`} title="Remove from playlist" onClick={() => onRemove(song.id)}/>
      </SongRow>)}</div><div className="panel-footer">Use the arrows to arrange your tracks.</div></>}
    </>}
  </section>;
}
