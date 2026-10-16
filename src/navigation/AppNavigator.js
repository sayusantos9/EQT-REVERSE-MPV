import React,{useEffect,useState} from 'react';
import {View,ActivityIndicator,StatusBar,StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useApp} from '../context/AppContext';
import {C} from '../theme';
import {AuthNavigator} from './AuthNavigator';
import {BottomTabs} from './BottomTabs';
import {canAccess} from './permissions';
import {Button,Card,Label,PageHeader} from '../components/UI';
import {HomeScreen,MissionsScreen,CollectionScreen} from '../screens/MainScreens';
import {ProfileScreen} from '../screens/ProfileScreen';
import {RankingScreen} from '../screens/RankingScreen';
import {LearningPathScreen} from '../screens/LearningPathScreen';
import {LessonLevelsScreen} from '../screens/LessonLevelsScreen';
import {ScanScreen,CategoryScreen} from '../screens/ScanScreens';
import {FlashcardsScreen,QuizScreen,SortingScreen} from '../screens/GameScreens';
import {AdminCodesScreen,QRLabelScreen,AddCategoryScreen} from '../screens/AdminCodesScreen';
import {AdminStaffScreen} from '../screens/AdminStaffScreen';
import {AdminDashboardScreen,AdminProfileScreen} from '../screens/AdminDashboardScreen';

const routes={
  learn:LearningPathScreen,lessonHub:LessonLevelsScreen,scan:ScanScreen,missions:MissionsScreen,category:CategoryScreen,
  flashcards:FlashcardsScreen,quiz:QuizScreen,sorting:SortingScreen,
  collection:CollectionScreen,ranking:RankingScreen,
  adminCodes:AdminCodesScreen,addCategory:AddCategoryScreen,
  qrLabel:QRLabelScreen,staff:AdminStaffScreen,
};

function AppContent() {
  const {account,loaded}=useApp();
  const [current,setCurrent]=useState({name:'home',params:{}});
  const [stack,setStack]=useState([]);

  useEffect(()=>{
    setCurrent({name:'home',params:{}});setStack([]);
  },[account?.email,account?.role]);

  const navigate=(name,params={})=>{
    setStack(items=>[...items,current].slice(-15));
    setCurrent({name,params});
  };
  const tab=name=>{if(!canAccess(account?.role,name))return;setStack([]);setCurrent({name,params:{}});};
  const back=()=>{
    if(stack.length===0){tab('home');return;}
    setCurrent(stack[stack.length-1]);setStack(items=>items.slice(0,-1));
  };

  if(!loaded)return <SafeAreaView style={s.loading}><ActivityIndicator size="large" color={C.blue}/></SafeAreaView>;
  if(!account)return <AuthNavigator/>;

  const admin=account.role==='administrador';
  const opts={navigate,tab,back,...current.params};
  let content;
  if(!canAccess(account.role,current.name)){
    content=<View style={s.restricted}>
      <PageHeader title="Acesso restrito" back={back}/>
      <Card><Label>Este perfil não tem permissão para acessar essa área.</Label></Card>
      <Button title="Voltar ao início" onPress={()=>tab('home')}/>
    </View>;
  }else if(current.name==='home'){
    content=admin?<AdminDashboardScreen {...opts}/>:<HomeScreen {...opts}/>;
  }else if(current.name==='profile'){
    content=admin?<AdminProfileScreen {...opts}/>:<ProfileScreen {...opts}/>;
  }else{
    const Screen=routes[current.name];
    content=Screen?<Screen {...opts}/>:admin?<AdminDashboardScreen {...opts}/>:<HomeScreen {...opts}/>;
  }
  return <SafeAreaView style={s.safe} edges={['top','left','right','bottom']}>
    <StatusBar barStyle="dark-content" backgroundColor={C.white}/>
    <View style={{flex:1}} key={current.name+(current.params?.id||'')}>{content}</View>
    <BottomTabs role={account.role} page={current.name} onTab={tab}/>
  </SafeAreaView>;
}
export const AppNavigator=AppContent;
const s=StyleSheet.create({
  safe:{flex:1,backgroundColor:C.white},
  loading:{flex:1,justifyContent:'center',alignItems:'center'},
  restricted:{padding:22,flex:1,backgroundColor:C.bg},
});
