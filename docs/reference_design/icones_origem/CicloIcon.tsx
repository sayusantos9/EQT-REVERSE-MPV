import React from "react";

export type CicloIconName =
  | "home" | "learn" | "scanner" | "missions" | "profile"
  | "search" | "settings" | "notifications" | "back" | "next" | "download" | "camera" | "menu"
  | "xp" | "level" | "trophy" | "medal" | "crown" | "progress" | "energy" | "heart" | "gift" | "ranking"
  | "recycle" | "hazard" | "trash" | "organic" | "special-disposal" | "reuse" | "electronics" | "battery" | "plastic" | "paper" | "metal" | "glass"
  | "flashcards" | "quiz" | "game" | "pdf" | "content" | "identification" | "separation" | "destination" | "safety"
  | "available" | "in-progress" | "locked" | "warning" | "unavailable"
  | "admin-dashboard" | "categories" | "qr-generator" | "educational-content"
  | "success" | "error" | "info" | "loading" | "location" | "link" | "calendar" | "report" | "share"
  | "leaf" | "planet" | "water" | "tree" | "lamp" | "cable" | "cellphone" | "computer" | "avatar" | "mascot" | "team";

type Props = {
  name: CicloIconName;
  size?: number;
  color?: string;
  className?: string;
  title?: string;
  strokeWidth?: number;
};

