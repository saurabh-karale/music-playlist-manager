import Icon from './Icon.jsx';
export default function Artwork({ song, className = '' }) {
  return <div className={`artwork art-${song ? (song.id - 1) % 6 : 0} ${className}`} aria-hidden="true"><span/><Icon name="disc" size={24}/></div>;
}
