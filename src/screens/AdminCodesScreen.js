import React, { useRef, useState } from 'react';
import { View, Pressable, Alert, ActivityIndicator, StyleSheet, TextInput } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {encodeQr,SECTORS} from '../services/qrSector';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useApp } from '../context/AppContext';
import { C } from '../theme';
import { Screen } from './MainScreens';
import { Button, Card, IconBox, I, Label, PageHeader, Pill, SectionHeading } from '../components/UI';

const safeText = v => String(v).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

export function AdminCodesScreen({ navigate, back }) {
  const { account,allCategories } = useApp();
  if (account?.role !== 'administrador') {
    return <Screen><PageHeader title="Acesso restrito" back={back}/><Card><Label>Somente o perfil Administrador pode preparar etiquetas de QR Code.</Label></Card></Screen>;
  }
  return <Screen>
    <PageHeader title="QR Codes por categoria" subtitle="Administração • QR Codes por categoria e setor" back={back}/>
    <Card style={styles.hero}>
      <View style={styles.heroIcon}><I name="qrcode-plus" color={C.white} size={35}/></View>
      <Label size={21} bold style={styles.heroTitle}>Uma etiqueta para cada categoria e setor.</Label>
      <Label size={13} style={styles.heroText}>Selecione a categoria e o setor na próxima tela. Gere a etiqueta, imprima e fixe perto do ponto de triagem. O colaborador encontra orientações e desafios pelo scanner.</Label>
      <Pill text={allCategories.length + ' categorias disponíveis'} color="#215A9D" fg={C.white}/>
    </Card>
    <SectionHeading title="Gerar etiqueta"/><Button title="+ Adicionar categoria" icon="plus-circle" onPress={()=>navigate('addCategory')} style={{marginBottom:13}}/>
    {allCategories.map(cat => <Pressable
      key={cat.id}
      accessibilityRole="button"
      accessibilityLabel={'Gerar QR Code da categoria ' + cat.name}
      onPress={() => navigate('qrLabel', { id: cat.id })}
    >
      <Card style={styles.item}>
        <IconBox icon={cat.icon} color={cat.accent} size={51}/>
        <View style={{ flex: 1, gap: 3 }}>
          <Label bold size={15}>{cat.name}</Label>
          <Label muted size={11}>Categoria: {cat.id}</Label>
          <Label size={11} style={{ color: C.blue }}>Visualizar • Imprimir • Compartilhar PDF</Label>
        </View>
        <I name="chevron-right"/>
      </Card>
    </Pressable>)}
    <Card color={C.ice}>
      <Label bold size={14}>Como instalar</Label>
      <Label size={12} style={{ marginTop: 7 }}>Coloque cada etiqueta em uma placa protegida, visível e acessível, próxima à área sinalizada. Não instale onde seja necessário tocar em resíduos, partes energizadas ou equipamentos perigosos.</Label>
    </Card>
    <Card color={C.cream}>
      <Label bold size={13} style={{ color: '#8A621B' }}>Setor vinculado ao QR</Label>
      <Label size={12} style={{ marginTop: 6 }}>Cada etiqueta nova contém categoria e setor. Ainda assim, o QR não comprova localização exata nem destinação; confirme o ponto físico com a equipe.</Label>
    </Card>
  </Screen>;
}

