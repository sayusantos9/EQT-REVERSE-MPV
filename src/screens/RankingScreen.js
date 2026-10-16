import React,{useState} from 'react';
import {View,Pressable,StyleSheet} from 'react-native';
import {useApp} from '../context/AppContext';
import {DEMO_PEERS} from '../data/catalog';
import {C} from '../theme';
import {Screen} from './MainScreens';
import {Label,Card,Pill,PageHeader,Progress,I} from '../components/UI';
import {GlowMedal} from '../components/GlowMedal';

export function RankingScreen({back}){
 const {account,data}=useApp();const [mode,setMode]=useState('xp');
 const rows=DEMO_PEERS.map(r=>({...r}));
 const found=rows.find(p=>p.name===account.sector);
 if(found)found.xp+=data.xp;else rows.push({name:account.sector,xp:data.xp,people:1});
 const score=r=>mode==='xp'?Math.round(r.xp/r.people):r.people;
 rows.sort((a,b)=>score(b)-score(a));
 const max=Math.max(1,...rows.map(score));
 return <Screen><PageHeader title="Ranking dos setores" subtitle="Evolução coletiva do aprendizado" back={back}/>
  <Card color="#0E5DC6" style={{alignItems:'center',borderColor:'#459DF8',borderWidth:2}}>
   <GlowMedal size={94} tone="gold" icon="trophy"/>
   <Label bold size={21} style={{color:C.white,marginTop:10}}>Juntos evoluímos mais</Label>
   <Label size={12} style={{color:'#E1F4FF',textAlign:'center',marginTop:7}}>A classificação valoriza conhecimento, não quantidade de resíduos descartados.</Label>
  </Card>
  <View style={s.modes}>{[{id:'xp',text:'XP médio'},{id:'people',text:'Participantes'}].map(x=><Pressable key={x.id} onPress={()=>setMode(x.id)} style={[s.mode,mode===x.id&&{backgroundColor:C.blue}]}><Label bold size={12} style={{color:mode===x.id?C.white:C.blue}}>{x.text}</Label></Pressable>)}</View>
  {rows.map((r,i)=>{const tone=['gold','purple','blue','cyan'][i%4];const strong=[C.gold,C.purple,C.electric,C.cyan][i%4];return <View key={r.name} style={s.row}>
   <GlowMedal tone={tone} icon={i===0?'trophy':'medal'} size={55}/>
   <View style={{flex:1,marginLeft:3}}><Label size={15} bold>{i+1}º · {r.name}</Label><Label size={11} muted>{r.people} participantes · dados de demonstração</Label><Progress value={score(r)/max} fill={strong} height={10} track="#DAE8F5"/></View>
   <View style={{alignItems:'flex-end'}}><Label bold size={18} style={{color:strong}}>{score(r)}</Label><Label muted size={10}>{mode==='xp'?'XP médio':'pessoas'}</Label></View>
  </View>})}
  <Card color={C.ice}><Label size={11} muted>Este ranking usa informações fictícias e armazenamento local do MVP. Não reflete resultados oficiais da empresa.</Label></Card>
 </Screen>;
}
const s=StyleSheet.create({modes:{flexDirection:'row',gap:8,marginBottom:14,backgroundColor:C.ice,padding:5,borderRadius:16},mode:{flex:1,padding:12,alignItems:'center',borderRadius:12},row:{flexDirection:'row',gap:12,alignItems:'center',backgroundColor:C.white,padding:13,marginBottom:12,borderRadius:20,borderWidth:1,borderColor:C.border}});
