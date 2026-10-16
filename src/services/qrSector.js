import {CATEGORIES} from '../data/catalog';
export const SECTORS=['Operações','Logística','Almoxarifado','Manutenção','Administrativo','Ambiental'];
export const normalizeSector=(v='')=>String(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/[^A-Z0-9]/g,'_');
/** O catálogo recebido inclui categorias locais adicionadas pelo administrador. */
export function encodeQr(categoryId,sector,categories=CATEGORIES){
  if(!categories.some(c=>c.id===categoryId))throw new Error('Categoria inválida');
  const valid=SECTORS.find(s=>normalizeSector(s)===normalizeSector(sector));
  if(!valid)throw new Error('Setor inválido');
  return `EQT:V1:${categoryId}:${normalizeSector(valid)}`;
}
export function decodeQr(raw,categories=CATEGORIES){
  const code=String(raw||'').trim();
  const match=/^EQT:V1:([A-Z0-9_]+):([A-Z0-9_]+)$/.exec(code);
  if(match&&categories.some(c=>c.id===match[1])){
    const sector=SECTORS.find(s=>normalizeSector(s)===match[2]);
    return sector?{id:match[1],sector,version:'V1'}:null;
  }
  const legacy=/^MR:CAT:([A-Z0-9_]+)$/.exec(code);
  return legacy&&categories.some(c=>c.id===legacy[1])?{id:legacy[1],sector:null,version:'legado'}:null;
}
