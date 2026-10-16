import React, {useRef, useState} from 'react';
import {FlatList, View, Text, Image, Pressable, useWindowDimensions, StyleSheet, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthBackground, AuthButton} from '../../components/auth/AuthElements';
import {INTRO_ART, DASH_ASSETS} from '../../assets/kit';
import {palette} from './authStyles';

const SLIDES = [
  {id:'01', eyebrow:'UMA NOVA JORNADA',title:'Conhecimento que transforma',
   body:'Aprenda a reconhecer materiais e a tomar decisões mais conscientes no trabalho.',
   foot:'Aprenda, pratique e descarte corretamente.', art:INTRO_ART[0]},
  {id:'02',eyebrow:'INFORMAÇÃO NA PALMA DA MÃO',title:'Cada material tem seu destino',
   body:'Leia etiquetas QR Code e descubra os cuidados de separação e destinação de cada categoria.',
   foot:'Aponte a câmera e consulte o destino.',art:INTRO_ART[1]},
  {id:'03',eyebrow:'CRESCER JUNTOS',title:'Sua evolução faz a diferença',
   body:'Conquiste XP, complete trilhas e ajude a criar uma cultura ambiental mais responsável.',
   foot:'Cada escolha consciente conta.', art:INTRO_ART[2]},
];

export function WelcomeCarouselScreen({onLogin,onSignup}) {
  const list = useRef(null);
  const [current,setCurrent]=useState(0);
  const {width,height}=useWindowDimensions();
  const compact=height<750;
  const artHeight=compact?Math.min(height*.26,198):Math.min(height*.31,260);
  const next=()=>{if(current===SLIDES.length-1){onLogin();return;}const target=current+1;setCurrent(target);list.current?.scrollToIndex({index:target,animated:true});};
  return <AuthBackground>
    <StatusBar barStyle="dark-content" backgroundColor="#ECF8FF"/>
    <SafeAreaView style={s.safe} edges={['top','bottom']}>
      <View style={[s.header,{height:compact?105:133}]}>
        <Image source={DASH_ASSETS.logo} style={{height:compact?93:121,width:214}} resizeMode="contain" accessibilityLabel="EQT Reverse"/>
        <Pressable style={s.skip} onPress={onLogin} accessibilityRole="button"><Text style={s.skipLabel}>Pular</Text></Pressable>
      </View>
      <FlatList ref={list} data={SLIDES} keyExtractor={x=>x.id}
        horizontal pagingEnabled bounces={false} showsHorizontalScrollIndicator={false}
        getItemLayout={(_,index)=>({length:width,offset:index*width,index})}
        onMomentumScrollEnd={e=>setCurrent(Math.max(0,Math.min(2,Math.round(e.nativeEvent.contentOffset.x/width))))}
        renderItem={({item})=><View style={[s.slide,{width}]}>
          <Image source={item.art} resizeMode="contain" style={[s.illustration,{height:artHeight}]} accessibilityLabel="Ilustração educativa sobre logística reversa"/>
          <View style={[s.copy,{marginTop:compact?4:15}]}>
            <Text style={s.eyebrow}>{item.eyebrow}</Text>
            <Text style={[s.title,{fontSize:compact?25:29,lineHeight:compact?30:35}]}>{item.title}</Text>
            <Text style={[s.body,{fontSize:compact?12:14,lineHeight:compact?18:21}]}>{item.body}</Text>
            <View style={s.foot}><Text style={s.footText}>{item.foot}</Text></View>
          </View>
        </View>}
        style={{flex:1}}/>
      <View style={s.controls}>
        <View style={s.dots}>{SLIDES.map((slide,i)=><Pressable key={slide.id} accessibilityRole="button" accessibilityLabel={'Ir para etapa '+(i+1)} onPress={()=>{setCurrent(i);list.current?.scrollToIndex({index:i,animated:true});}} style={[s.dot,i===current&&s.dotActive]}/>)}</View>
        <AuthButton title={current===2?'Entrar no EQT Reverse':'Próximo'} icon="arrow-right" onPress={next}/>
        <View style={{height:9}}/><AuthButton title="Criar uma conta" secondary onPress={onSignup}/>
      </View>
    </SafeAreaView>
  </AuthBackground>;
}
const s=StyleSheet.create({
  safe:{flex:1},header:{alignItems:'center',justifyContent:'center'},
  skip:{position:'absolute',right:19,top:4,padding:10},skipLabel:{color:palette.blue,fontSize:13,fontWeight:'700'},
  slide:{paddingHorizontal:18,alignItems:'center'},illustration:{width:'100%',maxWidth:430},
  copy:{paddingHorizontal:8,width:'100%',alignItems:'center'},
  eyebrow:{color:palette.green,fontSize:11,fontWeight:'800',letterSpacing:1.8,marginBottom:8,textAlign:'center'},
  title:{color:palette.navy,fontWeight:'800',textAlign:'center'},
  body:{color:palette.secondary,textAlign:'center',marginTop:13,maxWidth:340},
  foot:{marginTop:16,paddingVertical:10,paddingHorizontal:15,borderRadius:30,backgroundColor:'#DFF6EC'},
  footText:{color:palette.green,fontSize:12,fontWeight:'700',textAlign:'center'},
  controls:{paddingHorizontal:24,paddingBottom:8},dots:{flexDirection:'row',gap:8,justifyContent:'center',marginBottom:15},
  dot:{width:9,height:9,borderRadius:8,backgroundColor:'#C9E2F6'},dotActive:{width:28,backgroundColor:palette.blue},
});
