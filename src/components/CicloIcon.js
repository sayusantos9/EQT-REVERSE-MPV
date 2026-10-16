// Adaptado do pacote Ciclo_Icones_Editaveis fornecido pela equipe.
// React Native usa react-native-svg (as tags HTML <svg> nao funcionam no Expo Go).
import React from 'react';
import Svg, {Path, Rect, Circle, Ellipse, Defs, LinearGradient, Stop} from 'react-native-svg';
const paths = {
  home: <><Path d="m3 10 9-7 9 7"/><Path d="M5 9v11h14V9"/><Path d="M9 20v-6h6v6"/></>,
  learn: <><Path d="M3 5.5A3.5 3.5 0 0 1 6.5 2H12v19H6.5A3.5 3.5 0 0 0 3 24z" transform="translate(0 -1)"/><Path d="M21 5.5A3.5 3.5 0 0 0 17.5 2H12v19h5.5A3.5 3.5 0 0 1 21 24z" transform="translate(0 -1)"/></>,
  scanner: <><Path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3M21 16v3a2 2 0 0 1-2 2h-3"/><Path d="M7 7h3v3H7zM14 7h3v3h-3zM7 14h3v3H7zM14 14h3v3h-3z"/></>,
  missions: <><Circle cx="12" cy="12" r="9"/><Circle cx="12" cy="12" r="5"/><Circle cx="12" cy="12" r="1"/><Path d="m15 9 6-6"/></>,
  profile: <><Circle cx="12" cy="8" r="4"/><Path d="M4 21a8 8 0 0 1 16 0"/></>,
  search: <><Circle cx="10.5" cy="10.5" r="6.5"/><Path d="m16 16 5 5"/></>,
  settings: <><Circle cx="12" cy="12" r="3"/><Path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7-1.4-2.4L7.3 15a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7 1.4 2.4-1.4 1.1a8 8 0 0 1-.1 2Z" transform="translate(-1 -1) scale(1.08)"/></>,
  notifications: <><Path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><Path d="M10 22h4"/></>,
  back: <><Path d="m15 18-6-6 6-6"/><Path d="M9 12h12"/></>,
  next: <><Path d="m9 18 6-6-6-6"/><Path d="M3 12h12"/></>,
  download: <><Path d="M12 3v12"/><Path d="m7 10 5 5 5-5"/><Path d="M4 19v2h16v-2"/></>,
  camera: <><Path d="M4 7h3l2-3h6l2 3h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"/><Circle cx="12" cy="13" r="4"/></>,
  menu: <><Path d="M4 6h16M4 12h16M4 18h16"/></>,
  xp: <><Path d="m12 2 3 6 7 .9-5 4.8 1.2 7L12 17.4 5.8 20.7 7 13.7 2 8.9 9 8z"/></>,
  level: <><Path d="M12 2 21 6v6c0 5-4 8-9 10-5-2-9-5-9-10V6z"/><Path d="m9 12 2 2 4-5"/></>,
  trophy: <><Path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><Path d="M7 6H3v2a5 5 0 0 0 5 5M17 6h4v2a5 5 0 0 1-5 5"/></>,
  medal: <><Circle cx="12" cy="9" r="6"/><Path d="m8 14-2 8 6-3 6 3-2-8"/><Path d="m10 9 1.5 1.5L14 8"/></>,
  crown: <><Path d="m3 8 5 4 4-7 4 7 5-4-2 11H5z"/><Path d="M5 22h14"/></>,
  progress: <><Rect x="3" y="7" width="18" height="10" rx="5"/><Path d="M8 7v10" opacity=".5"/></>,
  energy: <><Path d="m13 2-9 12h7l-1 8 10-13h-7z"/></>,
  heart: <><Path d="M20.8 8.6c0 5.2-8.8 11-8.8 11s-8.8-5.8-8.8-11A4.6 4.6 0 0 1 12 6a4.6 4.6 0 0 1 8.8 2.6Z"/></>,
  gift: <><Rect x="3" y="10" width="18" height="11" rx="2"/><Path d="M2 7h20v4H2zM12 7v14"/><Path d="M12 7H7a2.5 2.5 0 1 1 2.5-2.5C9.5 6 12 7 12 7ZM12 7h5a2.5 2.5 0 1 0-2.5-2.5C14.5 6 12 7 12 7Z"/></>,
  ranking: <><Path d="M3 21V12h5v9M10 21V4h5v17M17 21v-9h5v9"/><Path d="M3 4h3M4.5 2.5v3"/></>,
  recycle: <><Path d="m7 7 3-4 3 4M10 3l3 7"/><Path d="m17 10 5 1-2 5M22 11l-7 4"/><Path d="m8 17-3 4-3-5M5 21l3-7"/><Path d="M6 10 4 7M18 17h4"/></>,
  hazard: <><Path d="M10 3h4l8 18H2z"/><Path d="M12 9v5M12 17h.01"/></>,
  trash: <><Path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15M10 10v7M14 10v7"/></>,
  organic: <><Path d="M20 4C11 4 5 7 5 14a6 6 0 0 0 6 6c7 0 9-7 9-16Z"/><Path d="M4 22c2-6 6-9 12-13"/></>,
  "special-disposal": <><Path d="M12 3v18M3 12h18"/><Path d="m7 7 10 10M17 7 7 17"/><Circle cx="12" cy="12" r="9"/></>,
  reuse: <><Path d="m7 7 3-3 3 3M10 4v6a4 4 0 0 0 4 4h3"/><Path d="m17 17-3 3-3-3M14 20v-6a4 4 0 0 0-4-4H7"/></>,
  electronics: <><Rect x="3" y="4" width="18" height="13" rx="2"/><Path d="M8 21h8M12 17v4"/></>,
  battery: <><Rect x="4" y="6" width="16" height="15" rx="2"/><Path d="M9 3h6v3M12 10v7M9 13.5h6"/></>,
  plastic: <><Path d="M9 3h6M10 3v5l-4 5v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-7l-4-5V3"/><Path d="M7 15h10"/></>,
  paper: <><Path d="M6 3h9l4 4v14H6z"/><Path d="M15 3v5h4M9 12h7M9 16h7"/></>,
  metal: <><Path d="M5 4h14l3 5-3 12H5L2 9z"/><Path d="M2 9h20M8 4l-2 5 2 12M16 4l2 5-2 12"/></>,
  glass: <><Path d="M8 3h8l-1 5 3 12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L9 8z"/><Path d="M8 14h8"/></>,
  flashcards: <><Rect x="7" y="4" width="13" height="16" rx="2"/><Path d="M4 7v14a2 2 0 0 0 2 2h11M10 9h7M10 13h7"/></>,
  quiz: <><Rect x="3" y="4" width="18" height="17" rx="3"/><Path d="M9 9a3 3 0 1 1 5 2c-1.3.8-2 1.4-2 3M12 17h.01"/></>,
  game: <><Path d="M6 9h12a4 4 0 0 1 3.8 5l-1 3a2 2 0 0 1-3.2 1l-3-2H9l-3 2a2 2 0 0 1-3.2-1l-1-3A4 4 0 0 1 6 9Z"/><Path d="M7 12v4M5 14h4M16 13h.01M18 15h.01"/></>,
  pdf: <><Path d="M6 2h9l5 5v15H6z"/><Path d="M15 2v5h5M8 16h2a1.5 1.5 0 0 0 0-3H8v6M14 19v-6h1a3 3 0 0 1 0 6z"/></>,
  content: <><Path d="M5 3h14v18H5z"/><Path d="M8 7h8M8 11h8M8 15h6"/></>,
  identification: <><Circle cx="12" cy="8" r="4"/><Path d="M4 21a8 8 0 0 1 16 0M12 12v4"/></>,
  separation: <><Path d="M4 4h6v6H4zM14 4h6v6h-6zM9 14h6v6H9z"/><Path d="m10 7 4 0M12 10v4"/></>,
  destination: <><Path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><Circle cx="12" cy="10" r="2.5"/></>,
  safety: <><Path d="M12 2 21 6v6c0 5-4 8-9 10-5-2-9-5-9-10V6z"/><Path d="m8 12 3 3 5-6"/></>,
  available: <><Circle cx="12" cy="12" r="9"/><Path d="m8 12 3 3 5-6"/></>,
  "in-progress": <><Circle cx="12" cy="12" r="9"/><Path d="M12 7v5l3 2"/></>,
  locked: <><Rect x="4" y="10" width="16" height="11" rx="2"/><Path d="M8 10V7a4 4 0 1 1 8 0v3"/></>,
  warning: <><Path d="M12 3 22 21H2z"/><Path d="M12 9v5M12 17h.01"/></>,
  unavailable: <><Circle cx="12" cy="12" r="9"/><Path d="m9 9 6 6M15 9l-6 6"/></>,
  "admin-dashboard": <><Rect x="3" y="3" width="8" height="8" rx="1"/><Rect x="13" y="3" width="8" height="5" rx="1"/><Rect x="13" y="10" width="8" height="11" rx="1"/><Rect x="3" y="13" width="8" height="8" rx="1"/></>,
  categories: <><Path d="M3 6h18l-2 15H5z"/><Path d="M2 3h20v3H2zM9 10h6"/></>,
  "qr-generator": <><Path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3z"/><Path d="M14 14h3v3h-3zM19 14h2v2h-2zM19 19h2v2h-2zM14 19h2v2h-2z"/></>,
  "educational-content": <><Path d="M5 3h14v18H5z"/><Path d="M8 7h8M8 11h8M8 15h5"/></>,
  success: <><Circle cx="12" cy="12" r="9"/><Path d="m8 12 3 3 5-6"/></>,
  error: <><Circle cx="12" cy="12" r="9"/><Path d="m9 9 6 6M15 9l-6 6"/></>,
  info: <><Circle cx="12" cy="12" r="9"/><Path d="M12 11v5M12 7h.01"/></>,
  loading: <><Path d="M12 3a9 9 0 1 0 9 9" strokeDasharray="4 4"/></>,
  location: <><Path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><Circle cx="12" cy="10" r="2.5"/></>,
  link: <><Path d="M10 13a5 5 0 0 0 7.1 0l3-3A5 5 0 0 0 13 2.9l-1.7 1.7"/><Path d="M14 11a5 5 0 0 0-7.1 0l-3 3A5 5 0 0 0 11 21.1l1.7-1.7"/></>,
  calendar: <><Rect x="3" y="5" width="18" height="16" rx="2"/><Path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01"/></>,
  report: <><Path d="M5 3h14v18H5z"/><Path d="M8 17v-4M12 17V8M16 17v-6"/></>,
  share: <><Circle cx="18" cy="5" r="3"/><Circle cx="6" cy="12" r="3"/><Circle cx="18" cy="19" r="3"/><Path d="m8.7 10.7 6.6-4.4M8.7 13.3l6.6 4.4"/></>,
  leaf: <><Path d="M20 4C11 4 5 7 5 14a6 6 0 0 0 6 6c7 0 9-7 9-16Z"/><Path d="M4 22c2-6 6-9 12-13"/></>,
  planet: <><Circle cx="12" cy="12" r="8"/><Path d="M4 12h16M12 4a13 13 0 0 1 0 16M12 4a13 13 0 0 0 0 16"/><Ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(-25 12 12)"/></>,
  water: <><Path d="M12 2C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-13Z"/></>,
  tree: <><Path d="M12 22v-7"/><Path d="M12 15 6 11a5 5 0 0 1 1-9 6 6 0 0 1 10 0 5 5 0 0 1 1 9z"/></>,
  lamp: <><Path d="M9 18h6M10 21h4M8 15a7 7 0 1 1 8 0c-1 .8-1 2-1 3h-6c0-1-.1-2.2-1-3Z"/></>,
  cable: <><Path d="M7 3v5M11 3v5M5 8h8v3a5 5 0 0 1-5 5h0a4 4 0 0 0-4 4v1"/><Path d="M3 3v2M15 3v2"/></>,
  cellphone: <><Rect x="6" y="2" width="12" height="20" rx="2"/><Path d="M10 5h4M11 19h2"/></>,
  computer: <><Rect x="3" y="3" width="18" height="13" rx="2"/><Path d="M8 21h8M12 16v5"/></>,
  avatar: <><Circle cx="12" cy="8" r="4"/><Path d="M4 21a8 8 0 0 1 16 0"/></>,
  mascot: <><Path d="M12 3c-5 0-8 4-8 9s3 9 8 9 8-4 8-9-3-9-8-9Z"/><Circle cx="9" cy="10" r="1"/><Circle cx="15" cy="10" r="1"/><Path d="M9 15q3 3 6 0"/></>,
  team: <><Circle cx="9" cy="8" r="3"/><Circle cx="17" cy="9" r="2.5"/><Path d="M2 21a7 7 0 0 1 14 0M15 15a6 6 0 0 1 7 6"/></>,
};


