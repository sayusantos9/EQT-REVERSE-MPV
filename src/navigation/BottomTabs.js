import React from 'react';
import {View,Pressable,StyleSheet} from 'react-native';
import {CicloIcon} from '../components/CicloIcon';
import {Label} from '../components/UI';
import {C} from '../theme';
import {NAV_ITEMS} from './permissions';
const COLOR_BY_INDEX=[C.electric,C.purple,C.cyan,C.gold,C.holoBlue];
export function BottomTabs({role,page,onTab}) {
  const list=role==='administrador'?NAV_ITEMS.administrator:NAV_ITEMS.collaborator;
  if(!list.some(x=>x.id===page))return null;
  return <View style={s.nav} accessibilityRole="tablist">
    {list.map((item,i)=>{const active=page===item.id;const tone=COLOR_BY_INDEX[i];return <Pressable key={item.id} accessibilityRole="tab" accessibilityState={{selected:active}} onPress={()=>onTab(item.id)} style={s.tab}>
      <View style={[s.icon,{backgroundColor:active?tone:C.white,borderColor:active?'#DDF3FF':C.border,shadowColor:tone,shadowOpacity:active?.45:0,elevation:active?5:0}]}>
        <CicloIcon name={item.icon} size={22} color={active?C.white:tone}/>
      </View>
      <Label size={10} bold={active} style={{color:active?tone:C.muted}}>{item.label}</Label>
    </Pressable>})}
  </View>;
}
const s=StyleSheet.create({nav:{height:72,backgroundColor:C.white,flexDirection:'row',borderTopWidth:1,borderTopColor:C.border,paddingTop:3},tab:{flex:1,alignItems:'center',gap:3},icon:{width:49,height:40,borderRadius:15,borderWidth:1.5,alignItems:'center',justifyContent:'center'}});
