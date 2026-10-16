import React, {useState} from 'react';
import {View,Text,Pressable,ScrollView,KeyboardAvoidingView,Platform,Alert,StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useApp} from '../../context/AppContext';
import {AuthBackground,Brand,AuthField,AuthButton,BackButton} from '../../components/auth/AuthElements';
import {authStyles as s,palette} from './authStyles';
import {DEMO_ACCOUNTS} from './authConfig';

/** Portas de entrada distintas para os dois perfis demonstrativos. */
export function LoginScreen({role='colaborador',onBack,onSignup,onAdminLogin,onCollaboratorLogin}) {
  const {signIn,people}=useApp();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [showDemo,setShowDemo]=useState(false);
  const admin=role==='administrador';
  const login=()=>{
    if(!/^\S+@\S+\.\S+$/.test(email.trim())||password.length<4){Alert.alert('Verifique os dados','Informe e-mail válido e senha de demonstração (mínimo 4 caracteres).');return;}
    const person=[...people,...DEMO_ACCOUNTS].find(p=>p.email.toLowerCase()===email.trim().toLowerCase()&&p.role===role);
    if(!person){Alert.alert('Acesso não encontrado',admin?'Use o acesso demonstrativo de administrador.':'Crie uma conta de colaborador ou use o acesso de demonstração.');return;}
    signIn(person.name,person.email,role,person.sector,person.avatar||0);
  };
  const demo=DEMO_ACCOUNTS.find(p=>p.role===role);
  return <AuthBackground><StatusBar barStyle="dark-content"/>
    <SafeAreaView style={s.safe} edges={['top','bottom']}>
      <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS==='ios'?'padding':undefined}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={[s.scroll,{paddingTop:12}]}>
          <View style={{position:'relative',alignItems:'center'}}><BackButton onPress={onBack}/><Brand/>
            <Text style={[s.title,{marginTop:-7}]}>{admin?'Acesso administrativo':'Bem-vindo(a)!'}</Text>
            <Text style={[s.desc,{marginTop:8,marginBottom:24}]}>{admin?'Gerencie QR Codes, categorias, colaboradores e ranking.':'Acesse e continue sua jornada de aprendizagem.'}</Text>
          </View>
          <View style={[s.glass,{paddingTop:22,paddingBottom:20}]}>
            <AuthField label="E-mail corporativo" placeholder="nome@equatorial.com.br" value={email} onChangeText={setEmail} email/>
            <AuthField label="Senha" placeholder="Sua senha" value={password} onChangeText={setPassword} secure/>
            <AuthButton title={admin?'Entrar como administrador':'Entrar'} onPress={login} icon="arrow-right"/>
            {!admin?<><Pressable onPress={()=>Alert.alert('MVP demonstrativo','Recuperação de senha depende de autenticação em servidor.')} style={{alignItems:'center',paddingVertical:14}}><Text style={{color:palette.blue,fontSize:13}}>Esqueci minha senha</Text></Pressable>
              <View style={{flexDirection:'row',alignItems:'center',gap:11,marginBottom:14}}><View style={{height:1,backgroundColor:palette.line,flex:1}}/><Text style={{color:palette.secondary}}>ou</Text><View style={{height:1,backgroundColor:palette.line,flex:1}}/></View>
              <AuthButton title="Criar minha conta" secondary onPress={onSignup}/></>:null}
          </View>
          <Pressable onPress={()=>setShowDemo(v=>!v)} accessibilityRole="button" style={{alignItems:'center',paddingVertical:17}}><Text style={{color:palette.ocean,fontWeight:'700'}}>Acesso de demonstração {showDemo?'▲':'▼'}</Text></Pressable>
          {showDemo?<Pressable accessibilityRole="button" onPress={()=>signIn(demo.name,demo.email,demo.role,demo.sector,demo.avatar)} style={{padding:18,borderRadius:18,backgroundColor:'#E5F4FE',borderWidth:1,borderColor:palette.line,alignItems:'center'}}><Text style={{fontSize:15,fontWeight:'700',color:palette.navy}}>Entrar no perfil {admin?'Administrador':'Colaborador'}</Text><Text style={{fontSize:12,marginTop:5,color:palette.secondary}}>Somente para demonstrar o MVP</Text></Pressable>:null}
          <Pressable onPress={admin?onCollaboratorLogin:onAdminLogin} accessibilityRole="button" style={{padding:13,alignItems:'center'}}><Text style={{color:palette.blue,fontWeight:'700',fontSize:13}}>{admin?'Acessar como colaborador':'Acesso do administrador'}</Text></Pressable>
          <Pressable onPress={onBack} style={{padding:14,alignItems:'center'}}><Text style={{color:palette.navy,fontSize:12}}>← Voltar à apresentação</Text></Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  </AuthBackground>;
}
