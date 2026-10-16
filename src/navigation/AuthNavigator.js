import React,{useState} from 'react';
import {useApp} from '../context/AppContext';
import {WelcomeCarouselScreen} from '../screens/auth/WelcomeCarouselScreen';
import {LoginScreen} from '../screens/auth/LoginScreen';
import {RegisterScreen} from '../screens/auth/RegisterScreen';
import {AvatarSelectionScreen} from '../screens/auth/AvatarSelectionScreen';

const INITIAL_FORM={name:'',email:'',password:'',confirm:'',sector:'Operações'};

/** Fluxo de entrada separado da navegação das áreas internas do aplicativo. */
export function AuthNavigator() {
  const [screen,setScreen]=useState('welcome');
  const [form,setForm]=useState(INITIAL_FORM);
  const {createDemoAccount}=useApp();

  const register=()=>setScreen('signup');
  if(screen==='welcome')return <WelcomeCarouselScreen onLogin={()=>setScreen('login')} onAdminLogin={()=>setScreen('adminLogin')} onSignup={register} onAdminLogin={()=>setScreen('adminLogin')} onCollaboratorLogin={()=>setScreen('login')}/>;
  if(screen==='login'||screen==='adminLogin')return <LoginScreen role={screen==='adminLogin'?'administrador':'colaborador'} onBack={()=>setScreen('welcome')} onSignup={register} onAdminLogin={()=>setScreen('adminLogin')} onCollaboratorLogin={()=>setScreen('login')}/>;
  if(screen==='signup')return <RegisterScreen form={form} setForm={setForm}
    onBack={()=>setScreen('login')} onContinue={()=>setScreen('avatar')}/>;
  if(screen==='avatar')return <AvatarSelectionScreen onBack={register}
    onFinish={selected=>createDemoAccount(form.name.trim(),form.email.trim().toLowerCase(),form.sector,selected)}/>;
  return null;
}
