import React, {useState} from 'react';
import {View, Text, TextInput, Pressable, Image, ImageBackground, StyleSheet} from 'react-native';
import {I} from '../UI';
import {BRAND_LOGO, AUTH_BACKGROUND, LEAVES_BOTTOM} from '../../assets/kit';
import {authStyles as styles, palette} from '../../screens/auth/authStyles';

export function AuthBackground({children, source=AUTH_BACKGROUND}) {
  return (
    <View style={styles.scene}>
      <ImageBackground source={source} resizeMode="stretch"
        style={StyleSheet.absoluteFillObject}
        imageStyle={{width: '100%', height: '100%'}}/>
      <Image source={LEAVES_BOTTOM} resizeMode="stretch" pointerEvents="none"
        style={{position:'absolute',bottom:0,width:'100%',height:142,opacity:0.92}}/>
      {children}
    </View>
  );
}
export function Brand({small=false}) {
  return <Image accessible accessibilityLabel="EQT Reverse" source={BRAND_LOGO}
    resizeMode="contain" style={small?styles.smallLogo:styles.logo}/>;
}
export function AuthButton({title, onPress, secondary=false, icon}) {
  return <Pressable accessibilityRole="button" accessibilityLabel={title}
    onPress={onPress} style={({pressed})=>[
      secondary?styles.secondaryButton:styles.mainButton,
      {opacity:pressed?.82:1},
    ]}>
    <Text style={secondary?styles.secondaryTitle:styles.buttonTitle}>{title}</Text>
    {icon?<I name={icon} size={20} color={secondary?palette.blue:palette.white}/>:null}
  </Pressable>;
}
export function AuthField({label,value,onChangeText,placeholder,email=false,secure=false}) {
  const [visible,setVisible]=useState(false);
  return <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <View style={{position:'relative'}}>
      <TextInput style={[styles.input,secure&&{paddingRight:57}]}
        value={value} onChangeText={onChangeText} placeholder={placeholder}
        placeholderTextColor="#90A7BA" keyboardType={email?'email-address':'default'}
        autoCapitalize={email?'none':'sentences'}
        secureTextEntry={secure&&!visible} autoCorrect={!email&&!secure}
        autoComplete={email?'email':secure?'password':'off'}/>
      {secure?<Pressable accessibilityRole="button" accessibilityLabel={visible?'Ocultar senha':'Mostrar senha'}
        onPress={()=>setVisible(p=>!p)} style={s.showPassword}>
        <I name={visible?'eye-off-outline':'eye-outline'} size={21} color={palette.blue}/>
      </Pressable>:null}
    </View>
  </View>;
}
export function BackButton({onPress}) {
  return <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel="Voltar" style={styles.back}>
    <I name="arrow-left" size={22} color={palette.navy}/>
  </Pressable>;
}
const s=StyleSheet.create({showPassword:{height:53,width:52,justifyContent:'center',alignItems:'center',position:'absolute',right:0,top:0}});
