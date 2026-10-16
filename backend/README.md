# Backend futuro — EQT Reverse

A pasta é **somente uma estrutura de planejamento**, não um serviço online em operação.
O MVP continua funcionando offline pelo Expo Go e mantém os dados demonstrativos em AsyncStorage.

## Arquivos
- `database/schema.sql`: modelo proposto para PostgreSQL (sem dependência obrigatória de Supabase).
- `docs/api-contract.md`: endpoints planejados e regras de autorização.
- `../src/services/api/`: cliente HTTP isolado para uma futura implementação, **desativado por padrão**.

## Etapas para uma implementação real
1. Criar servidor Node.js e banco de dados com infraestrutura própria da empresa.
2. Implementar login com senhas criptografadas, tokens e proteção de endpoints.
3. Migrar as categorias, perguntas e progressos para as tabelas, aprovando destinações por setor.
4. Trocar o repositório local pelo cliente HTTP (`src/services/api`).
5. Adicionar controle de acesso no servidor, logs, backup, LGPD e testes de segurança.

**Não** criar contas de administrador a partir do cadastro público nem confiar em perfis enviados pelo celular.
As imagens/etiquetas QR do MVP apresentam uma ficha educativa; não são comprovante de descarte.

## Referências para revisar os conteúdos
- SINIR lâmpadas: https://www.sinir.gov.br/perfis/logistica-reversa/logistica-reversa/lampadas-fluorescentes-de-vapor-de-sodio-e-mercurio-e-de-luz-mista/
- SINIR pilhas: https://www.sinir.gov.br/perfis/logistica-reversa/logistica-reversa/pilhas-e-baterias/
- SINIR eletroeletrônicos: https://sinir.gov.br/perfis/logistica-reversa/logistica-reversa/eletroeletronicos
- Resolução CONAMA 307/2002 (RCC, concreto/metal/papel): https://conama.mma.gov.br/images/conteudo/LivroConama.pdf
