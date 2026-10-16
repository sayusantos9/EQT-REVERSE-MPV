import React from 'react';
import {View,StyleSheet} from 'react-native';
import {I} from './UI';
const PALETTES={
 blue:{outer:'#0754D6',middle:'#1F85FF',core:'#B8EFFF',light:'#DDF7FF',shadow:'#116FFF'},
 purple:{outer:'#6C2BD9',middle:'#9452F4',core:'#DEC3FF',light:'#F7EBFF',shadow:'#9F5AFF'},
 gold:{outer:'#D78700',middle:'#FFC82E',core:'#FFF2B0',light:'#FFFFFF',shadow:'#FFCE44'},
 cyan:{outer:'#057EBD',middle:'#28CBFA',core:'#C7F8FF',light:'#F1FDFF',shadow:'#2FCBFF'},
};
/** Três anéis com reflexos simulam um emblema holográfico sem imagens rasterizadas. */
export function GlowMedal({tone='blue',icon='trophy',size=68}){
 const p=PALETTES[tone]||PALETTES.blue;
 return <View accessible accessibilityLabel={'Conquista '+tone} style={{width:size,height:size,borderRadius:size/2,backgroundColor:p.outer,borderWidth:2,borderColor:p.light,alignItems:'center',justifyContent:'center',shadowColor:p.shadow,shadowOpacity:.65,shadowRadius:13,elevation:7}}>
   <View style={{width:size*.82,height:size*.82,borderRadius:size,backgroundColor:p.middle,alignItems:'center',justifyContent:'center',borderWidth:2,borderColor:p.light}}>
     <View style={{width:size*.66,height:size*.66,borderRadius:size,backgroundColor:p.core,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#FFFFFF'}}><I name={icon} size={size*.38} color={p.outer}/></View>
   </View>
   <View style={{position:'absolute',top:size*.13,left:size*.21,width:size*.14,height:size*.08,borderRadius:size,transform:[{rotate:'-35deg'}],backgroundColor:p.light,opacity:.91}}/>
 </View>;
}
