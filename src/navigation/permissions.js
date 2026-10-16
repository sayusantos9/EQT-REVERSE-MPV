/** Navegação e permissões do MVP offline: somente colaborador ou administrador. */
const EDUCATIONAL = new Set(['learn','lessonHub','missions','flashcards','quiz','sorting','collection']);
const ADMIN_ONLY = new Set(['adminCodes','qrLabel','staff','addCategory']);
export function canAccess(role, route) {
  if (role !== 'administrador' && role !== 'colaborador') return false;
  if (role === 'administrador') return !EDUCATIONAL.has(route);
  return !ADMIN_ONLY.has(route);
}
export const NAV_ITEMS = {
  collaborator: [
    {id:'home',label:'Início',icon:'home'},
    {id:'learn',label:'Aprender',icon:'learn'},
    {id:'scan',label:'Scanner',icon:'scanner'},
    {id:'missions',label:'Missões',icon:'missions'},
    {id:'profile',label:'Perfil',icon:'profile'},
  ],
  administrator: [
    {id:'home',label:'Painel',icon:'admin-dashboard'},
    {id:'adminCodes',label:'Etiquetas',icon:'qr-generator'},
    {id:'staff',label:'Equipe',icon:'profile'},
    {id:'ranking',label:'Ranking',icon:'ranking'},
    {id:'profile',label:'Perfil',icon:'profile'},
  ],
};
