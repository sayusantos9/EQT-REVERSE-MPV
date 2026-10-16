import React from 'react';
import {View,Text,Image,Pressable,StyleSheet} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CicloIcon, {CICLO_ICON_NAMES} from './CicloIcon';
import {C} from '../theme';
const CICLO_ICON_KEYS = new Set(CICLO_ICON_NAMES);

export const ART={
 logo:require('../../assets/images/logos/eqt_reverse_navy.png'),
 logoWhite:require('../../assets/images/logos/eqt_reverse_white.png'),
 bins:require('../../assets/images/illustrations/bins.png'),
 sortBins:require('../../assets/images/illustrations/sort_bins.png'),
 avatar:require('../../assets/images/illustrations/avatar.png'),
 magnify:require('../../assets/images/illustrations/magnifier.png'),
 helmet:require('../../assets/images/illustrations/helmet.png'),
 lamps:require('../../assets/images/materials/lampadas_fluorescentes.png'),
 lamp:require('../../assets/images/materials/lampadas_fluorescentes.png'),
 battery:require('../../assets/images/materials/pilhas_e_baterias.png'),
 cables:require('../../assets/images/materials/cabos_e_fios.png'),
 electronics:require('../../assets/images/materials/equipamentos_eletronicos.png'),
 meter:require('../../assets/images/materials/medidores_de_energia.png'),
 posts:require('../../assets/images/materials/concreto_e_ferragens.png'),
 factory:require('../../assets/images/illustrations/factory.png')
};
export const ART_BY_ID={CABOS:ART.cables,LAMPADAS:ART.lamp,BATERIAS:ART.battery,MEDIDORES:ART.meter,ELETRONICOS:ART.electronics,POSTES:ART.posts};
const CICLO_ALIASES = {
  "home-variant": "home",
  "book-education-outline": "learn",
  "qrcode-scan": "scanner",
  "flag-checkered": "missions",
  "account-circle-outline": "profile",
  "star": "xp",
  "star-circle": "xp",
  "shield-star": "level",
  "trophy-award": "trophy",
  "podium-gold": "ranking",
  "medal-outline": "medal",
  "lightbulb-outline": "lamp",
  "battery-charging-outline": "battery",
  "wall": "metal",
  "cog-outline": "settings",
  "bell-outline": "notifications",
  "arrow-left": "back",
  "arrow-right": "next",
  "chevron-right": "next",
  "qrcode-plus": "qr-generator",
  "bookshelf": "content",
  "book-open-variant": "learn",
  "cards-outline": "flashcards",
  "gamepad-variant": "game",
  "gamepad-variant-outline": "game",
  "school-outline": "learn",
  "heart": "heart",
  "target": "missions",
  "history": "calendar",
  "logout": "back",
  "view-dashboard": "admin-dashboard",
  "clipboard-check-outline": "content",
  "clipboard-check": "available",
  "help-circle-outline": "quiz",
  "recycle": "recycle",
  "alert-circle-outline": "warning",
  "alert-outline": "warning",
  "shield-alert-outline": "hazard",
  "lightbulb-fluorescent-tube": "lamp",
  "lightbulb-on-outline": "lamp",
  "car-battery": "battery",
  "cable-data": "cable",
  "desktop-tower-monitor": "computer",
  "counter": "electronics",
  "magnify": "search",
  "camera-outline": "camera",
  "hand-back-right-outline": "safety",
  "information-outline": "info",
  "truck-check-outline": "destination",
  "file-pdf-box": "pdf",
  "printer-outline": "download",
  "cellphone-scan": "scanner",
  "clipboard-text-outline": "content",
  "send-check-outline": "available",
  "check-circle-outline": "success",
  "check-circle": "success",
  "close-circle": "error",
  "gesture-tap": "info",
  "bookmark": "flashcards",
  "lock-outline": "locked",
  "check-decagram": "medal",
  "shield-check": "safety",
  "qr-code": "scanner",
  "leaf": "leaf",
  "pdf-box": "pdf",
  "numeric-1-circle-outline": "medal",
  "numeric-2-circle-outline": "medal",
  "numeric-3-circle-outline": "medal",
  "menu": "menu",
  "trash-can-outline": "trash",
  "trash-can": "trash"
};
export const I=({name,size=22,color=C.blue})=>{
 const key=CICLO_ALIASES[name]||name;
 if (CICLO_ICON_KEYS.has(key)) return <CicloIcon name={key} size={size} color={color} strokeWidth={2.1}/>;
 return <MaterialCommunityIcons name={name} size={size} color={color}/>;
};
/** Troféu vetorial: substitui o antigo PNG e usa o símbolo do Ciclo Icon Pack. */
export function RewardEmblem({size=88}) {
 const rim=Math.round(size*0.2);
 return <View style={{width:size,height:size,borderRadius:size/2,backgroundColor:'#FFF2C9',borderWidth:2,borderColor:'#F7D77A',alignItems:'center',justifyContent:'center'}}>
  <View style={{width:size-rim,height:size-rim,borderRadius:size,backgroundColor:'#FFFAE8',alignItems:'center',justifyContent:'center',borderColor:'#FFE5A0',borderWidth:1}}>
    <CicloIcon name="trophy" size={Math.round(size*.60)} color="#D69D25" />
  </View>
  <View style={{position:'absolute',right:1,top:4,width:11,height:11,borderRadius:6,backgroundColor:'#F4C343'}} />
  <View style={{position:'absolute',left:5,bottom:9,width:7,height:7,borderRadius:4,backgroundColor:'#F8D47D'}} />
 </View>;
}
export const Art=({source,style,contain=true})=><Image source={source} resizeMode={contain?'contain':'cover'} style={style}/>;
export function Label({children,style,muted=false,size=14,bold=false}){return <Text style={[{fontSize:size,color:muted?C.muted:C.text,fontWeight:bold?'700':'400',lineHeight:size*1.35},style]}>{children}</Text>}
export function Title({children,subtitle,small=false}){return <View style={{marginBottom:18}}><Label bold size={small?23:28}>{children}</Label>{subtitle?<Label muted size={13} style={{marginTop:3}}>{subtitle}</Label>:null}</View>}
export function Card({children,style,color=C.white}){return <View style={[s.card,{backgroundColor:color},style]}>{children}</View>}
export function Button({title,onPress,secondary,outline,icon,disabled,style,size='md'}){const bg=outline?C.white:secondary?C.ice:C.blue,fg=disabled?C.slate:secondary||outline?C.blue:C.white;return <Pressable accessibilityRole="button" accessibilityLabel={title} onPress={onPress} disabled={disabled} style={({pressed})=>[s.button,{backgroundColor:disabled?C.border:bg,paddingVertical:size==='sm'?10:14,borderWidth:outline?1:0,borderColor:C.border,opacity:pressed?.75:1},style]}>{icon?<I name={icon} size={20} color={fg}/>:null}<Label bold size={14} style={{color:fg}}>{title}</Label></Pressable>}
export function Pill({text,icon,color=C.ice,fg=C.blue,style}){return <View style={[s.pill,{backgroundColor:color},style]}>{icon?<I name={icon} size={16} color={fg}/>:null}<Label size={12} bold style={{color:fg}}>{text}</Label></View>}
export function SectionHeading({title,onMore,more='Ver todos'}){return <View style={s.section}><Label bold size={18}>{title}</Label>{onMore?<Pressable accessibilityRole="button" onPress={onMore}><Label bold size={12} style={{color:C.blue}}>{more}  ›</Label></Pressable>:null}</View>}
export function Progress({value,fill=C.green,track=C.border,height=9}){return <View style={{height,backgroundColor:track,borderRadius:8,overflow:'hidden'}}><View style={{height:'100%',width:Math.max(0,Math.min(100,value*100))+'%',backgroundColor:fill,borderRadius:8}}/></View>}
export function IconBox({icon,tint=C.ice,color=C.blue,size=50}){return <View style={{width:size,height:size,borderRadius:Math.round(size*.29),backgroundColor:tint,alignItems:'center',justifyContent:'center'}}><I name={icon} size={size*.51} color={color}/></View>}
export function PageHeader({title,subtitle,back,right}){return <View style={s.header}><View style={{flexDirection:'row',gap:12,alignItems:'center',flex:1}}>{back?<Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={back} style={s.back}><I name="arrow-left" size={21}/></Pressable>:null}<View style={{flex:1}}><Label bold size={23}>{title}</Label>{subtitle?<Label muted size={12}>{subtitle}</Label>:null}</View></View>{right}</View>}
export function HeroBand({title,subtitle,icon='recycle',right,bg=C.blue,children}){return <View style={{backgroundColor:bg,borderBottomLeftRadius:29,borderBottomRightRadius:29,marginHorizontal:-18,paddingHorizontal:22,paddingTop:17,paddingBottom:22,marginBottom:20,overflow:'hidden'}}><View style={{position:'absolute',width:180,height:180,borderRadius:100,backgroundColor:'#FFFFFF',opacity:.07,top:-75,right:-46}}/><View style={{position:'absolute',width:130,height:130,borderRadius:100,backgroundColor:'#FFFFFF',opacity:.08,bottom:-85,left:-50}}/><View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}><View style={{flex:1}}><Label bold size={24} style={{color:C.white}}>{title}</Label>{subtitle?<Label size={12} style={{color:'#DAEBFF',marginTop:5}}>{subtitle}</Label>:null}</View>{right||<I name={icon} size={35} color="#D4F4FF"/>}</View>{children}</View>}
export function IllustrationTile({image,title,subtitle,bg=C.ice,onPress,style}){return <Pressable accessibilityRole="button" onPress={onPress} style={[{backgroundColor:bg,borderRadius:18,padding:12,minHeight:148,overflow:'hidden'},style]}><View style={{flex:1}}><Label bold size={15}>{title}</Label>{subtitle?<Label size={11} muted>{subtitle}</Label>:null}</View>{image?<Art source={image} style={{height:72,width:'100%',alignSelf:'center'}}/>:null}</Pressable>}
export const s=StyleSheet.create({card:{borderRadius:19,padding:16,borderWidth:1,borderColor:C.border,marginBottom:13},button:{borderRadius:15,alignItems:'center',justifyContent:'center',flexDirection:'row',gap:9,minHeight:48},pill:{alignSelf:'flex-start',paddingHorizontal:11,paddingVertical:6,borderRadius:14,flexDirection:'row',gap:6,alignItems:'center'},section:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12,marginTop:10},header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:20},back:{height:40,width:40,borderRadius:21,backgroundColor:C.ice,justifyContent:'center',alignItems:'center'}});
