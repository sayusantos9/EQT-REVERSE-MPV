import React from 'react';
import {View,Text,Pressable,ScrollView,KeyboardAvoidingView,Platform,Alert,StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthBackground,Brand,AuthField,AuthButton,BackButton} from '../../components/auth/AuthElements';
import {SIGNUP_BACKGROUND} from '../../assets/kit';
import {authStyles as s,palette} from './authStyles';
import {SECTORS} from './authConfig';

export function RegisterScreen({form,setForm,onBack,onContinue}) {
  const set=(key,value)=>setForm(current=>({...current,[key]:value}));
  const next=()=>{
    if(form.name.trim().length<3||!/^\S+@\S+\.\S+$/.test(form.email.trim())){
      Alert.alert('Dados incompletos','Informe seu nome completo e um e-mail válido.');return;
    }
    if(form.password.length<8||form.password!==form.confirm){
      Alert.alert('Confira as senhas','Use pelo menos oito caracteres e repita a mesma senha.');return;
    }
    onContinue();
  };
  return <AuthBackground source={SIGNUP_BACKGROUND}>
    <StatusBar barStyle="dark-content"/>
    <SafeAreaView style={s.safe} edges={['top','bottom']}>
      <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS==='ios'?'padding':undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}
          contentContainerStyle={[s.scroll,{paddingTop:9}]}>
          <View style={{position:'relative'}}><BackButton onPress={onBack}/><Brand small/></View>
          <Text style={[s.title,{marginTop:0}]}>Criar conta</Text>
          <Text style={[s.desc,{marginVertical:9,marginBottom:17}]}>
            Vamos começar sua jornada de aprendizado no EQT Reverse.
          </Text>
          <View style={s.glass}>
            <AuthField label="Nome completo" value={form.name} onChangeText={v=>set('name',v)} placeholder="Nome do colaborador"/>
            <AuthField label="E-mail corporativo" value={form.email} onChangeText={v=>set('email',v)} placeholder="seuemail@empresa.com" email/>
            <AuthField label="Senha" value={form.password} onChangeText={v=>set('password',v)} placeholder="Mínimo de 8 caracteres" secure/>
            <AuthField label="Confirmar senha" value={form.confirm} onChangeText={v=>set('confirm',v)} placeholder="Digite novamente a senha" secure/>
            <Text style={s.label}>Setor</Text>
            <View style={{flexDirection:'row',flexWrap:'wrap',gap:8,marginBottom:16}}>
              {SECTORS.map(sector=><Pressable key={sector} onPress={()=>set('sector',sector)}
                style={{paddingVertical:10,paddingHorizontal:12,borderRadius:13,
                  backgroundColor:form.sector===sector?palette.blue:'#E5F3FE'}}>
                <Text style={{fontSize:11,fontWeight:'700',color:form.sector===sector?'white':palette.navy}}>{sector}</Text>
              </Pressable>)}
            </View>
            <Text style={{fontSize:11,color:palette.secondary,lineHeight:17,marginBottom:16}}>
              Para o cadastro público, o perfil inicial é Colaborador. O administrador controla os acessos adicionais.
            </Text>
            <AuthButton title="Continuar" onPress={next} icon="arrow-right"/>
            <Pressable onPress={onBack} style={{alignItems:'center',paddingTop:18,paddingBottom:5}}>
              <Text style={{color:palette.blue,fontWeight:'600'}}>Já tenho conta · Entrar</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  </AuthBackground>;
}
