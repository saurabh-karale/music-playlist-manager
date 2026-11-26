const paths = {
  wave: <path d="M2 12h4l3-8 5 16 3-11 2 3h3"/>, music: <><path d="M9 18V5l12-2v13"/><ellipse cx="6" cy="18" rx="3" ry="2"/><ellipse cx="18" cy="16" rx="3" ry="2"/></>,
  library: <><path d="M4 4v16M9 4v16M14 5l5-1 4 15-5 1z"/></>, plus: <path d="M12 5v14M5 12h14"/>, search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></>,
  check: <path d="m5 12 4 4L19 6"/>, close: <path d="m6 6 12 12M18 6 6 18"/>, edit: <><path d="m15 5 4 4M4 20l4-1L20 7l-4-4L4 15z"/></>, trash: <><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/></>,
  up: <path d="m6 14 6-6 6 6"/>, down: <path d="m6 10 6 6 6-6"/>, play: <path d="m8 5 12 7-12 7z" fill="currentColor" stroke="none"/>, pause: <><path d="M8 5v14M16 5v14" strokeWidth="3.5"/></>, next: <><path d="m5 5 11 7-11 7z" fill="currentColor" stroke="none"/><path d="M19 5v14"/></>, prev: <><path d="m19 5-11 7 11 7z" fill="currentColor" stroke="none"/><path d="M5 5v14"/></>, clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>, list: <><path d="M3 6h13M3 12h13M3 18h8M19 11v9"/><ellipse cx="16.5" cy="20" rx="2.5" ry="1.5"/></>, chevron: <path d="m9 18 6-6-6-6"/>, info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/></>, disc: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M5 12a7 7 0 0 1 7-7m7 7a7 7 0 0 1-7 7"/></>, filter: <><path d="M4 7h16M7 12h10m-7 5h4"/></>
};
export default function Icon({ name, size = 18, className = '' }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
