import Icon from './Icon.jsx';
export default function EmptyState({ icon = 'music', title, description, children }) {
  return <div className="empty-state flex flex-col items-center text-center gap-3"><div className="empty-icon"><Icon name={icon} size={25}/></div><div><h3 className="font-semibold">{title}</h3><p className="muted mt-1 text-sm">{description}</p></div>{children}</div>;
}
