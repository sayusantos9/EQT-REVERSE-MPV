// Conteúdo demonstrativo baseado nas etapas indicadas na mentoria do Desafio 11.
// NÃO substitui procedimentos oficiais ambientais ou de segurança da Equatorial.
export const CATEGORIES = [
  {
    id:'PAPEL',qr:'MR:CAT:PAPEL',name:'Papel e papelão',short:'Papel e papelão',icon:'file-document-outline',accent:'#2787BB',
    identify:'Papel de escritório, caixas e papelão secos e sem contaminação podem ser separados para reciclagem.',
    separate:'Separe papéis limpos e secos dos resíduos orgânicos, embalagens contaminadas e materiais especiais.',
    destination:'Encaminhar ao ponto de recicláveis secos ou à coleta seletiva contratada e autorizada.',
    risk:'Papel com óleo, produto químico ou outro contaminante exige avaliação separada.',
    workflow:'Coleta identificada → segregação de papel limpo → cooperativa ou operador autorizado',
    route:'RECICLAGEM',routeReason:'Papel e papelão secos, limpos e triados podem seguir para reciclagem autorizada.',
    quiz:{question:'O que fazer com caixas de papelão limpas?',options:['Separar secas para reciclagem','Misturar com resíduos perigosos','Queimar na unidade'],correct:0,explanation:'Papéis e papelões limpos podem seguir ao fluxo de recicláveis secos.'}
  },
  {
    id:'CONCRETO',qr:'MR:CAT:CONCRETO',name:'Concreto',short:'Concreto',icon:'wall',accent:'#6B88AB',
    identify:'Fragmentos de concreto de obras ou estruturas removidas precisam ser avaliados quanto a contaminação e segurança.',
    separate:'Após liberação da equipe técnica, manter o concreto segregado de metais, tintas e resíduos perigosos.',
    destination:'Concreto limpo e classificado como Classe A pode seguir à reciclagem como agregado em instalação adequada.',
    risk:'Peças pesadas, pontas expostas e estruturas instáveis exigem isolamento e equipe capacitada.',
    workflow:'Isolamento → liberação técnica → segregação Classe A → destino licenciado',
    route:'AVALIACAO',routeReason:'O concreto requer segurança e classificação antes de reaproveitamento ou reciclagem.',
    quiz:{question:'Qual condição permite considerar reciclagem do concreto?',options:['Mistura com resíduos perigosos','Ser limpo, classificado e liberado para triagem','Retirada sem avaliação de riscos'],correct:1,explanation:'A Resolução CONAMA 307 classifica resíduos de concreto como Classe A quando adequados.'}
  },
  {
    id:'FERRAGENS',qr:'MR:CAT:FERRAGENS',name:'Ferragens e sucata metálica',short:'Ferragens',icon:'wrench',accent:'#7275B9',
    identify:'Identifique metais, fixadores, suportes e ferragens retiradas de operações e obras.',
    separate:'Após liberação, guarde peças cortantes e pesadas em área adequada, segregadas de concreto e resíduos perigosos.',
    destination:'Após avaliação de reuso, encaminhar sucata metálica não contaminada a reciclador ou operador autorizado.',
    risk:'Rebarbas e cargas pesadas apresentam risco de cortes, perfurações e queda de objetos.',
    workflow:'Liberação segura → triagem → reuso autorizado ou reciclagem de metais',
    route:'AVALIACAO',routeReason:'Peças e ferragens devem passar por avaliação técnica antes do destino.',
    quiz:{question:'Qual cuidado importa com ferragens retiradas de uma obra?',options:['Despejar livremente','Avaliar pontas cortantes e separar com segurança','Deixar misturadas ao papel'],correct:1,explanation:'A segurança de armazenamento e a segregação antecedem a reciclagem.'}
  },
  {
    id:'PLASTICOS',qr:'MR:CAT:PLASTICOS',name:'Plásticos e embalagens',short:'Plásticos',icon:'recycle',accent:'#20A5A4',
    identify:'Embalagens e peças plásticas sem contaminação podem ser avaliadas para a coleta seletiva.',
    separate:'Segregue plásticos limpos e secos; embalagens químicas ou contaminadas exigem tratamento específico.',
    destination:'Encaminhar os plásticos elegíveis ao fluxo de recicláveis aprovado no local.',
    risk:'A mistura com resíduos contaminados pode inviabilizar a reciclagem e gerar exposição.',
    workflow:'Identificação → triagem dos plásticos limpos → operador de recicláveis autorizado',
    route:'RECICLAGEM',routeReason:'Plásticos não contaminados e adequados à reciclagem seguem coleta seletiva autorizada.',
    quiz:{question:'Uma embalagem plástica tem resíduo químico. O que fazer?',options:['Juntar aos recicláveis limpos','Encaminhar para avaliação do fluxo específico','Lavar sem orientação e misturar'],correct:1,explanation:'Resíduos de origem química exigem cuidados, não reciclagem comum automática.'}
  },

  {
    id: 'CABOS', qr: 'MR:CAT:CABOS', name: 'Cabos e fios', short: 'Cabos', icon: 'cable-data', accent: '#138D82',
    identify: 'Observe o tipo de cabo, isolamento, composição e estado de conservação. Não manuseie fiação energizada.',
    separate: 'Mantenha cabos retirados em local identificado, separados conforme o procedimento interno e condição de uso.',
    destination: 'Após triagem e avaliação, podem seguir para reaproveitamento autorizado ou reciclagem de metais por operador habilitado.',
    risk: 'Misturas e identificação incorreta podem causar perda de valor e retrabalho.',
    workflow: 'Área sinalizada de cabos → triagem → encaminhamento autorizado',
    quiz: { question: 'Antes de enviar um cabo retirado para reciclagem, o que verificar?', options: ['Se ele tem cor azul', 'Origem, condição e possibilidade de reaproveitamento', 'Se cabe no lixo comum'], correct: 1, explanation: 'A triagem identifica condições e define o fluxo autorizado, evitando perdas e descarte prematuro.' },
    route: 'AVALIACAO', routeReason: 'Cabos retirados precisam de triagem; reciclagem ou reaproveitamento dependem da avaliação.'
  },
  {
    id: 'LAMPADAS', qr: 'MR:CAT:LAMPADAS', name: 'Lâmpadas', short: 'Lâmpadas', icon: 'lightbulb-outline', accent: '#C28B29',
    identify: 'Identifique o tipo: fluorescente, LED ou outro. Fluorescentes podem conter mercúrio.',
    separate: 'Guarde lâmpadas usadas de forma íntegra, em embalagem e área indicada. Não quebre nem misture com resíduos comuns.',
    destination: 'Lâmpadas fluorescentes seguem fluxo especializado de coleta e tratamento. Outras tecnologias exigem triagem conforme procedimentos locais.',
    risk: 'Quebra de lâmpadas fluorescentes pode liberar substâncias perigosas.',
    workflow: 'Ponto de lâmpadas → acondicionamento seguro → empresa autorizada',
    quiz: { question: 'O que fazer com uma lâmpada fluorescente usada?', options: ['Quebrar para economizar espaço', 'Jogar no lixo comum', 'Manter íntegra e encaminhar à coleta especializada'], correct: 2, explanation: 'Lâmpadas fluorescentes requerem coleta especializada devido à presença de mercúrio.' },
    route: 'ESPECIAL', routeReason: 'Na demonstração, considera-se uma lâmpada fluorescente, que requer tratamento especializado.'
  },
  {
    id: 'BATERIAS', qr: 'MR:CAT:BATERIAS', name: 'Pilhas e baterias', short: 'Baterias', icon: 'battery-charging-outline', accent: '#7D6DCC',
    identify: 'Observe identificação, química, integridade, sinais de vazamento e deformação. Não abra nem teste baterias danificadas.',
    separate: 'Não misture com lixo comum. Materiais danificados devem ser isolados e tratados por pessoal qualificado.',
    destination: 'Fluxo específico para coleta e destinação com operadores autorizados, conforme tipo e estado da bateria.',
    risk: 'Podem apresentar vazamentos, aquecimento, risco químico ou de incêndio.',
    workflow: 'Ponto de baterias → isolamento conforme risco → operador autorizado',
    quiz: { question: 'Uma bateria usada apresenta deformação. Qual atitude é adequada?', options: ['Solicitar orientação de segurança e encaminhamento especializado', 'Abrir para ver os componentes', 'Guardar misturada aos cabos'], correct: 0, explanation: 'Baterias danificadas exigem cuidados específicos e não devem ser manipuladas indiscriminadamente.' },
    route: 'ESPECIAL', routeReason: 'Pilhas e baterias seguem um fluxo específico e requerem avaliação de risco e destinação autorizada.'
  },
  {
    id: 'MEDIDORES', qr: 'MR:CAT:MEDIDORES', name: 'Medidores de energia', short: 'Medidores', icon: 'counter', accent: '#237EB6',
    identify: 'Registre identificação, origem, modelo e condição. Nunca manipule componentes energizados.',
    separate: 'Coloque em área identificada, com registro de origem e de estado, conforme procedimentos da organização.',
    destination: 'Avaliação técnica para possibilidade de reuso, recuperação de componentes ou destinação adequada.',
    risk: 'Falta de registro compromete rastreabilidade, inventário e decisões de reaproveitamento.',
    workflow: 'Retirada → registro → inspeção técnica → destino aprovado',
    quiz: { question: 'Um medidor foi retirado de operação. Qual o próximo passo?', options: ['Encaminhar para registro e avaliação técnica', 'Doar sem inspeção', 'Descartar sem identificar'], correct: 0, explanation: 'Antes do destino final, é necessário avaliar estado, origem e possibilidade de reaproveitamento.' },
    route: 'AVALIACAO', routeReason: 'Medidores necessitam registro e avaliação antes de decisão sobre reutilização ou tratamento.'
  },
  {
    id: 'ELETRONICOS', qr: 'MR:CAT:ELETRONICOS', name: 'Equipamentos eletrônicos', short: 'Eletrônicos', icon: 'desktop-tower-monitor', accent: '#D06A56',
    identify: 'Reconheça tipo, componentes, condições de uso e presença de dados ou baterias internas.',
    separate: 'Acondicione em local identificado, com atenção a peças frágeis, baterias e informações armazenadas.',
    destination: 'Encaminhamento para inspeção, recuperação, reaproveitamento autorizado ou reciclagem eletrônica especializada.',
    risk: 'Descarte inadequado desperdiça componentes e pode apresentar riscos de contaminação e vazamento de dados.',
    workflow: 'Recebimento → registro → análise → recuperação/reciclagem autorizada',
    quiz: { question: 'Qual a melhor decisão para um equipamento eletrônico obsoleto?', options: ['Jogar no lixo comum', 'Avaliar reuso, dados e fluxo especializado', 'Deixar sem registro'], correct: 1, explanation: 'A avaliação evita descarte inadequado e favorece recuperação e rastreabilidade.' },
    route: 'AVALIACAO', routeReason: 'Eletrônicos exigem inspeção antes de decidir entre recuperação e reciclagem especializada.'
  },
  {
    id: 'POSTES', qr: 'MR:CAT:POSTES', name: 'Concreto e ferragens', short: 'Postes e ferragens', icon: 'wall', accent: '#72869A',
    identify: 'Em obras ou acidentes, reconheça concreto, ferragens e componentes associados. Verifique riscos do local e aguarde liberação da equipe responsável.',
    separate: 'A segregação de concreto e metais deve seguir o procedimento da equipe de obra e as condições de segurança. Não intervenha em destroços instáveis.',
    destination: 'Após avaliação de riscos e classificação, cada fração segue para recuperação, reciclagem ou destino licenciado apropriado.',
    risk: 'Fragmentos, materiais pesados e ferragens expostas podem causar acidentes e requerem logística especializada.',
    workflow: 'Ocorrência → isolamento seguro → triagem técnica → transporte e destinação autorizados',
    quiz: { question: 'Um poste quebrado gerou concreto e ferragens. Qual o primeiro passo?', options: ['Misturar tudo ao lixo comum', 'Isolar o risco e solicitar avaliação e triagem da equipe', 'Distribuir os fragmentos sem registro'], correct: 1, explanation: 'A equipe deve priorizar segurança, origem, classificação e o encaminhamento adequado das frações.' },
    route: 'AVALIACAO', routeReason: 'Concreto e ferragens precisam de triagem e avaliação das condições do local antes do destino.'
  }
];
export const BY_ID = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));
export const QR_BY_DATA = Object.fromEntries(CATEGORIES.map(c => [c.qr, c.id]));
export const ROUTES = [
  { id: 'RECICLAGEM', title: 'Reciclagem autorizada', icon: 'recycle', color: '#0E937B', description: 'Materiais liberados para reciclagem após triagem' },
  { id: 'ESPECIAL', title: 'Tratamento especial', icon: 'alert-circle-outline', color: '#C98225', description: 'Resíduos com fluxo de destinação especializado' },
  { id: 'AVALIACAO', title: 'Avaliação técnica', icon: 'clipboard-check-outline', color: '#155DA8', description: 'Materiais que precisam de inspeção antes da decisão' }
];
export const DEMO_PEERS = [
  { name: 'Operações', xp: 2340, people: 12 }, { name: 'Logística', xp: 1980, people: 10 },
  { name: 'Suprimentos', xp: 1450, people: 9 }, { name: 'Administrativo', xp: 980, people: 8 }
];
export const ROLE_NAMES = { colaborador: 'Colaborador', administrador: 'Administrador' };