export function QRLabelScreen({ id, back }) {
  const { account,allCategories } = useApp();
  const cat = allCategories.find(c=>c.id===id);
  const qrRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [sector,setSector] = useState(SECTORS[0]);
  const qrValue=cat?encodeQr(cat.id,sector,allCategories):'';
  if (account?.role !== 'administrador' || !cat) {
    return <Screen><PageHeader title="Etiqueta indisponível" back={back}/><Card><Label>Categoria inválida ou acesso não autorizado.</Label></Card></Screen>;
  }
  const getBase64 = () => new Promise((resolve, reject) => {
    if (!qrRef.current || typeof qrRef.current.toDataURL !== 'function') {
      reject(new Error('O QR Code ainda está carregando. Tente novamente.'));
      return;
    }
    try { qrRef.current.toDataURL(b64 => b64 ? resolve(b64) : reject(new Error('Imagem de QR não gerada'))); }
    catch (e) { reject(e); }
  });
  const makeHtml = base64 => `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/>
    <style>@page { size: A5; margin: 10mm; } body { font-family: Arial, sans-serif; margin:0; color:#142E50; }
    .wrap { border:3px solid #145FA7; border-radius:20px; padding:24px; text-align:center; }
    .head { background:#145FA7; color:white; padding:16px 5px; border-radius:12px; font-size:26px; font-weight:800; }
    h2 { font-size:23px; margin:18px 0 3px; } .desc {font-size:14px;color:#445872;line-height:1.45}
    img { display:block;margin:14px auto; width:210px;height:210px; }
    .note { font-size:13px; padding:12px;background:#EAF5FF;border-radius:12px; }
    .id { color:#667C92;font-size:11px;letter-spacing:1px;margin:9px 0 14px; }
    .foot {font-size:11px;margin-top:13px;color:#5B7088;line-height:1.4}
    </style></head><body><div class="wrap"><div class="head">EQT REVERSE</div>
    <h2>${safeText(cat.name)}</h2><p class="desc">Setor: ${safeText(sector)} • Orientação educativa</p>
    <img src="data:image/png;base64,${base64}" alt="QR Code ${safeText(cat.name)}" />
    <div class="id">${safeText(qrValue)}</div>
    <div class="note"><strong>APONTE A CÂMERA DO APLICATIVO</strong><br/>Identifique • Separe • Destine com consciência</div>
    <div class="foot">Fixar em local seguro, visível e próximo à triagem desta categoria.<br/>O QR abre orientações: não é comprovante de descarte.</div>
    </div></body></html>`;
  const print = async share => {
    if (busy) return;
    setBusy(true);
    try {
      const base64 = await getBase64();
      const html = makeHtml(base64);
      if (share) {
        const { uri } = await Print.printToFileAsync({ html });
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: 'Compartilhar etiqueta da categoria' });
        } else {
          Alert.alert('PDF criado', 'Compartilhamento indisponível neste dispositivo. Arquivo temporário: ' + uri);
        }
      } else {
        await Print.printAsync({ html });
      }
    } catch (err) {
      Alert.alert('Não foi possível gerar a etiqueta', err?.message || 'Tente novamente.');
    } finally { setBusy(false); }
  };
  return <Screen>
    <PageHeader title="Etiqueta para triagem" subtitle="Selecione o setor antes de gerar o QR" back={back}/>
    <Card color={C.ice}><Label bold size={14}>Setor da etiqueta</Label><View style={{flexDirection:'row',flexWrap:'wrap',gap:7,marginTop:9}}>{SECTORS.map(s=><Pressable key={s} onPress={()=>setSector(s)} style={{paddingHorizontal:10,paddingVertical:10,borderRadius:11,backgroundColor:sector===s?C.blue:C.white,borderWidth:1,borderColor:C.border}}><Label size={11} bold style={{color:sector===s?C.white:C.blue}}>{s}</Label></Pressable>)}</View></Card>
    <Card style={styles.labelCard}>
      <View style={styles.brand}><I name="recycle" color={C.white} size={24}/><Label bold size={18} style={{ color: C.white }}>EQT REVERSE</Label></View>
      <View style={{ alignItems: 'center', gap: 4, paddingTop: 17 }}>
        <Label bold size={22} style={{ textAlign: 'center' }}>{cat.name}</Label>
        <Label muted size={12}>Ponto educativo • Setor {sector}</Label>
      </View>
      <View style={styles.qrWrapper}>
        <QRCode value={qrValue} size={226} color={C.navy} backgroundColor={C.white} quietZone={8} getRef={ref => { qrRef.current = ref; }}/>
      </View>
      <Label muted size={12} style={{ textAlign: 'center', marginTop: 6 }}>{qrValue}</Label>
      <View style={styles.callout}><I name="cellphone-scan" color={C.blue}/><Label size={12} bold style={{ flex: 1, color: C.navy }}>Abra o aplicativo e escaneie para aprender como identificar, separar e encaminhar.</Label></View>
      <Label muted size={11} style={{ textAlign: 'center', marginTop: 8 }}>Fixar próximo à área correspondente, em local seguro e visível.</Label>
    </Card>
    {busy ? <ActivityIndicator color={C.blue} size="large" style={{ marginBottom: 10 }}/> : null}
    <Button title="Imprimir etiqueta" icon="printer-outline" disabled={busy} onPress={() => print(false)} style={{ marginBottom: 10 }}/>
    <Button title="Gerar e compartilhar PDF" icon="file-pdf-box" secondary disabled={busy} onPress={() => print(true)}/>
    <Card color={C.ice} style={{ marginTop: 14 }}><Label bold size={13}>Como funciona após o escaneamento?</Label>
      <Label size={12} style={{ marginTop: 6 }}>O colaborador abre a ficha da categoria, consulta os cuidados e pode estudar o conteúdo e responder desafios educativos.</Label>
    </Card>
    <Label muted size={11} style={{ marginBottom: 16 }}>Esta etiqueta não comprova que algum material foi coletado ou destinado. No MVP, os códigos de cada categoria, inclusive as novas, são gerados localmente.</Label>
  </Screen>;
}
const styles = StyleSheet.create({
  hero: { backgroundColor: C.navy, borderColor: C.navy, padding: 20 },
  heroIcon: { backgroundColor: '#20598E', width: 64, height: 64, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 13 },
  heroTitle: { color: C.white, marginBottom: 6 },
  heroText: { color: '#CFE8FF', lineHeight: 19, marginBottom: 15 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 13 },
  labelCard: { padding: 20, alignItems: 'center' },
  brand: { backgroundColor: C.blue, borderRadius: 12, width: '100%', paddingVertical: 13, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 9 },
  qrWrapper: { padding: 13, backgroundColor: C.white, borderRadius: 13, borderWidth: 1, borderColor: C.border, marginTop: 17 },
  callout: { marginTop: 16, padding: 13, backgroundColor: C.ice, borderRadius: 13, width: '100%', flexDirection: 'row', gap: 8, alignItems: 'center' }
});


