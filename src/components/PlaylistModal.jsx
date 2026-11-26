import { useState } from 'react';
import Modal from './Modal.jsx';
import Button from './Button.jsx';
import Input from './Input.jsx';
import { validateName } from '../lib/playlists.js';
export default function PlaylistModal({ mode, playlist, playlists, onClose, onSave, onDelete }) {
  const [name, setName] = useState(mode === 'rename' ? playlist.name : '');
  const [error, setError] = useState('');
  if (mode === 'delete') return <Modal title="Delete playlist?" description={`“${playlist.name}” will be removed from this device. The songs will remain in your library.`} onClose={onClose}>
    <div className="modal-actions"><Button onClick={onClose} data-autofocus>Cancel</Button><Button variant="danger" onClick={() => onDelete(playlist.id)}>Delete playlist</Button></div>
  </Modal>;
  function submit(e) {e.preventDefault(); const message = validateName(name, playlists, mode === 'rename' ? playlist.id : undefined); setError(message); if (!message) onSave(name.trim());}
  return <Modal title={mode === 'rename' ? 'Rename playlist' : 'Create a playlist'} description="Give your mix a name that makes it easy to find." onClose={onClose}>
    <form onSubmit={submit} className="mt-6" noValidate><label className="field-label" htmlFor="playlist-name">Playlist name</label><Input id="playlist-name" value={name} onChange={e => {setName(e.target.value); setError('');}} placeholder="e.g. Late night drive" aria-invalid={Boolean(error)} aria-describedby={error ? 'name-error' : undefined} data-autofocus maxLength={60}/>{error && <p id="name-error" className="form-error" role="alert">{error}</p>}<div className="modal-actions"><Button onClick={onClose}>Cancel</Button><Button type="submit" variant="primary">{mode === 'rename' ? 'Save changes' : 'Create playlist'}</Button></div></form>
  </Modal>;
}
