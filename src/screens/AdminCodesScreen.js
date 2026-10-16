import React, { useRef, useState } from 'react';
import { View, Pressable, Alert, ActivityIndicator, StyleSheet, TextInput, Platform } from 'react-native';
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
  const { account, allCategories, labelConfigs, saveLabelConfig } = useApp();
  const cat = allCategories.find(c=>c.id===id);
  const qrRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [sector,setSector] = useState(SECTORS[0]);
  const saved = labelConfigs?.[id] || {};
  const [model, setModel] = useState(saved.model || 'cable_flag'); // 'cable_flag' ou 'standard_box'
  const [flagWidth, setFlagWidth] = useState(String(saved.flagWidth || '1.2'));
  const [flagTopHeight, setFlagTopHeight] = useState(String(saved.flagTopHeight || '3.7'));
  const [flagBottomHeight, setFlagBottomHeight] = useState(String(saved.flagBottomHeight || '3.7'));
  const [tailLength, setTailLength] = useState(String(saved.tailLength || '3.5'));
  const [tailWidth, setTailWidth] = useState(String(saved.tailWidth || '0.7'));
  const [boxWidth, setBoxWidth] = useState(String(saved.boxWidth || '8.0'));
  const [boxHeight, setBoxHeight] = useState(String(saved.boxHeight || '8.0'));
  const [copies, setCopies] = useState(saved.model === 'standard_box' ? 4 : 12);

  const handleSaveConfig = () => {
    saveLabelConfig(id, { model, flagWidth, flagTopHeight, flagBottomHeight, tailLength, tailWidth, boxWidth, boxHeight });
    Alert.alert('Medidas salvas', `O modelo e as medidas para ${cat?.name || 'esta categoria'} foram salvos com sucesso!`);
  };

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

  const makeHtml = base64 => {
    const numCopies = Math.min(Math.max(1, parseInt(copies) || 1), 60);

    if (model === 'cable_flag') {
      const singleFlag = `
        <div class="cut-wrapper">
          <div class="tag-flag">
            <div class="part-top">
              <span class="text-cabo">${safeText(cat.name)}</span>
              <span class="text-sector">Setor ${safeText(sector)}</span>
            </div>
            <div class="part-bottom">
              <img src="data:image/png;base64,${base64}" style="width: 0.9cm; height: 0.9cm; display:block;" />
              <span style="font-size: 6px; margin-top: 1px;">EQT REVERSE</span>
            </div>
          </div>
          <div class="tag-tail"></div>
        </div>`;
      const flagsHtml = Array.from({ length: numCopies }).map(() => singleFlag).join('');

      return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/>
      <style>
        @page { size: A4 portrait; margin: 8mm; }
        * { box-sizing: border-box; }
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; color: #111; }
        .instructions { font-size: 11px; color: #444; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid #ddd; }
        .sheet {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 3mm 4mm;
          align-items: flex-start;
        }
        .cut-wrapper {
          border: 1px dashed #bbb;
          padding: 1.5mm;
          border-radius: 4px;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          background: #fafafa;
          page-break-inside: avoid;
        }
        .tag-flag {
          width: ${flagWidth}cm;
          background: #FFE800;
          border: 1px solid #C4B000;
          border-radius: 3px;
          margin: 0 auto;
          text-align: center;
        }
        .part-top {
          height: ${flagTopHeight}cm;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          border-bottom: 1px dashed #666;
          padding: 1mm;
          overflow: hidden;
        }
        .part-bottom {
          height: ${flagBottomHeight}cm;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1mm;
          overflow: hidden;
        }
        .tag-tail {
          width: ${tailWidth}cm;
          height: ${tailLength}cm;
          background: #FFE800;
          margin: 0 auto;
          border-left: 1px solid #C4B000;
          border-right: 1px solid #C4B000;
          border-bottom: 1px solid #C4B000;
          border-radius: 0 0 3px 3px;
        }
        .text-cabo {
          font-size: 8px;
          font-weight: bold;
          text-transform: uppercase;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          letter-spacing: 0.5px;
          max-height: calc(${flagTopHeight}cm - 3mm);
          white-space: nowrap;
        }
        .text-sector {
          font-size: 6px;
          color: #333;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          margin-left: 2px;
          white-space: nowrap;
        }
      </style></head><body>
        <div class="instructions">
          <strong>EQT REVERSE — Lote de Abraçadeiras para Cabos (${safeText(cat.name)})</strong> • Setor: ${safeText(sector)} • ${numCopies} etiqueta(s) na folha A4 com guias de corte.
        </div>
        <div class="sheet">
          ${flagsHtml}
        </div>
      </body></html>`;
    }

    const singleBox = `
      <div class="box-tag">
        <div class="head">EQT REVERSE</div>
        <h2>${safeText(cat.name)}</h2>
        <p class="desc">Setor: ${safeText(sector)} • Ponto de Coleta</p>
        <img src="data:image/png;base64,${base64}" alt="QR Code" />
        <div class="note"><strong>APONTE A CÂMERA DO APP</strong><br/>Identifique • Separe • Destine</div>
      </div>`;
    const boxesHtml = Array.from({ length: numCopies }).map(() => singleBox).join('');

    return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/>
      <style>
        @page { size: A4 portrait; margin: 8mm; }
        * { box-sizing: border-box; }
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; color: #142E50; }
        .instructions { font-size: 11px; color: #444; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid #ddd; }
        .sheet {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 4mm;
          align-items: flex-start;
        }
        .box-tag {
          width: ${boxWidth}cm;
          height: ${boxHeight}cm;
          border: 2px dashed #145FA7;
          border-radius: 12px;
          padding: 8px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          background: #fff;
          page-break-inside: avoid;
        }
        .head { background:#145FA7; color:white; width: 100%; padding:4px; border-radius:6px; font-size:12px; font-weight:800; }
        h2 { font-size:14px; margin:4px 0 2px; }
        .desc { font-size:10px; color:#445872; margin: 1px 0; }
        img { display:block; margin:2px auto; max-width: 55%; max-height: 40%; object-fit: contain; }
        .note { font-size:8px; padding:4px; background:#EAF5FF; border-radius:6px; width: 100%; }
      </style></head><body>
      <div class="instructions">
        <strong>EQT REVERSE — Lote de Etiquetas (${safeText(cat.name)})</strong> • Setor: ${safeText(sector)} • ${numCopies} etiqueta(s) na folha A4 com guias de corte.
      </div>
      <div class="sheet">
        ${boxesHtml}
      </div></body></html>`;
  };

  const print = async share => {
    if (busy) return;
    setBusy(true);
    try {
      const base64 = await getBase64();
      const html = makeHtml(base64);

      if (Platform.OS === 'web') {
        const printWin = typeof window !== 'undefined' ? window.open('', '_blank') : null;
        if (printWin) {
          printWin.document.open();
          printWin.document.write(html);
          printWin.document.close();
          printWin.focus();
          setTimeout(() => {
            try { printWin.print(); } catch (e) {}
          }, 350);
          return;
        }
      }

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
    <Card style={{ marginBottom: 14 }}>
      <Label bold size={14}>Modelo e Medidas da Etiqueta</Label>
      <Label size={11} muted style={{ marginTop: 2, marginBottom: 10 }}>Escolha o formato adequado para o tipo de resíduo.</Label>
      
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 14 }}>
        <Pressable onPress={() => { setModel('cable_flag'); setCopies(12); }} style={{ flex: 1, padding: 10, borderRadius: 10, backgroundColor: model === 'cable_flag' ? C.blue : C.ice, alignItems: 'center', borderWidth: 1, borderColor: model === 'cable_flag' ? C.blue : C.border }}>
          <Label bold size={12} style={{ color: model === 'cable_flag' ? C.white : C.navy }}>🏷️ Bandeira / Cabo</Label>
        </Pressable>
        <Pressable onPress={() => { setModel('standard_box'); setCopies(4); }} style={{ flex: 1, padding: 10, borderRadius: 10, backgroundColor: model === 'standard_box' ? C.blue : C.ice, alignItems: 'center', borderWidth: 1, borderColor: model === 'standard_box' ? C.blue : C.border }}>
          <Label bold size={12} style={{ color: model === 'standard_box' ? C.white : C.navy }}>📦 Quadrada / Caixa</Label>
        </Pressable>
      </View>

      {model === 'cable_flag' ? (
        <View style={{ gap: 8 }}>
          <Label size={11} bold style={{ color: C.blue }}>Medidas da Abraçadeira de Cabo (cm):</Label>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={{ flex: 1 }}><Label size={11} muted>Largura (cm)</Label><TextInput value={flagWidth} onChangeText={setFlagWidth} keyboardType="numeric" style={{ borderWidth: 1, borderColor: C.border, borderRadius: 8, padding: 8, backgroundColor: C.white, marginTop: 4 }}/></View>
            <View style={{ flex: 1 }}><Label size={11} muted>Altura Topo (cm)</Label><TextInput value={flagTopHeight} onChangeText={setFlagTopHeight} keyboardType="numeric" style={{ borderWidth: 1, borderColor: C.border, borderRadius: 8, padding: 8, backgroundColor: C.white, marginTop: 4 }}/></View>
            <View style={{ flex: 1 }}><Label size={11} muted>Altura Base (cm)</Label><TextInput value={flagBottomHeight} onChangeText={setFlagBottomHeight} keyboardType="numeric" style={{ borderWidth: 1, borderColor: C.border, borderRadius: 8, padding: 8, backgroundColor: C.white, marginTop: 4 }}/></View>
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={{ flex: 1 }}><Label size={11} muted>Comprim. Cauda (cm)</Label><TextInput value={tailLength} onChangeText={setTailLength} keyboardType="numeric" style={{ borderWidth: 1, borderColor: C.border, borderRadius: 8, padding: 8, backgroundColor: C.white, marginTop: 4 }}/></View>
            <View style={{ flex: 1 }}><Label size={11} muted>Largura Cauda (cm)</Label><TextInput value={tailWidth} onChangeText={setTailWidth} keyboardType="numeric" style={{ borderWidth: 1, borderColor: C.border, borderRadius: 8, padding: 8, backgroundColor: C.white, marginTop: 4 }}/></View>
          </View>
        </View>
      ) : (
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ flex: 1 }}><Label size={11} muted>Largura (cm)</Label><TextInput value={boxWidth} onChangeText={setBoxWidth} keyboardType="numeric" style={{ borderWidth: 1, borderColor: C.border, borderRadius: 8, padding: 8, backgroundColor: C.white, marginTop: 4 }}/></View>
          <View style={{ flex: 1 }}><Label size={11} muted>Altura (cm)</Label><TextInput value={boxHeight} onChangeText={setBoxHeight} keyboardType="numeric" style={{ borderWidth: 1, borderColor: C.border, borderRadius: 8, padding: 8, backgroundColor: C.white, marginTop: 4 }}/></View>
        </View>
      )}

      <Button title="Salvar formato desta categoria" secondary icon="content-save-outline" onPress={handleSaveConfig} style={{ marginTop: 14 }}/>
    </Card>

    {model === 'cable_flag' ? (
      <Card style={{ padding: 18, alignItems: 'center', backgroundColor: '#F8F9FA' }}>
        <Label bold size={13} style={{ color: C.navy, marginBottom: 4 }}>Pré-visualização da Etiqueta de Cabo</Label>
        <Label size={11} muted style={{ marginBottom: 16 }}>Texto longitudinal e vinco tracejado de dobra</Label>
        
        {/* Silhueta da Etiqueta de Cabo */}
        <View style={{ width: 140, backgroundColor: '#FFE800', borderWidth: 1.5, borderColor: '#C4B000', borderRadius: 8, alignItems: 'center', overflow: 'hidden' }}>
          {/* Parte superior (3.7cm) com texto na vertical */}
          <View style={{ width: '100%', height: 110, paddingVertical: 8, paddingHorizontal: 6, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1.5, borderBottomColor: '#777', borderStyle: 'dashed', position: 'relative' }}>
            <Label size={8} muted style={{ position: 'absolute', top: 4 }}>▲ Dobra ({flagTopHeight}cm)</Label>
            <View style={{ transform: [{ rotate: '-90deg' }], alignItems: 'center', width: 95 }}>
              <Label bold size={11} style={{ color: '#111', textAlign: 'center', textTransform: 'uppercase' }} numberOfLines={1}>{cat.name}</Label>
              <Label size={8} style={{ color: '#333' }}>Setor {sector}</Label>
            </View>
          </View>
          {/* Parte inferior (3.7cm) */}
          <View style={{ width: '100%', paddingVertical: 12, alignItems: 'center' }}>
            <Label size={8} muted style={{ marginBottom: 4 }}>▼ Leitura ({flagBottomHeight}cm)</Label>
            <QRCode value={qrValue} size={100} color="#111" backgroundColor="#FFE800" quietZone={4} getRef={ref => { qrRef.current = ref; }}/>
            <Label bold size={9} style={{ color: '#111', marginTop: 4 }}>EQT REVERSE</Label>
          </View>
        </View>
        {/* Haste / Cauda (3.5cm x 0.7cm) */}
        <View style={{ width: 34, height: 60, backgroundColor: '#FFE800', borderWidth: 1.5, borderTopWidth: 0, borderColor: '#C4B000', borderBottomLeftRadius: 6, borderBottomRightRadius: 6, alignItems: 'center', justifyContent: 'center' }}>
          <Label size={8} style={{ color: '#887400', transform: [{ rotate: '90deg' }] }}>{tailLength}cm</Label>
        </View>

        <Label muted size={11} style={{ textAlign: 'center', marginTop: 12 }}>Dimensões totais: {flagWidth}cm larg. × {Number(flagTopHeight || 0) + Number(flagBottomHeight || 0) + Number(tailLength || 0)}cm comp.</Label>
      </Card>
    ) : (
      <Card style={styles.labelCard}>
        <View style={styles.brand}><I name="recycle" color={C.white} size={24}/><Label bold size={18} style={{ color: C.white }}>EQT REVERSE</Label></View>
        <View style={{ alignItems: 'center', gap: 4, paddingTop: 17 }}>
          <Label bold size={22} style={{ textAlign: 'center' }}>{cat.name}</Label>
          <Label muted size={12}>Ponto educativo • Setor {sector}</Label>
          <Pill text={`${boxWidth}cm × ${boxHeight}cm`} color={C.ice} fg={C.blue} style={{ marginTop: 4 }}/>
        </View>
        <View style={styles.qrWrapper}>
          <QRCode value={qrValue} size={200} color={C.navy} backgroundColor={C.white} quietZone={8} getRef={ref => { qrRef.current = ref; }}/>
        </View>
        <Label muted size={12} style={{ textAlign: 'center', marginTop: 6 }}>{qrValue}</Label>
        <View style={styles.callout}><I name="cellphone-scan" color={C.blue}/><Label size={12} bold style={{ flex: 1, color: C.navy }}>Abra o aplicativo e escaneie para aprender como identificar, separar e encaminhar.</Label></View>
        <Label muted size={11} style={{ textAlign: 'center', marginTop: 8 }}>Fixar próximo à área correspondente, em local seguro e visível.</Label>
      </Card>
    )}

    {/* Seletor de Quantidade de Cópias para Impressão em Lote */}
    <Card style={{ marginTop: 14, marginBottom: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <View style={{ flex: 1, paddingRight: 8 }}>
          <Label bold size={13}>Quantidade de cópias (Folha A4)</Label>
          <Label size={11} muted>Gera uma folha com várias etiquetas e guias de corte.</Label>
        </View>
        <TextInput
          value={String(copies)}
          onChangeText={v => setCopies(Math.max(1, parseInt(v.replace(/\D/g, '')) || 1))}
          keyboardType="numeric"
          style={{ width: 50, textAlign: 'center', fontWeight: 'bold', borderWidth: 1, borderColor: C.blue, borderRadius: 8, padding: 6, backgroundColor: C.white }}
        />
      </View>
      <View style={{ flexDirection: 'row', gap: 6 }}>
        {(model === 'cable_flag' ? [1, 6, 12, 18, 24] : [1, 2, 4, 6]).map(q => (
          <Pressable
            key={q}
            onPress={() => setCopies(q)}
            style={{
              flex: 1,
              paddingVertical: 7,
              borderRadius: 8,
              backgroundColor: copies === q ? C.blue : C.ice,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: copies === q ? C.blue : C.border
            }}
          >
            <Label bold size={11} style={{ color: copies === q ? C.white : C.navy }}>{q}x</Label>
          </Pressable>
        ))}
      </View>
    </Card>

    {busy ? <ActivityIndicator color={C.blue} size="large" style={{ marginBottom: 10 }}/> : null}
    <Button title={`Imprimir ${copies} etiqueta${copies > 1 ? 's' : ''} em lote (A4)`} icon="printer-outline" disabled={busy} onPress={() => print(false)} style={{ marginBottom: 10 }}/>
    <Button title={`Gerar PDF (${copies} etiqueta${copies > 1 ? 's' : ''})`} icon="file-pdf-box" secondary disabled={busy} onPress={() => print(true)}/>
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
