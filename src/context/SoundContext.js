import React, {createContext, useContext, useEffect, useCallback, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAudioPlayer} from 'expo-audio';
const STORAGE_KEY='@missao-reversa:audio-enabled-v1';
const SoundContext=createContext({enabled:true,setEnabled:()=>{},play:()=>{}});
export function SoundProvider({children}) {
  const acerto=useAudioPlayer(require('../../assets/sounds/acerto.wav'));
  const erro=useAudioPlayer(require('../../assets/sounds/erro.wav'));
  const nivel=useAudioPlayer(require('../../assets/sounds/nivel.wav'));
  const missao=useAudioPlayer(require('../../assets/sounds/missao.wav'));
  const [enabled,setEnabled]=useState(true);
  const [ready,setReady]=useState(false);
  useEffect(()=>{let active=true;AsyncStorage.getItem(STORAGE_KEY).then(value=>{
    if(active && value!==null) setEnabled(value==='true');
  }).catch(()=>{}).finally(()=>{if(active)setReady(true)});return()=>{active=false}},[]);
  useEffect(()=>{if(ready)AsyncStorage.setItem(STORAGE_KEY,String(enabled)).catch(()=>{})},[enabled,ready]);
  const play=useCallback((type)=>{
    if(!enabled)return;
    const player={acerto,erro,nivel,missao}[type];
    if(!player)return;
    // Reinicia cada efeito; erros de carregamento nunca devem interromper o jogo.
    Promise.resolve(player.seekTo(0)).then(()=>player.play()).catch(()=>{});
  },[enabled,acerto,erro,nivel,missao]);
  return <SoundContext.Provider value={{enabled,setEnabled,play}}>{children}</SoundContext.Provider>;
}
export const useSound=()=>useContext(SoundContext);
