# Ciclo Icon Pack

Biblioteca de ícones vetoriais em React/TypeScript para o aplicativo Ciclo. Cada ícone é um componente SVG independente (não é uma imagem única nem depende de arquivo PNG).

## Como usar

Copie `CicloIcon.tsx` para o projeto React/TypeScript, por exemplo em `src/components/CicloIcon.tsx`.

```tsx
import CicloIcon from "./components/CicloIcon";

<CicloIcon name="recycle" size={28} color="#27B86A" />
<CicloIcon name="trophy" size={32} color="#FFC928" />
<CicloIcon name="qr-generator" size={24} color="#1264D8" />
```

O componente aceita:
- `name`: nome do ícone.
- `size`: tamanho em pixels (padrão 24).
- `color`: cor do traço (padrão `currentColor`).
- `className`: classe CSS opcional.
- `title`: rótulo acessível opcional.
- `strokeWidth`: espessura do traço.

Os ícones são SVGs editáveis, escaláveis e podem receber cores por propriedade. Não precisam de biblioteca adicional além de React.

## Categorias incluídas

Navegação, ações, gamificação, missões, materiais e resíduos, aprendizagem, trilhas, estados, Ciclo ADM, perfil, acessibilidade e materiais específicos.
