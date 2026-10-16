> **Windows:** use `INICIAR_AQUI_WINDOWS.cmd` na mesma pasta do `App.js`. Confira `LEIA_ME_PRIMEIRO.txt`.

# EQT Reverse — MVP 1.4 (React Native + Expo Go)

Aplicativo educacional demonstrativo de logística reversa. Esta versão foi construída sobre o **último EQT Reverse com dois perfis e trilha gamificada**, incorporando o kit gráfico de alta resolução e três ilustrações fornecidas para o carrossel.

## O que há nesta versão

- **Novo carrossel com 3 ilustrações PNG transparentes**, centradas, fundo claro e frases educativas; avanço por toque/deslize. O acesso do administrador fica na tela de login (não na capa).
- **Dashboard com o kit de ícones**: logo corrigida, cabeçalho com folhas, atalhos coloridos, troféu, emblema, barra XP azul/ciano e cartões de progresso.
- **Dois perfis**: Colaborador (aprendizagem e missões) e Administrador (gestão de equipe, categorias, etiquetas, QR Codes e ranking). O cadastro público cria somente colaboradores.
- **10 categorias iniciais**: cabos, lâmpadas, pilhas/baterias, medidores, eletrônicos, concreto e ferragens combinados, papel/papelão, concreto, ferragens e plásticos/embalagens. A categoria combinada anterior é mantida por compatibilidade com QR Codes antigos.
- **Aprendizado curto e visual**: quatro níveis para cada categoria, quatro atividades por nível, total de **160 atividades** nas dez categorias. Cada atividade tem três alternativas, exatamente uma correta, com explicação depois da resposta. Há **40 atividades de escolha por imagem**. Três acertos entre quatro liberam o próximo nível.
- **Flashcards** com animação de giro em 3D; **minijogo somente por toque**, sem arrastar; níveis, XP, missões, conquistas e ranking.
- **Scanner QR Code por setor e categoria**: depois da leitura, abre a ficha com identificação, separação, riscos e destinação. É preciso marcar “Li as orientações” antes do botão Continuar. Consulta manual também funciona.
- **Progresso por conta local**: os dados demonstrativos ficam no próprio dispositivo, separados por e-mail. Não há sincronização entre dispositivos.
- **Backend futuro**: modelo PostgreSQL e contratos de API em `backend/`; cliente HTTP em `src/services/api/` **desativado**, para integrar login, progressos, perguntas e ranking posteriormente. Nenhuma API de IA é necessária.

## Como executar no VS Code (Windows)

Extraia o ZIP e abra **a pasta que contém `App.js`**, que contém `package.json`.

```powershell
npm.cmd install
npx.cmd expo install --fix
npx.cmd expo start --lan --clear
```

Abra o QR Code no Expo Go. Celular e computador precisam estar na mesma rede. Se o Expo abrir uma versão antiga, encerre a execução anterior e reinicie com `--clear`.

### Demonstração dos perfis

No carrossel, use “Próximo” para entrar como colaborador ou “Criar uma conta”. Na tela de login, toque em **Acesso do administrador** para mudar de perfil. Em cada entrada, há uma seção “Acesso de demonstração” que dispensa um servidor. **Não use credenciais reais**; senhas do MVP não são autenticadas.

### Testar aprendizado

1. Entre como colaborador → **Aprender** → toque na primeira categoria.
2. Escolha o **Nível 1: Reconhecer** (4 atividades).
3. Toque numa das três alternativas, inclusive imagens; leia o feedback e vá para a próxima.
4. Faça pelo menos 3/4 para concluir. Os níveis **Separar**, **Destinar** e **Agir com segurança** são liberados em sequência.
5. Refaça níveis sem ganhar novamente o XP da mesma lição.

### Testar QR por setor

1. Entre como administrador → **Etiquetas** → selecione uma categoria e um setor.
2. Gere o QR Code local.
3. Entre como colaborador no mesmo celular → **Scanner** → leia o código.
4. Leia a ficha inteira e marque a confirmação. Só então “Continuar” libera os níveis daquela categoria.

**Atenção:** um QR de categoria customizada criado neste celular pode não ser reconhecido em outro celular até que exista catálogo compartilhado por backend.

## Organização

```text
EQT-Reverse-MVP/
├── App.js
├── assets/images/
│   ├── onboarding/          # Três cenas PNG fornecidas, com transparência
│   ├── dashboard/           # Ícones PNG organizados por atalhos, emblemas e progresso
│   ├── avatars/             # 20 avatares
│   ├── backgrounds/         # Fundos decorativos
│   ├── illustrations/       # Elementos ilustrativos
│   ├── materials/           # Materiais das categorias
│   ├── rewards/             # Troféus anteriores
│   └── logos/
├── src/
│   ├── assets/kit.js        # Imports estáticos Metro (require literal)
│   ├── components/
│   ├── context/             # Sessão local, XP e progresso por usuário
│   ├── data/catalog.js      # Fichas educativas
│   ├── data/lessons.js      # Quatro níveis por categoria
│   ├── navigation/          # Rotas e permissões
│   ├── screens/             # Login, carrossel, trilha, lições, QR e administração
│   ├── services/api/        # Interfaces do futuro backend (desativadas)
│   └── theme/
├── backend/
│   ├── database/schema.sql  # Modelo de banco PostgreSQL
│   ├── docs/api-contract.md # Endpoints planejados
│   └── README.md
└── tests/
```

### Verificação do conteúdo e QR

```powershell
npm.cmd run check
```

Os testes verificam regras locais e a consistência de 160 atividades; **não** substituem testes em aparelho físico. A aparência final do Expo Go, a câmera e os efeitos sonoros precisam de validação no seu dispositivo.

## Orientações e limitações

O conteúdo é **educativo e demonstrativo**. As instruções sobre destino físico, risco, acondicionamento e procedimentos operacionais devem ser confirmadas pelos profissionais responsáveis da Equatorial antes do uso real. QR Code não é prova de coleta ou destinação. Os pontos indicados para logística reversa doméstica nem sempre se aplicam à operação corporativa.

Referências técnicas para validação dos conteúdos:
- [SINIR — lâmpadas com mercúrio](https://www.sinir.gov.br/perfis/logistica-reversa/logistica-reversa/lampadas-fluorescentes-de-vapor-de-sodio-e-mercurio-e-de-luz-mista/)
- [SINIR — pilhas e baterias](https://www.sinir.gov.br/perfis/logistica-reversa/logistica-reversa/pilhas-e-baterias/)
- [SINIR — eletroeletrônicos](https://sinir.gov.br/perfis/logistica-reversa/logistica-reversa/eletroeletronicos)
- [CONAMA 307 — resíduos da construção civil](https://conama.mma.gov.br/images/conteudo/LivroConama.pdf)

Na versão futura, o backend deve corrigir respostas, atribuir XP, validar papéis e persistir progresso de forma segura. A tela nunca deve, sozinha, autorizar elevação de administrador.