const paths: Record<CicloIconName, React.ReactNode> = {
  home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/></>,
  learn: <><path d="M3 5.5A3.5 3.5 0 0 1 6.5 2H12v19H6.5A3.5 3.5 0 0 0 3 24z" transform="translate(0 -1)"/><path d="M21 5.5A3.5 3.5 0 0 0 17.5 2H12v19h5.5A3.5 3.5 0 0 1 21 24z" transform="translate(0 -1)"/></>,
  scanner: <><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3M21 16v3a2 2 0 0 1-2 2h-3"/><path d="M7 7h3v3H7zM14 7h3v3h-3zM7 14h3v3H7zM14 14h3v3h-3z"/></>,
  missions: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/><path d="m15 9 6-6"/></>,
  profile: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7-1.4-2.4L7.3 15a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7 1.4 2.4-1.4 1.1a8 8 0 0 1-.1 2Z" transform="translate(-1 -1) scale(1.08)"/></>,
  notifications: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 22h4"/></>,
  back: <><path d="m15 18-6-6 6-6"/><path d="M9 12h12"/></>,
  next: <><path d="m9 18 6-6-6-6"/><path d="M3 12h12"/></>,
  download: <><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 19v2h16v-2"/></>,
  camera: <><path d="M4 7h3l2-3h6l2 3h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"/><circle cx="12" cy="13" r="4"/></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
  xp: <><path d="m12 2 3 6 7 .9-5 4.8 1.2 7L12 17.4 5.8 20.7 7 13.7 2 8.9 9 8z"/></>,
  level: <><path d="M12 2 21 6v6c0 5-4 8-9 10-5-2-9-5-9-10V6z"/><path d="m9 12 2 2 4-5"/></>,
  trophy: <><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H3v2a5 5 0 0 0 5 5M17 6h4v2a5 5 0 0 1-5 5"/></>,
  medal: <><circle cx="12" cy="9" r="6"/><path d="m8 14-2 8 6-3 6 3-2-8"/><path d="m10 9 1.5 1.5L14 8"/></>,
  crown: <><path d="m3 8 5 4 4-7 4 7 5-4-2 11H5z"/><path d="M5 22h14"/></>,
  progress: <><rect x="3" y="7" width="18" height="10" rx="5"/><path d="M8 7v10" opacity=".5"/></>,
  energy: <><path d="m13 2-9 12h7l-1 8 10-13h-7z"/></>,
  heart: <><path d="M20.8 8.6c0 5.2-8.8 11-8.8 11s-8.8-5.8-8.8-11A4.6 4.6 0 0 1 12 6a4.6 4.6 0 0 1 8.8 2.6Z"/></>,
  gift: <><rect x="3" y="10" width="18" height="11" rx="2"/><path d="M2 7h20v4H2zM12 7v14"/><path d="M12 7H7a2.5 2.5 0 1 1 2.5-2.5C9.5 6 12 7 12 7ZM12 7h5a2.5 2.5 0 1 0-2.5-2.5C14.5 6 12 7 12 7Z"/></>,
  ranking: <><path d="M3 21V12h5v9M10 21V4h5v17M17 21v-9h5v9"/><path d="M3 4h3M4.5 2.5v3"/></>,
  recycle: <><path d="m7 7 3-4 3 4M10 3l3 7"/><path d="m17 10 5 1-2 5M22 11l-7 4"/><path d="m8 17-3 4-3-5M5 21l3-7"/><path d="M6 10 4 7M18 17h4"/></>,
  hazard: <><path d="M10 3h4l8 18H2z"/><path d="M12 9v5M12 17h.01"/></>,
  trash: <><path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15M10 10v7M14 10v7"/></>,
  organic: <><path d="M20 4C11 4 5 7 5 14a6 6 0 0 0 6 6c7 0 9-7 9-16Z"/><path d="M4 22c2-6 6-9 12-13"/></>,
  "special-disposal": <><path d="M12 3v18M3 12h18"/><path d="m7 7 10 10M17 7 7 17"/><circle cx="12" cy="12" r="9"/></>,
  reuse: <><path d="m7 7 3-3 3 3M10 4v6a4 4 0 0 0 4 4h3"/><path d="m17 17-3 3-3-3M14 20v-6a4 4 0 0 0-4-4H7"/></>,
  electronics: <><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></>,
  battery: <><rect x="4" y="6" width="16" height="15" rx="2"/><path d="M9 3h6v3M12 10v7M9 13.5h6"/></>,
  plastic: <><path d="M9 3h6M10 3v5l-4 5v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-7l-4-5V3"/><path d="M7 15h10"/></>,
  paper: <><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v5h4M9 12h7M9 16h7"/></>,
  metal: <><path d="M5 4h14l3 5-3 12H5L2 9z"/><path d="M2 9h20M8 4l-2 5 2 12M16 4l2 5-2 12"/></>,
  glass: <><path d="M8 3h8l-1 5 3 12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L9 8z"/><path d="M8 14h8"/></>,
  flashcards: <><rect x="7" y="4" width="13" height="16" rx="2"/><path d="M4 7v14a2 2 0 0 0 2 2h11M10 9h7M10 13h7"/></>,
  quiz: <><rect x="3" y="4" width="18" height="17" rx="3"/><path d="M9 9a3 3 0 1 1 5 2c-1.3.8-2 1.4-2 3M12 17h.01"/></>,
  game: <><path d="M6 9h12a4 4 0 0 1 3.8 5l-1 3a2 2 0 0 1-3.2 1l-3-2H9l-3 2a2 2 0 0 1-3.2-1l-1-3A4 4 0 0 1 6 9Z"/><path d="M7 12v4M5 14h4M16 13h.01M18 15h.01"/></>,
  pdf: <><path d="M6 2h9l5 5v15H6z"/><path d="M15 2v5h5M8 16h2a1.5 1.5 0 0 0 0-3H8v6M14 19v-6h1a3 3 0 0 1 0 6z"/></>,
  content: <><path d="M5 3h14v18H5z"/><path d="M8 7h8M8 11h8M8 15h6"/></>,
  identification: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0M12 12v4"/></>,
  separation: <><path d="M4 4h6v6H4zM14 4h6v6h-6zM9 14h6v6H9z"/><path d="m10 7 4 0M12 10v4"/></>,
  destination: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  safety: <><path d="M12 2 21 6v6c0 5-4 8-9 10-5-2-9-5-9-10V6z"/><path d="m8 12 3 3 5-6"/></>,
  available: <><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></>,
  "in-progress": <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  locked: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/></>,
  warning: <><path d="M12 3 22 21H2z"/><path d="M12 9v5M12 17h.01"/></>,
  unavailable: <><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/></>,
  "admin-dashboard": <><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="5" rx="1"/><rect x="13" y="10" width="8" height="11" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/></>,
  categories: <><path d="M3 6h18l-2 15H5z"/><path d="M2 3h20v3H2zM9 10h6"/></>,
  "qr-generator": <><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3z"/><path d="M14 14h3v3h-3zM19 14h2v2h-2zM19 19h2v2h-2zM14 19h2v2h-2z"/></>,
  "educational-content": <><path d="M5 3h14v18H5z"/><path d="M8 7h8M8 11h8M8 15h5"/></>,
  success: <><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></>,
  error: <><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/></>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7h.01"/></>,
  loading: <><path d="M12 3a9 9 0 1 0 9 9" strokeDasharray="4 4"/></>,
  location: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  link: <><path d="M10 13a5 5 0 0 0 7.1 0l3-3A5 5 0 0 0 13 2.9l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.1 0l-3 3A5 5 0 0 0 11 21.1l1.7-1.7"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01"/></>,
  report: <><path d="M5 3h14v18H5z"/><path d="M8 17v-4M12 17V8M16 17v-6"/></>,
  share: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.7 10.7 6.6-4.4M8.7 13.3l6.6 4.4"/></>,
  leaf: <><path d="M20 4C11 4 5 7 5 14a6 6 0 0 0 6 6c7 0 9-7 9-16Z"/><path d="M4 22c2-6 6-9 12-13"/></>,
  planet: <><circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4a13 13 0 0 1 0 16M12 4a13 13 0 0 0 0 16"/><ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(-25 12 12)"/></>,
  water: <><path d="M12 2C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-13Z"/></>,
  tree: <><path d="M12 22v-7"/><path d="M12 15 6 11a5 5 0 0 1 1-9 6 6 0 0 1 10 0 5 5 0 0 1 1 9z"/></>,
  lamp: <><path d="M9 18h6M10 21h4M8 15a7 7 0 1 1 8 0c-1 .8-1 2-1 3h-6c0-1-.1-2.2-1-3Z"/></>,
  cable: <><path d="M7 3v5M11 3v5M5 8h8v3a5 5 0 0 1-5 5h0a4 4 0 0 0-4 4v1"/><path d="M3 3v2M15 3v2"/></>,
  cellphone: <><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 5h4M11 19h2"/></>,
  computer: <><rect x="3" y="3" width="18" height="13" rx="2"/><path d="M8 21h8M12 16v5"/></>,
  avatar: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  mascot: <><path d="M12 3c-5 0-8 4-8 9s3 9 8 9 8-4 8-9-3-9-8-9Z"/><circle cx="9" cy="10" r="1"/><circle cx="15" cy="10" r="1"/><path d="M9 15q3 3 6 0"/></>,
  team: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 21a7 7 0 0 1 14 0M15 15a6 6 0 0 1 7 6"/></>,
};

export function CicloIcon({ name, size = 24, color = "currentColor", className, title, strokeWidth = 2 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}

export default CicloIcon;