export const CICLO_ICON_NAMES = Object.keys(paths);
export function CicloIcon({name,size=24,color='#1264B1',strokeWidth=2}) {
  // Refined vector version of the supplied trophy icon, not a low-resolution image.
  if (name === 'trophy') {
    return <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" accessible accessibilityLabel="Troféu de conquista">
      <Defs>
        <LinearGradient id="eqtCup" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFE895"/><Stop offset="0.5" stopColor="#F6BE3D"/><Stop offset="1" stopColor="#D78A1E"/>
        </LinearGradient>
      </Defs>
      <Path d="M7 3.1h10v5.6c0 3.9-2 6.1-5 6.1s-5-2.2-5-6.1z" fill="url(#eqtCup)" stroke="#B5721C" strokeWidth=".65"/>
      <Path d="M7 5H3.6v2.3c0 3.3 1.7 4.5 4.8 4.5M17 5h3.4v2.3c0 3.3-1.7 4.5-4.8 4.5" stroke="#D99922" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M12 15v4M8.7 21h6.6M9.3 19h5.4v2H9.3z" fill="#CE8721" stroke="#B97722" strokeWidth="1.3" strokeLinecap="round"/>
      <Path d="m12 5.4.82 1.65 1.82.26-1.32 1.28.31 1.81L12 9.55l-1.63.85.31-1.81-1.32-1.28 1.82-.26z" fill="#FFFCF1"/>
      <Path d="M8.8 4.25h1.6" stroke="#FFF4C4" strokeWidth=".8" strokeLinecap="round"/>
      <Circle cx="3.1" cy="16.8" r=".75" fill="#E9B53E"/><Circle cx="20.6" cy="15.7" r=".6" fill="#E9B53E"/>
    </Svg>;
  }
  if (name === 'xp') {
    return <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" accessible accessibilityLabel="Pontos de experiência">
      <Path d="m12 2.5 2.84 5.8 6.39.93-4.61 4.49 1.09 6.36L12 17.06l-5.71 3.02 1.09-6.36-4.61-4.49 6.39-.93z" fill="#F9CC47" stroke="#D99B20" strokeWidth="1"/>
      <Path d="m12 5 1.45 2.95" stroke="#FFF5C8" strokeWidth="1.3" strokeLinecap="round"/>
    </Svg>;
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      accessible accessibilityLabel={name}>
      {paths[name] || paths.info}
    </Svg>
  );
}
export default CicloIcon;