/** Categorias cadastradas localmente para demonstrar o fluxo administrativo. */
export function AddCategoryScreen({back,navigate}) {
  const {account,addCategory}=useApp();
  const [draft,setDraft]=useState({name:'',identify:'',separate:'',destination:'',risk:''});
  if(account?.role!=='administrador')return <Screen><PageHeader title="Acesso restrito" back={back}/></Screen>;
  const fields=[['name','Nome da categoria','Ex.: Transformadores'],['identify','Como identificar','Características visuais e cuidados na identificação'],['separate','Como separar','Acondicionamento e área correta'],['destination','Destino correto','Fluxo autorizado de destinação'],['risk','Riscos / observações','Orientação de segurança (opcional)']];
  const submit=()=>{const result=addCategory(draft);if(!result.ok)return Alert.alert('Verifique a categoria',result.message);Alert.alert('Categoria cadastrada','A categoria foi adicionada ao catálogo local. Agora gere o QR Code por setor.',[{text:'Gerar QR Code',onPress:()=>navigate('qrLabel',{id:result.id})}]);};
  return <Screen><PageHeader title="Nova categoria" subtitle="Cadastro local para o MVP" back={back}/>
    <Card color={C.ice}><Label size={12}>Os destinos cadastrados aqui são exemplos demonstrativos; valide cada procedimento com a equipe responsável antes de usar em operação.</Label></Card>
    {fields.map(([key,title,placeholder])=><View key={key} style={{marginBottom:14}}><Label bold>{title}</Label><TextInput value={draft[key]} onChangeText={v=>setDraft(p=>({...p,[key]:v}))} placeholder={placeholder} multiline={key!=='name'} textAlignVertical="top" style={{marginTop:7,minHeight:key==='name'?50:82,padding:13,backgroundColor:C.white,borderRadius:14,borderWidth:1,borderColor:C.border,color:C.text}}/></View>)}
    <Button title="Salvar categoria" onPress={submit} icon="check-circle" style={{marginBottom:24}}/>
  </Screen>;
}
