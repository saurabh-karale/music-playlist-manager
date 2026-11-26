import { useEffect, useRef } from 'react';
import Button from './Button.jsx';
export default function Modal({ title, description, onClose, children }) {
  const dialog = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const node = dialog.current;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    node.showModal();
    node.querySelector('[data-autofocus]')?.focus();
    return () => {node.close(); document.body.style.overflow = oldOverflow; if (previous?.isConnected) previous.focus();};
  }, []);
  return <dialog ref={dialog} className="modal" aria-labelledby="modal-title" aria-describedby="modal-description" onCancel={e => {e.preventDefault(); onClose();}} onClick={e => {if (e.target === dialog.current) onClose();}}>
    <div className="modal-body"><div className="flex items-start justify-between gap-3"><div><h2 id="modal-title">{title}</h2><p id="modal-description" className="muted text-sm mt-2">{description}</p></div><Button variant="icon" icon="close" aria-label="Close dialog" onClick={onClose}/></div>{children}</div>
  </dialog>;
}
