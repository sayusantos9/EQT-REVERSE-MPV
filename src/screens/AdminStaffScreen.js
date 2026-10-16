import React,{useState} from 'react';
import {View,TextInput,Pressable,Alert} from 'react-native';
import {useApp} from '../context/AppContext';
import {Screen} from './MainScreens';
import {C} from '../theme';
import {Card,Button,Label,PageHeader,Pill,I} from '../components/UI';
import {SECTORS} from '../services/qrSector';
const ROLES=[{id:'colaborador',name:'Colaborador'}];
const inp={backgroundColor:C.white,borderColor:C.border,borderWidth:1,borderRadius:13,padding:13,marginTop:7,marginBottom:16,color:C.text};
export function AdminStaffScreen({back}){
 const {account,people,adminAddPerson}=useApp(); const [show,setShow]=useState(false),[name,setName]=useState(''),[email,setEmail]=useState(''),[role,setRole]=useState('colaborador'),[sector,setSector]=useState(SECTORS[0]);
 if(account?.role!=='administrador')return <Screen><PageHeader title="Acesso restrito" back={back}/><Card><Label>Somente administradores podem cadastrar colaboradores.</Label></Card></Screen>;
 const submit=()=>{if(adminAddPerson({name,email,role,sector})){Alert.alert('Cadastro de demonstração','Colaborador adicionado à lista local. O convite por e-mail ainda não é enviado no MVP.');setName('');setEmail('');setShow(false);}else Alert.alert('Verifique os dados','Preencha um nome e um e-mail válido.');};
 return <Screen><PageHeader title="Colaboradores" subtitle="Cadastros e permissões · acesso administrativo" back={back}/>
 <Card color={C.ice}><Label size={12}>Os perfis cadastrados aqui são dados locais demonstrativos; um backend com autenticação e papéis será necessário em produção.</Label></Card>
 <Button title={show?'Fechar cadastro':'+ Cadastrar colaborador'} icon="account-plus-outline" onPress={()=>setShow(v=>!v)} style={{marginBottom:17}}/>
 {show?<Card><Label bold>Nome completo</Label><TextInput placeholder="Nome do colaborador" style={inp} value={name} onChangeText={setName}/>
 <Label bold>E-mail corporativo</Label><TextInput placeholder="nome@empresa.com" style={inp} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address"/>
 <Label bold>Permissão</Label><View style={{flexDirection:'row',flexWrap:'wrap',gap:8,marginVertical:12}}>{ROLES.map(r=><Pressable key={r.id} onPress={()=>setRole(r.id)} style={{backgroundColor:role===r.id?C.blue:C.ice,padding:12,borderRadius:12}}><Label size={12} style={{color:role===r.id?C.white:C.blue}}>{r.name}</Label></Pressable>)}</View>
 <Label bold>Setor</Label><View style={{flexDirection:'row',flexWrap:'wrap',gap:8,marginVertical:12}}>{SECTORS.map(s=><Pressable key={s} onPress={()=>setSector(s)} style={{backgroundColor:sector===s?C.green:C.ice,padding:10,borderRadius:10}}><Label size={11} style={{color:sector===s?C.white:C.blue}}>{s}</Label></Pressable>)}</View>
 <Button title="Salvar cadastro de demonstração" onPress={submit}/></Card>:null}
 <Label bold size={19} style={{marginVertical:13}}>Equipe cadastrada</Label>
 {people.length?people.map((person,i)=><Card key={person.email+'-'+i}><View style={{flexDirection:'row',justifyContent:'space-between'}}><View style={{flex:1}}><Label bold>{person.name}</Label><Label muted size={12}>{person.email}</Label><Label size={12}>{person.sector}</Label></View><Pill text={ROLES.find(r=>r.id===person.role)?.name||person.role}/></View></Card>):<Card><Label muted>Não há colaboradores novos cadastrados. Use o botão acima para adicionar um acesso demonstrativo.</Label></Card>}
 </Screen>;
}
