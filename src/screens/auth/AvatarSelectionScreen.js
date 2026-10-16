import React, {useState} from 'react';
import {View,Text,Image,Pressable,ScrollView,StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthBackground,Brand,AuthButton,BackButton} from '../../components/auth/AuthElements';
import {SIGNUP_BACKGROUND,AVATARS} from '../../assets/kit';
import {authStyles as s,palette} from './authStyles';
import {I} from '../../components/UI';

export function AvatarSelectionScreen({onBack,onFinish}) {
  const [avatar,setAvatar]=useState(0);
  return <AuthBackground source={SIGNUP_BACKGROUND}>
    <StatusBar barStyle="dark-content"/>
    <SafeAreaView style={s.safe} edges={['top','bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[s.scroll,{paddingTop:7}]}>
        <View style={{position:'relative'}}><BackButton onPress={onBack}/><Brand small/></View>
        <Text style={s.title}>Escolha seu avatar</Text>
        <Text style={[s.desc,{marginTop:8,marginBottom:23}]}>
          Selecione um avatar que represente você nessa jornada de aprendizagem.
        </Text>
        <View style={[s.glass,{paddingHorizontal:13,paddingVertical:22}]}>
          <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around',gap:15}}>
            {AVATARS.map((source,index)=><Pressable key={index}
              accessibilityRole="button" accessibilityLabel={'Selecionar avatar '+(index+1)}
              accessibilityState={{selected:avatar===index}}
              onPress={()=>setAvatar(index)}
              style={{width:'21.5%',aspectRatio:1,borderRadius:48,backgroundColor:'#E8F6FD',
                borderWidth:3,borderColor:avatar===index?palette.green:'transparent',position:'relative'}}>
              <Image source={source} resizeMode="contain" style={{width:'100%',height:'100%'}}/>
              {avatar===index?<View style={{position:'absolute',right:-4,bottom:-3,width:23,height:23,
                borderRadius:15,backgroundColor:palette.green,borderWidth:2,borderColor:'white',alignItems:'center',justifyContent:'center'}}>
                <I name="check" size={14} color="white"/>
              </View>:null}
            </Pressable>)}
          </View>
          <View style={{height:27}}/>
          <AuthButton title="Começar minha jornada" onPress={()=>onFinish(avatar)} icon="arrow-right"/>
          <Pressable onPress={()=>onFinish(0)} style={{alignItems:'center',paddingTop:17}}>
            <Text style={{color:palette.blue,fontWeight:'600',fontSize:12}}>Pular por enquanto</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  </AuthBackground>;
}
