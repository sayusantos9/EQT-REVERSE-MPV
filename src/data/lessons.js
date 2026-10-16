/**
 * Banco educativo offline de demonstração. Quatro níveis por categoria, com quatro
 * atividades curtas por nível. Uma alternativa correta em cada questão.
 * Procedimentos internos e endereços reais de destinação precisam de validação.
 */
import {CATEGORIES} from './catalog';

export const LESSON_STAGES=[
  {id:1,title:'Reconhecer',subtitle:'Identifique o material',icon:'magnify'},
  {id:2,title:'Separar',subtitle:'Pratique a triagem',icon:'recycle'},
  {id:3,title:'Destinar',subtitle:'Escolha o encaminhamento',icon:'truck-check-outline'},
  {id:4,title:'Agir com segurança',subtitle:'Evite riscos no trabalho',icon:'shield-check'},
];

const DETAILS={
 CABOS:{trait:'Fios condutores com isolamento e possíveis núcleos metálicos',separate:'Reservar cabos em área de triagem identificada',destination:'Triagem antes de reuso ou reciclagem autorizada',risk:'Não tocar em cabo possivelmente energizado',unsafe:'Cortar um cabo sem verificar riscos'},
 LAMPADAS:{trait:'Identificar se a lâmpada é fluorescente ou LED',separate:'Preservar lâmpadas intactas em embalagem adequada',destination:'Fluorescentes para coleta e tratamento especializado',risk:'Evitar quebra e acionar orientação se houver acidente',unsafe:'Quebrar lâmpada fluorescente para ocupar menos espaço'},
 BATERIAS:{trait:'Verificar tipo, integridade e sinais de vazamento',separate:'Separar baterias por tipo e condição em ponto específico',destination:'Encaminhamento especializado conforme composição',risk:'Não abrir nem manipular bateria danificada',unsafe:'Abrir uma bateria estufada para inspecionar'},
 MEDIDORES:{trait:'Registrar número, origem e estado do equipamento',separate:'Acondicionar com etiqueta de identificação e histórico',destination:'Inspeção técnica antes de decidir sobre reuso ou destinação',risk:'Não manusear partes energizadas',unsafe:'Doar medidor retirado sem avaliação e registro'},
 ELETRONICOS:{trait:'Identificar aparelho, componentes e possíveis dados internos',separate:'Reservar equipamentos e baterias em local identificado',destination:'Avaliar reuso e dados antes de reciclagem especializada',risk:'Proteger informações antes de encaminhar',unsafe:'Descartar computador com informações corporativas'},
 POSTES:{trait:'Reconhecer peças de concreto e ferragens em estrutura retirada',separate:'Segregar concreto e metal após liberação da área',destination:'Avaliação de segurança e frações para destino licenciado',risk:'Isolar estruturas instáveis e pontas expostas',unsafe:'Manipular destroços pesados sem liberação técnica'},
 PAPEL:{trait:'Reconhecer folhas, caixas e papelão secos e limpos',separate:'Separar papel limpo e seco de materiais contaminados',destination:'Coleta seletiva/reciclagem de papel e papelão limpos',risk:'Não tratar papel contaminado como reciclável comum',unsafe:'Misturar papel limpo com resíduo químico'},
 CONCRETO:{trait:'Reconhecer entulho de concreto e sinais de contaminação',separate:'Separar concreto limpo de metal e resíduos perigosos',destination:'Concreto Classe A para reciclagem como agregado quando adequado',risk:'Isolar peças instáveis, pesadas e pontas expostas',unsafe:'Entrar na área de entulho instável sem liberação'},
 FERRAGENS:{trait:'Identificar peças metálicas, ferragens e fixadores',separate:'Segregar ferragens e proteger contra pontas cortantes',destination:'Avaliar reuso e encaminhar sucata a reciclador autorizado',risk:'Utilizar procedimentos de movimentação e proteção',unsafe:'Deixar pontas cortantes expostas em área de circulação'},
 PLASTICOS:{trait:'Identificar plásticos limpos e possíveis embalagens contaminadas',separate:'Separar plásticos limpos e secos dos contaminados',destination:'Reciclagem de plásticos elegíveis por operador autorizado',risk:'Não misturar recipientes químicos aos recicláveis limpos',unsafe:'Tratar embalagem contaminada como plástico comum'},
};

