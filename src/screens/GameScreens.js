import React,{useRef,useState} from 'react';
import {View,Pressable,Animated,StyleSheet,Image} from 'react-native';
import {BY_ID,CATEGORIES,ROUTES} from '../data/catalog';
import {useApp} from '../context/AppContext';
import {useSound} from '../context/SoundContext';
import {C} from '../theme';
import {Screen} from './MainScreens';
import {Card,Button,Label,Pill,Progress,I,PageHeader,Art,ART,ART_BY_ID,RewardEmblem} from '../components/UI';
import {GlowMedal} from '../components/GlowMedal';
import {getLessonQuestions,LESSON_STAGES,LESSON_SIZE} from '../data/lessons';

export function QuizScreen({id='LAMPADAS',level=1,back,navigate}){
 const {allCategories,answer,award,data}=useApp();
 const cat=allCategories.find(c=>c.id===id)||CATEGORIES[0];
 const stage=Math.max(1,Math.min(4,Number(level)||1));
 const questions=getLessonQuestions(cat,stage);
 const {play}=useSound();
 const [index,setIndex]=useState(0),[selected,setSelected]=useState(null),[hits,setHits]=useState(0),[finished,setFinished]=useState(false);
 const q=questions[index];
 const right=selected===q?.correct;
 const saved=data.completed.includes(`lesson-${cat.id}-${stage}`);
 const choose=i=>{
   if(selected!==null)return;
   setSelected(i);const good=i===q.correct;
   if(good)setHits(n=>n+1);
   play(good?'acerto':'erro');
 };
 const next=()=>{
   if(index+1<questions.length){setSelected(null);setIndex(n=>n+1);return;}
   const succeeded=hits>=3;
   answer(`${cat.id}:nivel${stage}`,succeeded);
   if(succeeded){award(`lesson-${cat.id}-${stage}`,35,cat.id);answer(cat.id,true);play('missao');}
   setFinished(true);
 };
 if(finished)return <Screen>
   <PageHeader title={hits>=3?'Nível concluído!':'Vamos praticar mais'} subtitle={cat.name} back={back}/>
   <Card style={{alignItems:'center',padding:26}}>
    <GlowMedal size={110} icon={hits>=3?'trophy':'shield-check'} tone={hits>=3?'gold':'blue'}/>
    <Label size={27} bold style={[styles.center,{marginTop:15}]}>{hits}/{questions.length} acertos</Label>
    <Label size={14} muted style={[styles.center,{marginVertical:13}]}>{hits>=3?'Excelente! Você desbloqueou a próxima etapa.':'Você precisa de 3 acertos. Revise as explicações e tente novamente.'}</Label>
    {hits>=3?<Pill text={saved?'Nível já realizado':'+35 XP'} color={C.cream} fg="#8F6508" icon="star"/>:null}
    <Button title={hits>=3?'Voltar aos níveis':'Refazer as 4 questões'} onPress={()=>hits>=3?navigate('lessonHub',{id:cat.id}):(setIndex(0),setSelected(null),setHits(0),setFinished(false))} style={{marginTop:20,width:'100%'}}/>
   </Card>
 </Screen>;
 return <Screen>
   <View style={{backgroundColor:C.blue,padding:18,marginHorizontal:-18,marginTop:-16,marginBottom:16}}>
    <View style={{flexDirection:'row',alignItems:'center',gap:13,marginBottom:13}}>
      <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={back} style={{padding:8,backgroundColor:'#FFFFFF24',borderRadius:14}}><I name="arrow-left" color={C.white} size={22}/></Pressable>
      <View style={{flex:1}}><Label bold size={21} style={{color:C.white}}>{`Nível ${stage} · ${LESSON_STAGES[stage-1].title}`}</Label>
      <Label size={12} style={{color:'#E0F2FF'}}>{`${cat.name} · Atividade ${index+1} de ${questions.length}`}</Label></View>
    </View>
    <View style={{backgroundColor:'#2777CC',height:9,borderRadius:6,overflow:'hidden'}}><View style={{width:`${(index+1)/LESSON_SIZE*100}%`,height:'100%',backgroundColor:'#35C9F4',borderRadius:6}}/></View>
   </View>
   <View style={{padding:5,marginBottom:11}}><View style={{backgroundColor:'#DAEDFF',borderRadius:14,padding:14,alignSelf:'flex-start',marginBottom:15}}><I name={q.format==='image'?'magnify':'shield-check'} size={25} color={C.blue}/></View>
    <Label size={22} bold>{q.question}</Label><Label muted size={12} style={{marginTop:8}}>Escolha uma opção. Há uma única resposta correta.</Label></View>
   <View style={q.format==='image'?styles.imageOptions:undefined}>
    {q.choices.map((option,i)=>{
      const good=i===q.correct;const reveal=selected!==null&&good;const wrong=selected===i&&!good;
      const optCat=allCategories.find(c=>c.id===option.imageCategoryId);
      const visual=optCat&&ART_BY_ID[option.imageCategoryId];
      const bg=reveal?'#E5F8EF':wrong?'#FFEAE9':C.white;
      return <Pressable accessibilityRole="button" accessibilityLabel={`Alternativa ${String.fromCharCode(65+i)}: ${option.label}`} disabled={selected!==null}
        onPress={()=>choose(i)} key={q.id+'-'+i} style={[styles.option,{backgroundColor:bg,borderColor:reveal?'#1DBA69':wrong?C.red:C.border},q.format==='image'&&styles.imageOption]}>
         {q.format==='image'?<View style={{alignItems:'center',justifyContent:'center',minHeight:100,width:'100%'}}>
           {visual?<Image source={visual} style={{height:91,width:'100%'}} resizeMode="contain"/>:<View style={{backgroundColor:'#E7F2FF',borderRadius:14,padding:19}}><I name={optCat?.icon||'recycle'} size={39} color={C.blue}/></View>}
         </View>:null}
         <View style={[styles.optionLetter,reveal&&{backgroundColor:'#1DBA69'},wrong&&{backgroundColor:C.red},q.format==='image'&&{alignSelf:'center'}]}><Label bold style={{color:(reveal||wrong)?C.white:C.text}}>{String.fromCharCode(65+i)}</Label></View>
         <Label style={q.format==='image'?{textAlign:'center'}:{flex:1}} size={q.format==='image'?12:14} bold={selected===i}>{option.label}</Label>
         {selected!==null&&(reveal||wrong)?<I name={reveal?'check-circle':'close-circle'} color={reveal?'#19AF61':C.red} size={20}/>:null}
      </Pressable>;
    })}
   </View>
   {selected!==null?<Card color={right?'#E3F8EE':'#FFF4DB'} style={{marginTop:9}}>
     <Label bold size={17} style={{color:right?'#0C8756':'#956313'}}>{right?'Muito bem!':'Vamos aprender com a resposta'}</Label>
     <Label size={13} style={{marginVertical:12,lineHeight:21}}>{q.explanation}</Label>
     <Button title={index+1===questions.length?'Finalizar nível':'Próxima atividade'} onPress={next} icon="arrow-right"/>
   </Card>:<Card color="#E5F2FF"><Label size={12}>Leia a pergunta com atenção e toque na alternativa. Não é necessário arrastar.</Label></Card>}
 </Screen>;
}

