# EQT Reverse — MVP 1.4

Aplicativo mobile educacional de **logística reversa**, desenvolvido com **React Native e Expo**, voltado à identificação, separação e destinação responsável de resíduos por meio de aprendizagem gamificada.

---

## Sobre o projeto

O **EQT Reverse** é um protótipo demonstrativo que une educação ambiental, atividades interativas e consulta a orientações por QR Code. A proposta é ajudar colaboradores a reconhecer diferentes materiais, compreender cuidados de segurança e aprender procedimentos de separação e destinação.

A versão atual funciona com **dados locais no dispositivo**. A integração com um backend está planejada, mas ainda não está ativa.

## Funcionalidades

1. **Carrossel de apresentação:** três ilustrações e mensagens educativas.
2. **Dois perfis:** Colaborador e Administrador.
3. **Aprendizagem gamificada:** trilhas, níveis, quizzes com imagens, flashcards e feedback das respostas.
4. **Progressão:** pontos de experiência (XP), missões, conquistas e ranking demonstrativo.
5. **QR Codes educativos:** geração de etiquetas por setor e categoria, leitura pelo scanner e consulta de fichas orientativas.
6. **Progresso individual local:** informações demonstrativas separadas por conta no próprio dispositivo.

## Perfis de acesso

### Colaborador

Acessa categorias de materiais, responde atividades, acompanha o progresso, desbloqueia níveis e consulta fichas educativas via QR Code.

### Administrador

Acessa ferramentas de organização de categorias, setores, etiquetas, QR Codes, equipe e ranking.

> **Atenção:** os acessos são demonstrativos. As senhas do MVP não são autenticadas por um servidor. Não utilize credenciais reais.

## Trilha de aprendizagem

O conteúdo educativo está distribuído em **10 categorias**, com **4 níveis por categoria** e **4 atividades por nível**, totalizando **160 atividades**. Há perguntas com imagens, três alternativas e explicações após a resposta.

Para avançar, o colaborador precisa acertar **pelo menos 3 das 4 atividades** de cada nível.

Os níveis são:

1. **Reconhecer**
2. **Separar**
3. **Destinar**
4. **Agir com segurança**

## QR Codes e etiquetas

1. O administrador abre **Etiquetas**, seleciona o setor e a categoria e gera um QR Code.
2. O colaborador acessa **Scanner** e lê o código.
3. O aplicativo apresenta uma ficha sobre identificação, separação, riscos e destinação.
4. O colaborador confirma que leu as orientações para continuar.

**Limitação:** códigos associados a categorias personalizadas podem não ser reconhecidos em outro dispositivo sem um catálogo compartilhado por backend.

## Tecnologias utilizadas

- **JavaScript** — linguagem principal
- **React Native** — interface mobile
- **Expo / Expo Go** — desenvolvimento e testes no celular
- **Node.js e npm** — ambiente e gerenciamento de dependências
- **PostgreSQL** — modelagem prevista para futura integração de backend, ainda não conectada

## Como executar o projeto

### Pré-requisitos

Instale **Node.js**, tenha o **VS Code** disponível e instale o aplicativo **Expo Go** no celular.

### Instalação e execução

Abra no terminal a pasta que contém `App.js` e `package.json` e execute:

```powershell
npm.cmd install
npx.cmd expo install --fix
npx.cmd expo start --lan --clear
```

Abra o QR Code exibido no terminal usando o Expo Go. O computador e o celular devem estar na mesma rede.

**Windows:** o projeto também inclui `INICIAR_AQUI_WINDOWS.cmd` e `LEIA_ME_PRIMEIRO.txt` com orientações adicionais.

## Como testar

### Aprendizado

1. Entre como **Colaborador**.
2. Abra **Aprender** e escolha uma categoria.
3. Inicie o nível **Reconhecer**.
4. Responda às quatro atividades e leia os feedbacks.
5. Acerte três questões ou mais para liberar o próximo nível.

### Leitura de QR Code

1. Entre como **Administrador** e abra **Etiquetas**.
2. Escolha uma categoria e um setor para gerar o código.
3. Entre como **Colaborador** no mesmo dispositivo.
4. Acesse **Scanner**, leia o código e confira a ficha.

## Estrutura do projeto

```text
EQT-REVERSE-MPV/
├── App.js
├── assets/
│   └── images/
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── navigation/
│   ├── screens/
│   ├── services/
│   └── theme/
├── backend/
│   ├── database/
│   └── docs/
└── tests/
```

## Backend planejado

A pasta `backend/` contém materiais preparatórios, incluindo modelo de banco PostgreSQL e documentação de APIs. A integração futura poderá oferecer autenticação, persistência de progresso, sincronização entre dispositivos e ranking compartilhado.

**O MVP atual não exige Supabase nem servidor para a demonstração local.**

## Testes

Para executar a verificação disponibilizada pelo projeto:

```powershell
npm.cmd run check
```

Os testes automatizados não substituem a validação de câmera, QR Codes e experiência de uso em um aparelho real.

## Observações importantes

Este é um **protótipo educacional**, não um sistema operacional de destinação de resíduos. Orientações sobre riscos e descarte precisam ser validadas por profissionais responsáveis antes de uso em ambiente corporativo. Um QR Code não comprova coleta ou destinação.

## Referências técnicas

- [SINIR — Logística reversa de lâmpadas](https://www.sinir.gov.br/perfis/logistica-reversa/logistica-reversa/lampadas-fluorescentes-de-vapor-de-sodio-e-mercurio-e-de-luz-mista/)
- [SINIR — Pilhas e baterias](https://www.sinir.gov.br/perfis/logistica-reversa/logistica-reversa/pilhas-e-baterias/)
- [SINIR — Eletroeletrônicos](https://sinir.gov.br/perfis/logistica-reversa/logistica-reversa/eletroeletronicos)
- [CONAMA — Resolução 307](https://conama.mma.gov.br/images/conteudo/LivroConama.pdf)

---

**Status:** MVP demonstrativo em desenvolvimento.
