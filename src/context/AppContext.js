import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CATEGORIES, BY_ID } from '../data/catalog';
import {useSound} from './SoundContext';

const KEY = '@eqt-reverse:mvp-ai-v2'; // Mantém a compatibilidade com o armazenamento local anterior
const Context = createContext(null);
const INITIAL = { xp: 0, completed: [], visited: [], scans: [], answers: {}, records: [], notifications: [] };
const freshProgress=()=>({...INITIAL,completed:[],visited:[],scans:[],answers:{},records:[],notifications:[]});
export function AppProvider({ children }) {
  const {play} = useSound();
  const lastLevel = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [account, setAccount] = useState(null);
  const [data, setData] = useState(INITIAL);
  const [people, setPeople] = useState([]);
  const [progressByUser,setProgressByUser]=useState({});
  const [customCategories,setCustomCategories]=useState([]);
  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(KEY).then(raw => {
      if (raw && active) { const s = JSON.parse(raw); const profiles=s.progressByUser|| (s.account?.email?{[s.account.email]:{...INITIAL,...(s.data||{})}}:{});setProgressByUser(profiles);setData(s.account?.email?{...freshProgress(),...(profiles[s.account.email]||{})}:freshProgress()); setAccount(s.account?{...s.account,role:s.account.role==='administrador'?'administrador':'colaborador'}:null); setPeople((Array.isArray(s.people)?s.people:[]).map(p=>({...p,role:'colaborador'}))); setCustomCategories(Array.isArray(s.customCategories)?s.customCategories:[]); }
    }).catch(() => {}).finally(() => { if (active) setLoaded(true); });
    return () => { active = false; };
  }, []);
  useEffect(() => { if (loaded) AsyncStorage.setItem(KEY, JSON.stringify({ account, data, people, customCategories, progressByUser })).catch(() => {}); }, [loaded, account, data, people, customCategories, progressByUser]);
  useEffect(() => {
    if(!loaded||!account?.email)return;
    setProgressByUser(old=>old[account.email]===data?old:{...old,[account.email]:data});
  },[data,loaded,account?.email]);
  useEffect(() => {
    if (!loaded) return;
    const currentLevel = Math.floor(data.xp / 150) + 1;
    if (lastLevel.current !== null && currentLevel > lastLevel.current) play('nivel');
    lastLevel.current = currentLevel;
  }, [loaded, data.xp, play]);
  // Somente demonstração offline: autenticação REAL deve ser feita no backend futuro.
  const signIn = (name, email, role = 'colaborador', sector = 'Operações', avatar=0) => {
    const key=email.trim().toLowerCase(); lastLevel.current=null;
    setData({...freshProgress(),...(progressByUser[key]||{})});
    setAccount({name,email:key,role:role==='administrador'?'administrador':'colaborador',sector,avatar});
  };
  const createDemoAccount = (name, email, sector, avatar=0) => {
    const person={name,email,sector,avatar,role:'colaborador',status:'Ativo'};
    setPeople(old=>[...old.filter(p=>p.email.toLowerCase()!==email.toLowerCase()),person]);
    lastLevel.current=null;setData({...freshProgress(),...(progressByUser[email.toLowerCase()]||{})});setAccount(person);
  };
  const updateAvatar = avatar => setAccount(old=>old?{...old,avatar}:old);
  const adminAddPerson = person => {
    if(account?.role!=='administrador') return false;
    const safe={name:String(person.name||'').trim(),email:String(person.email||'').trim(),sector:String(person.sector||'Operações'),avatar:0,
      role:'colaborador',status:'Convidado'};
    if(!safe.name||!safe.email.includes('@'))return false;
    setPeople(old=>[...old.filter(p=>p.email!==safe.email),safe]);return true;
  };
  const addCategory = values => {
    if(account?.role!=='administrador') return {ok:false,message:'Apenas administrador.'};
    const name=String(values.name||'').trim(),identify=String(values.identify||'').trim(),separate=String(values.separate||'').trim(),destination=String(values.destination||'').trim();
    if(name.length<3||identify.length<8||separate.length<8||destination.length<8)return {ok:false,message:'Preencha nome, identificação, separação e destinação.'};
    const id='C'+Date.now().toString(36).toUpperCase();
    const category={id,name,short:name,qr:'MR:CAT:'+id,accent:'#166DE2',icon:'recycle',identify,separate,destination,risk:String(values.risk||'Consulte as regras de segurança do setor.'),workflow:'Setor → triagem → destinação autorizada',route:'AVALIACAO',routeReason:'Realize a triagem técnica antes de definir o destino.'};
    setCustomCategories(old=>[...old,category]);
    return {ok:true,id};
  };
  const allCategories=[...CATEGORIES,...customCategories];
  const logout = () => {setAccount(null);setData(freshProgress());lastLevel.current=null;};
  const award = (id, amount = 0, category = null) => {
    let gained = false;
    setData(old => {
      if (old.completed.includes(id)) return old;
      gained = true;
      return { ...old, xp: old.xp + amount, completed: [...old.completed, id], visited: category && !old.visited.includes(category) ? [...old.visited, category] : old.visited };
    });
    return gained;
  };
  const visit = id => setData(old => ({ ...old, visited: old.visited.includes(id) ? old.visited : [...old.visited, id] }));
  const scan = id => setData(old => ({ ...old, scans: [{ id, at: new Date().toISOString() }, ...old.scans].slice(0, 35) }));
  const answer = (id, correct) => setData(old => ({ ...old, answers: { ...old.answers, [id]: { correct, at: new Date().toISOString() } } }));
  const addRecord = details => {
    const row = { ...details, id: 'REG-' + Date.now().toString(36).toUpperCase(), at: new Date().toISOString(), createdBy: account?.name || 'Demonstrativo', status: 'Pendente', reviewedBy: null };
    setData(old => ({ ...old, records: [row, ...old.records] }));
    return row;
  };
  const reviewRecord = (id, status) => setData(old => ({ ...old, records: old.records.map(r => r.id === id ? { ...r, status, reviewedBy: account?.name || 'Gestor' } : r) }));
  return <Context.Provider value={{ loaded, account, data, people, customCategories, allCategories, addCategory, signIn, createDemoAccount, updateAvatar, adminAddPerson, logout, award, visit, scan, answer, addRecord, reviewRecord }}>
    {children}
  </Context.Provider>;
}
export const useApp = () => useContext(Context);
export const levelFromXp = xp => Math.floor(xp / 150) + 1;
export const progressForLevel = xp => (xp % 150) / 150;
export const materialCount = data => CATEGORIES.filter(c => data.visited.includes(c.id)).length;
export const quizCount = data => Object.entries(data.answers).filter(([key,result])=>key.includes(':nivel')&&result?.correct).length;
