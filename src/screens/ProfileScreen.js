import React from 'react';
import {View,Image,Pressable,Switch,StyleSheet} from 'react-native';
import {AVATARS} from '../assets/kit';
import {useApp,levelFromXp,progressForLevel,materialCount,quizCount} from '../context/AppContext';
import {useSound} from '../context/SoundContext';
import {C} from '../theme';
import {Screen} from './MainScreens';
import {Label,Card,PageHeader,Progress,I,Button} from '../components/UI';
import {GlowMedal} from '../components/GlowMedal';
const AWARDS=[
 {tone:'blue',icon:'star',label:'Primeiros passos'},
 {tone:'purple',icon:'shield-check',label:'Conhecimento'},
 {tone:'gold',icon:'trophy',label:'Excelência'},
 {tone:'cyan',icon:'medal',label:'Explorador'},
];
export function ProfileScreen({navigate,back}){
 const {account,data,logout}=useApp();const {enabled,setEnabled}=useSound();
 const level=levelFromXp(data.xp);
 const stats=[{n:materialCount(data),label:'Materiais vistos'},{n:quizCount(data),label:'Desafios corretos'},{n:data.completed.length,label:'Conquistas'},{n:data.xp,label:'XP total'}];
 return <Screen><PageHeader title="Meu perfil" subtitle="Sua evolução na logística reversa" back={back}/>
  <View style={s.hero}>
   <Image source={AVATARS[account.avatar||0]} style={{width:93,height:93,borderRadius:46}} resizeMode="contain"/>
   <Label bold size={22} style={{marginTop:10}}>{account.name}</Label><Label muted size={12}>Colaborador • {account.sector}</Label>
   <View style={s.level}><GlowMedal size={60} tone="blue" icon="star"/><View style={{flex:1}}><Label bold size={16}>Nível {level} · Agente Reverso</Label><Progress value={progressForLevel(data.xp)} height={9} fill={C.purple}/><Label muted size={11}>{data.xp} XP conquistados</Label></View></View>
  </View>
  <View style={s.stats}>{stats.map(st=><View key={st.label} style={s.stat}><Label bold size={23} style={{color:C.blue}}>{st.n}</Label><Label muted size={10} style={{textAlign:'center'}}>{st.label}</Label></View>)}</View>
  <Label bold size={20} style={{marginBottom:15}}>Minhas conquistas</Label>
  <View style={s.badges}>{AWARDS.map(({tone,icon,label},i)=><Pressable accessibilityRole="button" accessibilityLabel={label} onPress={()=>navigate('collection')} key={tone} style={s.badge}><GlowMedal tone={tone} icon={icon} size={70}/><Label size={10} bold style={{textAlign:'center',marginTop:6}}>{label}</Label></Pressable>)}</View>
  <Label bold size={19} style={{marginVertical:16}}>Minha jornada</Label>
  {[{label:'Trilha de aprendizagem',subtitle:'Continue a próxima lição',icon:'book-open-variant',page:'learn'},{label:'Coleção Reversa',subtitle:'Materiais descobertos',icon:'bookshelf',page:'collection'},{label:'Ranking',subtitle:'Pontuação dos setores',icon:'podium-gold',page:'ranking'}].map(i=><Pressable key={i.page} onPress={()=>navigate(i.page)} style={s.link}><I name={i.icon} color={C.purple} size={27}/><View style={{flex:1}}><Label bold>{i.label}</Label><Label muted size={11}>{i.subtitle}</Label></View><I name="chevron-right" color={C.blue}/></Pressable>)}
  <Card style={{flexDirection:'row',alignItems:'center',gap:12}}><I name="music-note" size={25} color={C.purple}/><View style={{flex:1}}><Label bold>Efeitos sonoros</Label><Label muted size={11}>Respostas e novas conquistas</Label></View><Switch value={enabled} onValueChange={setEnabled} trackColor={{false:C.border,true:C.purple}}/></Card>
  <Button title="Sair" secondary icon="logout" onPress={logout} style={{marginBottom:10}}/>
  <Label muted size={11} style={{textAlign:'center'}}>Demonstração offline · as permissões reais exigem autenticação em servidor.</Label>
 </Screen>;
}
const s=StyleSheet.create({hero:{backgroundColor:C.white,alignItems:'center',borderRadius:24,padding:20,marginBottom:13,borderWidth:1,borderColor:C.border},level:{width:'100%',flexDirection:'row',gap:12,alignItems:'center',marginTop:19,backgroundColor:'#EDF2FF',padding:12,borderRadius:18},stats:{flexDirection:'row',flexWrap:'wrap',gap:8,justifyContent:'space-between',marginBottom:18},stat:{width:'48%',backgroundColor:C.white,borderColor:C.border,borderWidth:1,borderRadius:17,padding:14,alignItems:'center'},badges:{flexDirection:'row',justifyContent:'space-around',gap:3},badge:{alignItems:'center',width:'24%'},link:{backgroundColor:C.white,borderRadius:17,borderWidth:1,borderColor:C.border,padding:15,marginBottom:10,flexDirection:'row',alignItems:'center',gap:12}});
