import React from 'react';
import {View,Pressable,ScrollView,StyleSheet,Image} from 'react-native';
import {CATEGORIES} from '../data/catalog';
import {LESSON_STAGES,LESSON_SIZE} from '../data/lessons';
import {useApp} from '../context/AppContext';
import {C} from '../theme';
import {Label,PageHeader,Pill,I,Progress,Card,ART_BY_ID} from '../components/UI';
import {GlowMedal} from '../components/GlowMedal';

const COLORS=[['#086EE9','#E5F1FF'],['#7A31E5','#EEE5FF'],['#E5A100','#FFF3CE'],['#06B5D0','#DFF8FF']];
export function LessonLevelsScreen({id='CABOS',back,navigate}){
 const {allCategories,data}=useApp();
 const cat=allCategories.find(c=>c.id===id)||CATEGORIES[0];
 const done=LESSON_STAGES.filter(s=>data.completed.includes(`lesson-${cat.id}-${s.id}`)).length;
 return <ScrollView style={{flex:1,backgroundColor:'#EFF7FF'}} contentContainerStyle={{padding:19,paddingBottom:45}}>
   <PageHeader title={cat.name} subtitle="Quatro níveis curtos · 4 atividades por nível" back={back}/>
   <View style={styles.hero}>
     {ART_BY_ID[cat.id]?<Image source={ART_BY_ID[cat.id]} style={{height:105,width:108}} resizeMode="contain"/>:<GlowMedal tone="blue" icon="leaf" size={78}/>}
     <View style={{flex:1}}><Label bold size={18} style={{color:C.white}}>Sua jornada neste material</Label>
       <Label size={12} style={{color:'#E0EFFF',marginVertical:6}}>{done} de 4 níveis concluídos</Label>
       <Progress value={done/4} fill="#40DAFF" track="#5C9ADD" height={10}/></View>
   </View>
   <Card color="#E6F3FF"><Label size={12}>Cada nível tem 4 atividades, incluindo escolha por imagem. Você precisa acertar pelo menos 3 para desbloquear a próxima etapa.</Label></Card>
   {LESSON_STAGES.map((item,i)=>{
     const finished=data.completed.includes(`lesson-${cat.id}-${item.id}`);
     const open=i===0||data.completed.includes(`lesson-${cat.id}-${item.id-1}`);
     const [strong,pale]=COLORS[i];
     return <Pressable key={item.id} accessibilityRole="button" accessibilityState={{disabled:!open}} disabled={!open}
       onPress={()=>navigate('quiz',{id:cat.id,level:item.id})} style={[styles.step,{opacity:open?1:.55,borderColor:finished?'#2FC69A':pale}]}>
       <View style={[styles.circle,{backgroundColor:open?strong:'#99AABD'}]}><I name={finished?'check-circle':open?item.icon:'lock-outline'} size={30} color={C.white}/></View>
       <View style={{flex:1}}><Label bold size={16}>{`Nível ${item.id} · ${item.title}`}</Label><Label muted size={12}>{item.subtitle}</Label><Label bold size={11} style={{color:strong,marginTop:7}}>{finished?'Concluído':open?`${LESSON_SIZE} atividades · Começar`:'Conclua o nível anterior'}</Label></View>
       <I name={finished?'check-circle':'chevron-right'} color={strong}/>
     </Pressable>;
   })}
   <Pill text="Conhecimento vale mais que volume descartado" color="#E0F7EA" fg="#168B6D" icon="leaf"/>
 </ScrollView>;
}
const styles=StyleSheet.create({hero:{backgroundColor:'#0B64C2',borderRadius:20,padding:15,flexDirection:'row',alignItems:'center',gap:16,marginBottom:14},step:{minHeight:100,backgroundColor:C.white,borderWidth:2,borderRadius:20,padding:15,marginBottom:13,flexDirection:'row',alignItems:'center',gap:13},circle:{height:62,width:62,borderRadius:32,alignItems:'center',justifyContent:'center',borderWidth:3,borderColor:'#FFFFFFAA'}});
