import React,{useState} from 'react';
import {View,ScrollView,Pressable,Image,ImageBackground,StyleSheet} from 'react-native';
import {AVATARS,HOME_BACKGROUND,BRAND_LOGO,DASH_ASSETS} from '../assets/kit';
import {CATEGORIES} from '../data/catalog';
import {useApp,levelFromXp,progressForLevel} from '../context/AppContext';
import {C} from '../theme';
import {Card,Label,Button,Pill,I,Progress,IconBox,PageHeader,SectionHeading,Art,ART_BY_ID,RewardEmblem} from '../components/UI';
export const Screen=({children,style})=><ScrollView showsVerticalScrollIndicator={false} style={[{flex:1,backgroundColor:C.bg},style]} contentContainerStyle={{paddingHorizontal:18,paddingTop:16,paddingBottom:34}} keyboardShouldPersistTaps="handled">{children}</ScrollView>;
const ActionIcon=({source,label,onPress})=><Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label} style={{alignItems:'center',gap:4,flex:1}}><Image source={source} style={{height:74,width:74}} resizeMode="contain"/><Label size={12} bold>{label}</Label></Pressable>;
const Row=({icon,title,desc,onPress,bg=C.ice,art,right})=><Pressable accessibilityRole="button" onPress={onPress} style={styles.row}>{art?<Art source={art} style={{width:68,height:62,borderRadius:12}}/>:<IconBox icon={icon} color={C.blue} size={52} tint={bg}/>}<View style={{flex:1,gap:2}}><Label bold size={15}>{title}</Label><Label muted size={11}>{desc}</Label></View>{right||<I name="chevron-right" size={23} color={C.blue}/>}</Pressable>;
export function HomeScreen({navigate,tab}) {
 const {account,data}=useApp(); const level=levelFromXp(data.xp);
 const completed=(data.completed||[]).filter(x=>x.startsWith('lesson-')).length;
 const stats=[{name:'Introdução',asset:DASH_ASSETS.intro,progress:Math.min(4,Math.max(0,completed))},
   {name:'Resíduos',asset:DASH_ASSETS.waste,progress:Math.min(4,Math.max(0,completed-4))},
   {name:'Destinação',asset:DASH_ASSETS.destination,progress:Math.min(4,Math.max(0,completed-8))},
   {name:'Segurança',asset:DASH_ASSETS.safety,progress:Math.min(4,Math.max(0,completed-12))}];
 return <Screen style={{backgroundColor:'#EEF8FF'}}>
   <ImageBackground source={DASH_ASSETS.header} resizeMode="cover" style={[styles.homeHeader,{height:144,alignItems:'center',justifyContent:'center'}]}>
     <Image source={DASH_ASSETS.logo} style={{height:105,width:220}} resizeMode="contain"/>
     <Pressable accessibilityLabel="Abrir perfil" onPress={()=>tab('profile')} style={{position:'absolute',right:18,top:36,backgroundColor:'#FFFFFFE6',padding:10,borderRadius:25}}><I name="cog-outline" size={23} color={C.blue}/></Pressable>
   </ImageBackground>
   <View style={[styles.welcome,{marginTop:-13,padding:14}]}>
     <Image source={AVATARS[account.avatar||0]} style={{height:65,width:65,borderRadius:42}} resizeMode="contain"/>
     <View style={{flex:1}}><Label bold size={21}>Olá, {account.name.split(' ')[0]}!</Label><Label muted size={12}>Que bom ter você por aqui!</Label><Label muted size={11}>Vamos continuar sua missão?</Label></View>
   </View>
   <View style={[styles.levelCard,{backgroundColor:'#086DD0',borderRadius:23,padding:15}]}>
     <Image source={DASH_ASSETS.level} style={{width:64,height:64}} resizeMode="contain"/>
     <View style={{flex:1,gap:3}}><Label bold size={19} style={{color:C.white}}>Nível {level}</Label><Label size={12} style={{color:'#E3F3FF'}}>Agente Consciente</Label>
      <Progress value={progressForLevel(data.xp)} fill="#21C5F5" track="#6BA9EC" height={11}/>
      <Label size={11} style={{color:'#FFFFFF',marginTop:2}}>{data.xp%150}/150 XP • {data.xp} XP total</Label></View>
      <Image source={DASH_ASSETS.xp} style={{width:48,height:48}} resizeMode="contain"/>
   </View>
   <Pressable accessibilityRole="button" onPress={()=>navigate('lessonHub',{id:'LAMPADAS'})} style={[styles.daily,{padding:18}]}>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}><Label bold size={18}><I name="target" color={C.red}/>  Missão do dia</Label><Pill text="+ XP" icon="star" color="#FFF2BF" fg="#AD7500"/></View>
    <View style={{flexDirection:'row',alignItems:'center',marginTop:17,paddingLeft:6,gap:12}}>
      <View style={{flex:1}}><Label bold size={14}>Aprenda sobre lâmpadas</Label><Label muted size={12}>Conheça o material e conclua um nível!</Label></View>
      <View style={{backgroundColor:C.blue,borderRadius:14,padding:12}}><I name="arrow-right" size={22} color={C.white}/></View>
    </View>
   </Pressable>
   <View style={[styles.quickRow,{gap:2}]}><ActionIcon source={DASH_ASSETS.learn} label="Aprender" onPress={()=>tab('learn')}/><ActionIcon source={DASH_ASSETS.scanner} label="Scanner" onPress={()=>tab('scan')}/><ActionIcon source={DASH_ASSETS.collection} label="Coleção" onPress={()=>navigate('collection')}/><ActionIcon source={DASH_ASSETS.ranking} label="Ranking" onPress={()=>navigate('ranking')}/></View>
   <Pressable accessibilityRole="button" onPress={()=>navigate('sorting')} style={[styles.week,{padding:14}]}><Image source={DASH_ASSETS.weekly} style={{height:90,width:92}} resizeMode="contain"/><View style={{flex:1}}><Label bold size={16}>Desafio da semana</Label><Label size={12}>Classifique 5 materiais em uma missão interativa.</Label><Pill text="+60 XP" fg="#A26900" color="#FFF8DD"/></View><I name="chevron-right" size={24} color={C.blue}/></Pressable>
   <SectionHeading title="Seu progresso" onMore={()=>tab('learn')}/>
   <View style={{flexDirection:'row',gap:7,marginBottom:16}}>{stats.map(v=><Pressable accessibilityRole="button" accessibilityLabel={v.name} onPress={()=>tab('learn')} key={v.name} style={{flex:1,backgroundColor:C.white,borderRadius:15,padding:7,alignItems:'center',minHeight:115}}>
     <Image source={v.asset} style={{height:44,width:46}} resizeMode="contain"/><Label bold size={10} style={{textAlign:'center'}}>{v.name}</Label><Label muted size={10}>{v.progress}/4</Label><View style={{width:'100%',height:6,borderRadius:8,backgroundColor:'#D6E4F0',overflow:'hidden',marginTop:3}}><View style={{height:6,width:(v.progress*25)+'%',backgroundColor:'#179BE9',borderRadius:8}}/></View>
   </Pressable>)}</View>
 </Screen>;
}
const DAILY=[{id:'learn-one',title:'Aprenda um material',hint:'Leia uma ficha educativa',xp:15,icon:'leaf',go:n=>n('category',{id:'CABOS'})},{id:'lesson-LAMPADAS-1',title:'Complete um nível',hint:'Quatro questões sobre lâmpadas',xp:25,icon:'help-circle-outline',go:n=>n('lessonHub',{id:'LAMPADAS'})},{id:'sorting-complete',title:'Classifique 5 materiais',hint:'No minijogo de separação',xp:60,icon:'recycle',go:n=>n('sorting')}];
export function MissionsScreen({navigate,back}){
 const {data}=useApp(); const done=DAILY.filter(x=>data.completed.includes(x.id)).length;
 return <Screen><PageHeader title="Missões da semana" subtitle="Pratique, aprenda e receba XP" back={back}/>
  <Card style={{backgroundColor:C.electric,borderColor:C.electric,padding:19}}><Label bold size={19} style={{color:C.white}}>Seu avanço educativo</Label><Label size={12} style={{color:'#E4F2FF',marginBottom:14}}>{done} de {DAILY.length} atividades concluídas</Label><Progress value={done/DAILY.length} fill={C.gold} track="#417EC8" height={11}/></Card>
  <SectionHeading title="Missões disponíveis"/>
  {DAILY.map((m,i)=>{const finished=data.completed.includes(m.id);return <Pressable key={m.id} onPress={()=>m.go(navigate)} accessibilityRole="button" style={styles.mission}>
   <IconBox icon={finished?'check-circle':m.icon} tint={[C.ice,C.lavender,C.cream][i]} color={[C.electric,C.purple,C.gold][i]} size={55}/>
   <View style={{flex:1,gap:5}}><Label bold size={15}>{m.title}</Label><Label muted size={12}>{m.hint}</Label><Pill text={finished?'Concluída':'+'+m.xp+' XP'} color={finished?C.mint:C.cream} fg={finished?C.green:'#A46D14'}/></View>
   <I name={finished?'check-circle':'chevron-right'} color={finished?C.green:C.electric}/>
  </Pressable>})}
  <Card color={C.lavender}><Label size={12}>Completar missões significa aprender a destinar corretamente. Nunca gere resíduos apenas para obter pontos.</Label></Card>
 </Screen>;
}
export function CollectionScreen({navigate,back}){const {data}=useApp(),[filter,setFilter]=useState('all');const list=CATEGORIES.filter(c=>filter==='all'||filter==='seen'&&data.visited.includes(c.id)||filter==='master'&&data.completed.includes('lesson-'+c.id+'-1'));return <Screen><PageHeader title="Coleção Reversa" subtitle="Descubra, aprenda e domine os materiais" back={back}/><View style={styles.segment}>{[{id:'all',label:'Todos'},{id:'seen',label:'Descobertos'},{id:'master',label:'Dominados'}].map(x=><Pressable key={x.id} onPress={()=>setFilter(x.id)} style={[styles.segmentButton,filter===x.id&&styles.segmentActive]}><Label bold size={12} style={{color:filter===x.id?C.white:C.muted}}>{x.label}</Label></Pressable>)}</View><View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>{list.map((cat,i)=>{const visited=data.visited.includes(cat.id),master=data.completed.includes('lesson-'+cat.id+'-1');return <Pressable key={cat.id} onPress={()=>navigate('category',{id:cat.id})} style={[styles.collectionTile,{backgroundColor:visited?[C.mint,C.cream,C.ice][i%3]:'#E6ECF3'}]}><View style={{height:105,alignItems:'center',justifyContent:'center'}}>{visited&&ART_BY_ID[cat.id]?<Art source={ART_BY_ID[cat.id]} style={{height:96,width:'100%'}}/>:<I name={cat.icon} size={55} color={C.slate}/>}</View><Label bold size={13} style={{textAlign:'center'}}>{cat.short}</Label><View style={{marginTop:7,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:4}}><I name={master?'check-decagram':visited?'check-circle-outline':'lock-outline'} color={master?C.green:visited?C.blue:C.slate} size={14}/><Label muted size={10}>{master?'Dominado':visited?'Descoberto':'Não estudado'}</Label></View></Pressable>})}</View>{list.length===0?<Card><Label muted>Estude uma categoria para aparecer aqui.</Label></Card>:null}<Card color={C.ice}><Label size={12}>Colecione conhecimento, não resíduos: materiais vistos e dominados representam sua evolução educativa.</Label></Card></Screen>}
const styles=StyleSheet.create({homeHeader:{marginHorizontal:-18,marginTop:-16,paddingHorizontal:22,paddingTop:20,paddingBottom:26,backgroundColor:C.blue,overflow:'hidden'},welcome:{backgroundColor:C.white,borderRadius:20,padding:12,flexDirection:'row',gap:12,alignItems:'center',marginBottom:10,borderWidth:1,borderColor:C.border},levelCard:{backgroundColor:'#0B9C72',borderRadius:18,padding:14,flexDirection:'row',alignItems:'center',gap:11,marginBottom:12},daily:{padding:14,borderRadius:18,backgroundColor:C.white,borderWidth:1,borderColor:C.border,marginBottom:15,elevation:1},quickRow:{flexDirection:'row',marginBottom:18,gap:5},week:{padding:13,backgroundColor:'#FFF1C8',borderRadius:19,flexDirection:'row',gap:8,alignItems:'center',marginBottom:15},row:{backgroundColor:C.white,borderRadius:17,padding:12,flexDirection:'row',alignItems:'center',gap:12,borderWidth:1,borderColor:C.border,marginBottom:10},skill:{borderRadius:19,padding:17,marginBottom:11,flexDirection:'row',alignItems:'center',minHeight:135,overflow:'hidden'},segment:{padding:4,backgroundColor:'#E6F0FB',borderRadius:16,flexDirection:'row',gap:3,marginBottom:16},segmentButton:{flex:1,paddingHorizontal:5,paddingVertical:11,borderRadius:13,alignItems:'center'},segmentActive:{backgroundColor:C.blue},course:{borderRadius:18,padding:17,flexDirection:'row',alignItems:'center',marginBottom:12,minHeight:132,overflow:'hidden'},mission:{backgroundColor:C.white,borderRadius:18,padding:13,flexDirection:'row',gap:12,alignItems:'center',marginBottom:12,borderWidth:1,borderColor:C.border},collectionTile:{borderRadius:16,padding:10,width:'48.5%',marginBottom:12,minHeight:170,overflow:'hidden'},rankRow:{backgroundColor:C.white,borderRadius:16,padding:13,flexDirection:'row',alignItems:'center',gap:11,borderWidth:1,borderColor:C.border,marginBottom:10},profileHero:{backgroundColor:C.white,borderRadius:22,padding:19,borderWidth:1,borderColor:C.border,marginBottom:14},levelYellow:{backgroundColor:'#FFF0C9',padding:11,borderRadius:16,flexDirection:'row',gap:10,alignItems:'center'},profileStat:{width:'48.5%',backgroundColor:C.white,borderColor:C.border,borderWidth:1,borderRadius:15,alignItems:'center',justifyContent:'center',padding:14,marginBottom:10,minHeight:81}});
