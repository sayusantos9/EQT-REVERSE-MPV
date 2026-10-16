import React from 'react';
import {View,Image,ImageBackground,Pressable} from 'react-native';
import {Screen} from './MainScreens';
import {useApp} from '../context/AppContext';
import {C} from '../theme';
import {ADMIN_BACKGROUND,AVATARS,TROPHIES} from '../assets/kit';
import {Label,Card,I,IconBox,SectionHeading,Pill,Button} from '../components/UI';
export function AdminDashboardScreen({navigate}){
 const {account,people,data,allCategories}=useApp();
 const actions=[{title:'Gerar QR Codes',desc:'Etiquetas por categoria e setor',icon:'qrcode-plus',page:'adminCodes'},{title:'Nova categoria',desc:'Cadastrar tipo de material',icon:'plus-circle',page:'addCategory'},{title:'Colaboradores',desc:'Consultar e cadastrar pessoas',icon:'account-group-outline',page:'staff'},{title:'Ranking',desc:'Resultados educativos por setor',icon:'podium-gold',page:'ranking'},{title:'Ler QR Code',desc:'Consultar etiquetas',icon:'qrcode-scan',page:'scan'}];
 return <Screen><ImageBackground source={ADMIN_BACKGROUND} resizeMode="cover" style={{marginHorizontal:-18,marginTop:-16,padding:22,paddingTop:31,height:197,justifyContent:'center'}}>
 <View style={{flexDirection:'row',alignItems:'center',gap:13}}><Image source={AVATARS[account.avatar||0]} style={{height:71,width:71}}/><View style={{flex:1}}><Label bold size={24} style={{color:C.white}}>Olá, {account.name.split(' ')[0]}</Label><Label size={13} style={{color:C.white}}>Painel do administrador</Label></View></View>
 </ImageBackground><Card color={C.ice}><Label bold size={18}>Gerenciamento de logística reversa</Label><Label muted size={12} style={{marginTop:5}}>Etiquetas por setor, acesso aos colaboradores e indicadores. Missões e minijogos não aparecem neste perfil.</Label></Card>
 <SectionHeading title="Acessos principais"/><View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>{actions.map((a,i)=><Pressable key={a.title} accessibilityRole="button" onPress={()=>navigate(a.page)} style={{width:'48.5%',backgroundColor:C.white,borderRadius:18,borderWidth:1,borderColor:C.border,alignItems:'center',paddingVertical:22,paddingHorizontal:8,marginBottom:13,minHeight:160}}><IconBox icon={a.icon} tint={i%2===0?C.ice:C.mint} size={61}/><Label bold size={13} style={{textAlign:'center',marginTop:10}}>{a.title}</Label><Label muted size={10} style={{textAlign:'center',marginTop:4}}>{a.desc}</Label></Pressable>)}</View>
 <SectionHeading title="Visão geral"/><View style={{flexDirection:'row',gap:8,marginBottom:13}}><Card style={{flex:1,alignItems:'center'}}><Label bold size={22}>{data.scans.length}</Label><Label muted size={11}>QR lidos</Label></Card><Card style={{flex:1,alignItems:'center'}}><Label bold size={22}>{people.length}</Label><Label muted size={11}>Colaboradores</Label></Card><Card style={{flex:1,alignItems:"center"}}><Label bold size={22}>{allCategories.length}</Label><Label muted size={11}>Categorias</Label></Card></View>
 <Card color={C.lavender}><Label size={11}>Painel demonstrativo local. Não representa dados reais da empresa nem comprovação de descarte final.</Label></Card></Screen>;
}

export function AdminProfileScreen({navigate}){
 const {account,people,logout}=useApp();
 return <Screen><ImageBackground source={ADMIN_BACKGROUND} resizeMode="cover" style={{marginHorizontal:-18,marginTop:-16,height:177,padding:19,justifyContent:'center'}}><View style={{flexDirection:'row',alignItems:'center',gap:13}}><Image source={AVATARS[account.avatar||0]} style={{width:81,height:81}}/><View><Label bold size={22} style={{color:C.white}}>{account.name}</Label><Label size={12} style={{color:C.white}}>Perfil Administrador • {account.sector}</Label></View></View></ImageBackground>
 <Card color={C.ice}><Label bold>Permissões administrativas</Label><Label size={12} style={{marginTop:7}}>Scanner de QR e materiais, etiquetas, categorias, colaboradores e ranking educativo. Missões e recompensas educacionais não fazem parte deste perfil.</Label></Card>
 <SectionHeading title="Conta e equipe"/><Pressable onPress={()=>navigate('staff')}><Card><Label bold>Gerenciar colaboradores</Label><Label muted size={12}>{people.length} cadastros locais de demonstração</Label></Card></Pressable>
 <Pressable onPress={()=>navigate('addCategory')}><Card><Label bold>Adicionar categoria</Label><Label muted size={12}>Cadastrar material e destino demonstrativo</Label></Card></Pressable>
 <Pressable onPress={()=>navigate('adminCodes')}><Card><Label bold>Etiquetas por setor</Label><Label muted size={12}>Gerar QR Code para sinalização da triagem</Label></Card></Pressable>
 <Pressable onPress={()=>navigate('ranking')}><Card><Label bold>Ranking educacional</Label><Label muted size={12}>Visualizar desempenho por setor</Label></Card></Pressable>
 <Button title="Sair" icon="logout" secondary onPress={logout}/>
 <Label muted size={11} style={{textAlign:'center',marginTop:14}}>Acesso somente demonstrativo. Um servidor de autenticação é necessário em produção.</Label>
 </Screen>;
}