const withAnswer=(id,format,question,choices,correct,explanation)=>({id,format,question,choices,correct,explanation});
const answerOption=(label,imageCategoryId)=>({label,imageCategoryId});
const wrongA='Misturar sem classificação com o lixo comum';
const wrongB='Encaminhar sem qualquer identificação';
const sectorNote='O destino físico é definido pelo procedimento da empresa, não apenas pela aparência.';
export function getLessonQuestions(category,stageNumber){
 const m=DETAILS[category.id]||{trait:category.identify,separate:category.separate,destination:category.destination,risk:category.risk,unsafe:'Ignorar a orientação de segurança'};
 const others=CATEGORIES.filter(x=>x.id!==category.id);
 const a=others[(stageNumber+category.id.length)%others.length];
 const b=others[(stageNumber+category.id.length+3)%others.length];
 const imageQuestion=withAnswer(`${category.id}-${stageNumber}-img`,'image',`Toque na imagem de ${category.name.toLowerCase()}.`,[
   answerOption(a.short||a.name,a.id),answerOption(category.short||category.name,category.id),answerOption(b.short||b.name,b.id)],1,
   `Você identificou a categoria ${category.name}. Observe os detalhes e a condição antes de qualquer manuseio.`);
 if(stageNumber===1)return [
   imageQuestion,
   withAnswer(`${category.id}-1-a`,'text',`O que observar ao identificar ${category.name.toLowerCase()}?`,
     [answerOption('Somente a cor'),answerOption(m.trait),answerOption('Apenas o peso')],1,category.identify),
   withAnswer(`${category.id}-1-b`,'text',`O material foi retirado de uma operação. Qual o primeiro cuidado?`,
     [answerOption('Confirmar identificação e segurança'),answerOption('Levar direto ao lixo comum'),answerOption('Misturar a outra categoria')],0,category.identify),
   withAnswer(`${category.id}-1-c`,'text',`Se não for possível identificar com segurança o material, o que fazer?`,
     [answerOption('Escolher o destino ao acaso'),answerOption('Abrir o item para descobrir'),answerOption('Solicitar avaliação do responsável')],2,'Quando houver dúvida, não improvise: solicite a orientação da equipe habilitada.'),
 ];
 if(stageNumber===2)return [
   withAnswer(`${category.id}-2-a`,'text',`Como separar ${category.name.toLowerCase()} após liberação?`,
     [answerOption(wrongA),answerOption(m.separate),answerOption('Deixar em passagem de pessoas')],1,category.separate),
   imageQuestion,
   withAnswer(`${category.id}-2-b`,'text',`Por que usamos pontos de triagem identificados?`,
     [answerOption('Para misturar resíduos'),answerOption('Para eliminar todos os controles'),answerOption('Para manter rastreabilidade e segurança')],2,'A identificação do ponto de triagem reduz misturas e facilita os controles.'),
   withAnswer(`${category.id}-2-c`,'text',`Qual atitude não é recomendada?`,
     [answerOption(m.unsafe),answerOption('Consultar o responsável técnico'),answerOption('Seguir o procedimento do setor')],0,category.risk),
 ];
 if(stageNumber===3)return [
   withAnswer(`${category.id}-3-a`,'text',`Qual é o encaminhamento educativo mais adequado para ${category.name.toLowerCase()}?`,
     [answerOption('Descarte automático no lixo comum'),answerOption(m.destination),answerOption('Abandonar em local não identificado')],1,category.destination),
   withAnswer(`${category.id}-3-b`,'text','Um QR Code da categoria indica o setor. O que fazer antes de continuar?',
     [answerOption('Ler identificação, riscos e orientações'),answerOption('Ignorar a ficha e confirmar'),answerOption('Usar o mesmo destino para qualquer material')],0,sectorNote),
   imageQuestion,
   withAnswer(`${category.id}-3-c`,'text','O QR Code prova que o resíduo já foi destinado?',
     [answerOption('Sim, sempre'),answerOption('Sim, mesmo sem registro'),answerOption('Não; a etiqueta é informativa')],2,'A etiqueta orienta a separação. Comprovação de destinação exige registros e documentos próprios.'),
 ];
 return [
   withAnswer(`${category.id}-4-a`,'text',`Qual atitude reduz riscos com ${category.name.toLowerCase()}?`,
     [answerOption(m.unsafe),answerOption(m.risk),answerOption('Dispensar avaliação de segurança')],1,category.risk),
   imageQuestion,
   withAnswer(`${category.id}-4-b`,'text','O que fazer quando há um material avariado ou uma condição insegura?',
     [answerOption('Isolar o risco e comunicar o responsável'),answerOption('Mover o objeto sem análise'),answerOption('Tentar desmontar para verificar')],0,'A prioridade é evitar exposição e acionar a equipe capacitada.'),
   withAnswer(`${category.id}-4-c`,'text','Qual decisão combina segurança e sustentabilidade?',
     [answerOption('Descartar sem histórico'),answerOption('Misturar categorias para agilizar'),answerOption('Registrar, segregar e seguir o fluxo autorizado')],2,category.workflow||sectorNote),
 ];
}
export const LESSON_SIZE=4;
export const LESSON_COUNT_PER_CATEGORY=LESSON_SIZE*LESSON_STAGES.length;
export function validateLessons(){return CATEGORIES.every(c=>LESSON_STAGES.every(s=>{let q=getLessonQuestions(c,s.id);return q.length===LESSON_SIZE&&q.every(x=>x.choices.length===3&&Number.isInteger(x.correct)&&x.correct>=0&&x.correct<3&&x.choices.filter((_,i)=>i===x.correct).length===1)}));}