/** Dois lados visíveis em perspectiva e transição 3D de 560 ms. */
export function FlashcardsScreen({back,navigate}){
  const {award}=useApp(),{play}=useSound();
  const [index,setIndex]=useState(0),[flipped,setFlipped]=useState(false);
  const rotation=useRef(new Animated.Value(0)).current;
  const cat=CATEGORIES[index];
  const front=rotation.interpolate({inputRange:[0,1],outputRange:['0deg','180deg']});
  const rear=rotation.interpolate({inputRange:[0,1],outputRange:['180deg','360deg']});
  const flip=()=>{const next=!flipped;setFlipped(next);Animated.timing(rotation,{toValue:next?1:0,duration:560,useNativeDriver:true}).start();};
  const next=(mastered)=>{if(mastered&&cat){play('acerto');award('flashcard-'+cat.id,10,cat.id);}rotation.setValue(0);setFlipped(false);setIndex(v=>v+1);};
  return <Screen><PageHeader title="Flashcards" subtitle="Toque para virar e aprender" back={back}/>
    {cat?<><View style={styles.bar}><Label bold>{index+1}/{CATEGORIES.length}</Label><View style={{flex:1}}><Progress value={(index+1)/CATEGORIES.length} fill={C.purple}/></View><GlowMedal tone="gold" icon="star" size={39}/></View>
      <Pressable accessibilityRole="button" accessibilityLabel={flipped?'Voltar à frente do flashcard':'Virar flashcard para ver a orientação'} onPress={flip} style={styles.flipTap}>
        <Animated.View style={[styles.flipSide,{transform:[{perspective:1100},{rotateY:front}]}]}>
          <Pill text="IDENTIFIQUE" color={C.ice} fg={C.blue}/>
          <Art source={ART_BY_ID[cat.id]} style={{height:188,width:'90%',marginTop:14}}/>
          <Label size={25} bold style={styles.center}>{cat.name}</Label>
          <Label size={14} style={[styles.center,{color:C.muted,marginTop:11}]}>Você sabe como separar e destinar esse material?</Label>
          <View style={{marginTop:24,flexDirection:'row',alignItems:'center',gap:8}}><I name="gesture-tap" color={C.blue}/><Label bold size={12} style={{color:C.blue}}>TOQUE PARA VIRAR</Label></View>
        </Animated.View>
        <Animated.View style={[styles.flipSide,styles.flipBack,{transform:[{perspective:1100},{rotateY:rear}]}]}>
          <GlowMedal size={58} tone="purple" icon="leaf"/>
          <Label size={13} bold style={{color:C.purple,marginTop:7}}>DESTINAÇÃO CONSCIENTE</Label>
          <Label size={22} bold style={[styles.center,{marginTop:12}]}>{cat.name}</Label>
          <Label size={14} style={[styles.center,{lineHeight:23,marginTop:17}]}>{cat.destination}</Label>
          <View style={{marginTop:22,flexDirection:'row',alignItems:'center',gap:8}}><I name="gesture-tap" color={C.blue}/><Label bold size={12} style={{color:C.blue}}>TOQUE PARA VOLTAR</Label></View>
        </Animated.View>
      </Pressable>
      {!flipped?<Button title="Virar cartão" onPress={flip} icon="cards-outline"/>:<><Label bold size={14} style={[styles.center,{marginVertical:13}]}>Como foi seu aprendizado?</Label>
        <View style={{flexDirection:'row',gap:9}}>{[
          {title:'Rever',icon:'bookmark',color:C.purple,ok:false},
          {title:'Aprendi!',icon:'check-circle',color:C.green,ok:true},
        ].map(x=><Pressable key={x.title} accessibilityRole="button" onPress={()=>next(x.ok)} style={[styles.choice,{borderColor:x.color}]}><I name={x.icon} color={x.color} size={29}/><Label bold size={13} style={{color:x.color}}>{x.title}</Label></Pressable>)}</View></>}
    </>:<Card style={{alignItems:'center',padding:28}}><GlowMedal size={110} tone="gold" icon="trophy"/><Label size={24} bold style={[styles.center,{marginTop:14}]}>Revisão concluída!</Label><Label muted style={[styles.center,{marginVertical:15}]}>Você revisou todos os materiais. Continue sua jornada e desbloqueie mais conquistas.</Label><Button title="Voltar para Aprender" onPress={()=>navigate('learn')}/></Card>}
  </Screen>;
}

