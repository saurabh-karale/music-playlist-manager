import Icon from './Icon.jsx';
export default function Input({ icon, className = '', ...props }) {
  return <div className={`input-wrap flex items-center gap-2 ${className}`}>
    {icon && <Icon name={icon} />}<input className="min-w-0 w-full bg-transparent outline-none" {...props} />
  </div>;
}
