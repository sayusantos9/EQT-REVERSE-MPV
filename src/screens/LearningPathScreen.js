import React,{useMemo} from 'react';
import {View,ScrollView,Pressable,StyleSheet} from 'react-native';
import {useApp,levelFromXp} from '../context/AppContext';
import {CATEGORIES} from '../data/catalog';
import {C} from '../theme';
import {PageHeader,Label,Card,I,Progress,Pill,Button} from '../components/UI';
import {GlowMedal} from '../components/GlowMedal';

const PATH=[
 {title:'Comece pelo básico',detail:'Conheça os cabos e fios',category:'CABOS',type:'category',icon:'cable-data',tone:'blue'},
 {title:'Cartas do conhecimento',detail:'Vire e aprenda com os materiais',type:'flashcards',icon:'cards-outline',tone:'purple'},
 {title:'Materiais que pedem atenção',detail:'Lâmpadas e cuidados especiais',category:'LAMPADAS',type:'category',icon:'lightbulb-outline',tone:'gold'},
 {title:'Decida com um toque',detail:'Escolha o destino mais adequado',type:'sorting',icon:'target',tone:'cyan'},
 {title:'Pilhas e baterias',detail:'Reconheça os riscos',category:'BATERIAS',type:'category',icon:'battery-charging-outline',tone:'purple'},
 {title:'Desafio da matéria',detail:'Aplique o conhecimento',category:'BATERIAS',type:'quiz',icon:'trophy',tone:'gold'},
 {title:'Medidores inteligentes',detail:'Triagem e avaliação técnica',category:'MEDIDORES',type:'category',icon:'counter',tone:'blue'},
 {title:'Eletrônicos e equipamentos',detail:'Avalie antes de destinar',category:'ELETRONICOS',type:'category',icon:'desktop-tower-monitor',tone:'cyan'},
 {title:'Concreto e ferragens',detail:'Segurança no canteiro',category:'POSTES',type:'category',icon:'shield-check',tone:'purple'},
];
const TONE_COLORS={blue:['#0656DF','#DDEBFF'],purple:['#6F32D5','#F1E6FF'],gold:['#CC8600','#FFF2C8'],cyan:['#0086C3','#DDF9FF']};
const finished=(entry,data)=>entry.type==='category'?data.completed.includes('lesson-'+entry.category+'-1'):entry.type==='sorting'?data.completed.includes('sorting-complete'):entry.type==='quiz'?!!data.answers[entry.category]:CATEGORIES.some(c=>data.completed.includes('flashcard-'+c.id));
export function LearningPathScreen({navigate,back}){
 const {account,data}=useApp();
 const status=useMemo(()=>PATH.map((v,i)=>({done:finished(v,data),open:i===0||PATH.slice(0,i).every(n=>finished(n,data))})),[data]);
 const completed=status.filter(s=>s.done).length;
 const current=Math.min(Math.max(0,status.findIndex(s=>!s.done)),PATH.length-1);
 const openLesson=(entry,i)=>{if(!status[i].open)return;
  if(entry.type==='category')navigate('lessonHub',{id:entry.category});
  else if(entry.type==='quiz')navigate('quiz',{id:entry.category});
  else navigate(entry.type);
 };
 return <ScrollView style={{flex:1,backgroundColor:'#F0F7FF'}} contentContainerStyle={{paddingBottom:38}} showsVerticalScrollIndicator={false}>
  <View style={s.head}><View style={{position:'absolute',width:210,height:210,borderRadius:105,backgroundColor:'#FFFFFF13',right:-69,top:-80}}/>
   <View style={{backgroundColor:"#FFFFFF",borderRadius:18,paddingHorizontal:6,paddingVertical:3}}><PageHeader title="Minha trilha" subtitle="Sua jornada de logística reversa" back={back}/></View>
   <View style={s.headContent}><GlowMedal size={71} tone="gold" icon="trophy"/><View style={{flex:1}}>
     <Label bold size={15} style={{color:'#FFFFFF'}}>Nível {levelFromXp(data.xp)} · Agente Reverso</Label>
     <Label size={12} style={{color:'#D2E9FF'}}>Aprenda, pratique e evolua</Label>
     <Progress value={completed/PATH.length} fill="#4AE5C7" track="#1F6BB6" height={10}/>
     <Label size={11} style={{color:'#E7FAFF',marginTop:5}}>{completed}/{PATH.length} lições concluídas</Label>
   </View></View>
  </View>
  <View style={s.stats}>
   <View style={s.stat}><I name="lightning-bolt" size={20} color="#FFA800"/><Label bold>{data.xp} XP</Label></View>
   <View style={s.stat}><I name="check-circle" size={20} color={C.green}/><Label bold>{completed} lições</Label></View>
   <View style={s.stat}><I name="star" size={20} color={C.purple}/><Label bold>Missões</Label></View>
  </View>
  <View style={{paddingHorizontal:17}}>
   <View style={s.chapter}><Pill text="UNIDADE 1 · CONHECER" color="#DDEBFF" fg="#0759C9" icon="book-open-variant"/>
     <Label bold size={20} style={{marginTop:9}}>O caminho dos materiais</Label><Label size={12} muted>Avance por níveis de quatro atividades. Cada resposta traz uma explicação.</Label></View>
   {PATH.map((item,i)=>{
     const st=status[i],active=i===current,level=st.done?'CONCLUÍDO':active?'SUA PRÓXIMA MISSÃO':'BLOQUEADO';
     const [strong,pale]=TONE_COLORS[item.tone];
     const offset=[5,73,147,70,5,72,147,70,5][i];
     return <View key={item.title} style={{minHeight:154}}>
       {i<PATH.length-1?<View style={[s.connector,{left:offset+57,backgroundColor:st.done?'#75C6EE':'#C8D9E9'}]}/>:null}
       <Pressable accessibilityRole="button" accessibilityState={{disabled:!st.open}} disabled={!st.open} onPress={()=>openLesson(item,i)} style={[s.step,{marginLeft:offset,opacity:st.open?1:.54}]}>
         <View style={[s.nodeOuter,{backgroundColor:st.open?strong:'#A3B9CF',borderColor:st.done?'#61E9C6':C.white}]}>
           {st.done?<I name="check-bold" size={34} color="white"/>:st.open?<I name={item.icon} size={34} color="white"/>:<I name="lock" size={31} color="#FFFFFF"/>}
           <View style={[s.shine,{opacity:st.open?1:.35}]}/>
         </View>
         {active?<View style={[s.activeTag,{backgroundColor:strong}]}><Label bold size={10} style={{color:C.white}}>COMEÇAR</Label></View>:null}
       </Pressable>
       <View style={[s.stepCopy,{marginLeft:offset>110?2:offset+88,width:offset>110?164:210}]}>
         <Label bold size={13} style={{color:st.open?C.navy:C.muted}}>{item.title}</Label>
         <Label size={11} style={{color:C.muted}}>{item.detail}</Label>
         {active?<Label bold size={10} style={{color:strong,marginTop:5}}>{level}</Label>:null}
       </View>
     </View>;
   })}
   <Card color="#EEF0FF" style={{alignItems:'center',marginTop:4,borderColor:'#D2C1FA',borderWidth:1}}>
     <GlowMedal tone="purple" size={86} icon="trophy"/>
     <Label bold size={17} style={{marginTop:10}}>Próxima conquista</Label>
     <Label muted size={12} style={{textAlign:'center',marginVertical:8}}>Complete a trilha e fortaleça sua responsabilidade na logística reversa.</Label>
     <Button title="Ver minha coleção" icon="bookshelf" secondary onPress={()=>navigate('collection')} style={{width:'100%'}}/>
   </Card>
  </View>
 </ScrollView>;
}
const s=StyleSheet.create({head:{backgroundColor:C.blue,paddingHorizontal:19,paddingTop:1,paddingBottom:24,borderBottomLeftRadius:29,borderBottomRightRadius:29,overflow:'hidden'},headContent:{flexDirection:'row',alignItems:'center',gap:15,backgroundColor:'#094A9B',padding:13,borderRadius:21,marginTop:8},stats:{flexDirection:'row',justifyContent:'space-evenly',marginHorizontal:17,marginTop:-12,backgroundColor:C.white,padding:14,borderRadius:18,borderColor:C.border,borderWidth:1,elevation:3},stat:{flexDirection:'row',alignItems:'center',gap:6},chapter:{marginTop:25,marginBottom:20,paddingHorizontal:9},connector:{width:9,height:126,borderRadius:9,position:'absolute',top:55},step:{width:108,alignItems:'center'},nodeOuter:{height:91,width:91,borderRadius:48,borderWidth:5,alignItems:'center',justifyContent:'center',shadowColor:'#2874DA',shadowOpacity:.34,shadowRadius:12,elevation:6},shine:{position:'absolute',top:12,left:15,width:30,height:10,borderRadius:10,backgroundColor:'#FFFFFFAA',transform:[{rotate:'-29deg'}]},activeTag:{paddingHorizontal:13,paddingVertical:5,borderRadius:12,marginTop:7},stepCopy:{position:'absolute',top:22,minHeight:52,justifyContent:'center'}});