const CHALLENGES=[
 {title:'Cabo de cobre após triagem',hint:'A equipe autorizada já liberou o material.',art:ART.cables,expected:'RECICLAGEM',why:'Após triagem e liberação, cabos podem seguir para reciclagem autorizada.'},
 {title:'Lâmpada fluorescente usada',hint:'Está íntegra e pode conter mercúrio.',art:ART.lamp,expected:'ESPECIAL',why:'É necessário preservar a lâmpada e seguir o fluxo especializado de tratamento.'},
 {title:'Medidor retirado da rede',hint:'Ainda não passou por inspeção.',art:ART.meter,expected:'AVALIACAO',why:'A condição do medidor precisa ser avaliada antes de decidir o destino.'},
 {title:'Bateria usada',hint:'Precisa ser armazenada e encaminhada.',art:ART.battery,expected:'ESPECIAL',why:'Baterias exigem coleta e destinação específicas conforme composição e risco.'},
 {title:'Equipamento eletrônico obsoleto',hint:'Ainda não foi avaliado.',art:ART.electronics,expected:'AVALIACAO',why:'A avaliação pode indicar recuperação, reuso ou reciclagem eletrônica especializada.'},
];

/** Minijogo: somente tocar na opção — sem arrastar e sem PanResponder. */
export function SortingScreen({back,navigate}){
 const {award}=useApp(),{play}=useSound();
 const [index,setIndex]=useState(0),[feedback,setFeedback]=useState(null),[hits,setHits]=useState(0);
 const item=CHALLENGES[index];
 const select=id=>{if(feedback)return;const correct=id===item.expected;setFeedback({selected:id,correct});if(correct)setHits(v=>v+1);play(correct?'acerto':'erro');};
 const next=()=>{if(index+1===CHALLENGES.length){award('sorting-complete',60);play('missao');setIndex(CHALLENGES.length);}else{setIndex(i=>i+1);setFeedback(null);}};
 if(!item)return <Screen><PageHeader title="Missão concluída!" back={back}/><Card style={{alignItems:'center',padding:26}}><GlowMedal tone="gold" icon="trophy" size={110}/><Label bold size={24} style={{marginTop:10}}>Parabéns!</Label><Label style={styles.center}>Você praticou cinco decisões de logística reversa.</Label><Label bold size={35} style={{color:C.blue}}>{hits}/5</Label><Pill text="+60 XP de participação" color={C.cream} fg="#865A0D"/><Button title="Voltar à trilha" onPress={()=>navigate('learn')} style={{width:'100%',marginTop:18}}/></Card></Screen>;
 return <Screen><PageHeader title="Destino correto" subtitle="Escolha com um toque · Sem arrastar" back={back}/>
 <View style={styles.bar}><Label bold>{index+1}/{CHALLENGES.length}</Label><View style={{flex:1}}><Progress value={(index+1)/CHALLENGES.length} fill={C.cyan}/></View><GlowMedal tone="blue" icon="star" size={40}/></View>
 <Card style={{alignItems:'center',padding:17}}><Art source={item.art} style={{height:168,width:'94%'}}/>
  <Label bold size={19} style={styles.center}>{item.title}</Label><Label muted size={12} style={[styles.center,{marginTop:7}]}>{item.hint}</Label></Card>
 <Label bold size={16} style={[styles.center,{marginBottom:13}]}>Qual é o encaminhamento correto?</Label>
 {ROUTES.map((r,i)=>{const active=feedback?.selected===r.id;const reveal=!!feedback&&item.expected===r.id;return <Pressable key={r.id} accessibilityRole="button" accessibilityState={{disabled:!!feedback,selected:active}} disabled={!!feedback} onPress={()=>select(r.id)} style={[styles.option,{borderColor:reveal?C.green:active?C.red:C.border,backgroundColor:reveal?C.mint:active?C.blush:C.white}]}>
  <View style={{width:50,height:50,backgroundColor:[C.ice,C.cream,C.lavender][i],borderRadius:15,alignItems:'center',justifyContent:'center'}}><I name={r.icon} color={[C.blue,C.amber,C.purple][i]} size={27}/></View><View style={{flex:1}}><Label bold size={15}>{r.title}</Label><Label muted size={11}>{r.description}</Label></View><I name={reveal?'check-circle':active?'close-circle':'chevron-right'} color={reveal?C.green:active?C.red:C.blue}/>
 </Pressable>})}
 {feedback?<Card color={feedback.correct?C.mint:C.cream}><Label bold size={17} style={{color:feedback.correct?C.green:'#976616'}}>{feedback.correct?'Muito bem!':'Aprenda com essa decisão'}</Label><Label style={{marginVertical:10}}>{item.why}</Label><Button title={index+1===CHALLENGES.length?'Finalizar missão':'Próximo material'} onPress={next}/></Card>:null}
 </Screen>;
}
const styles=StyleSheet.create({center:{textAlign:'center'},bar:{backgroundColor:C.white,borderRadius:16,padding:11,marginBottom:15,flexDirection:'row',alignItems:'center',gap:13},option:{borderRadius:18,borderWidth:2,padding:12,flexDirection:'row',alignItems:'center',gap:12,marginBottom:11},optionLetter:{width:33,height:33,borderRadius:10,backgroundColor:C.ice,alignItems:'center',justifyContent:'center'},imageOptions:{flexDirection:'row',flexWrap:'wrap',gap:8,justifyContent:'space-between'},imageOption:{width:'31.7%',padding:7,minHeight:174,flexDirection:'column',justifyContent:'center'},flipTap:{height:430,marginBottom:17},flipSide:{position:'absolute',left:0,right:0,top:0,bottom:0,backfaceVisibility:'hidden',backgroundColor:C.white,borderRadius:25,borderWidth:1,borderColor:C.border,padding:22,alignItems:'center',justifyContent:'center',shadowColor:C.blue,shadowOpacity:.12,shadowRadius:15,elevation:4},flipBack:{backgroundColor:'#F3EEFF',borderColor:'#B4A5FB'},choice:{flex:1,borderWidth:2,borderRadius:16,padding:14,backgroundColor:C.white,alignItems:'center',justifyContent:'center',gap:6}});
