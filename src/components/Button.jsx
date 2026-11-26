import Icon from './Icon.jsx';
export default function Button({ children, icon, variant = 'secondary', className = '', type = 'button', ...props }) {
  return <button type={type} className={`btn btn-${variant} inline-flex items-center justify-center gap-2 font-semibold ${className}`} {...props}>
    {icon && <Icon name={icon} />}{children}
  </button>;
}
