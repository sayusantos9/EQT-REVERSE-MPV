# Contrato proposto de API (não implementado)

Base: `/api/v1`. Respostas JSON com `data` ou `error`.

| Método | Rota | Acesso futuro |
|---|---|---|
| POST | `/auth/login` | Público (validação e rate limit) |
| POST | `/auth/register` | Público; sempre colaborador |
| GET | `/me` | Autenticado |
| GET | `/categories` | Autenticado |
| GET | `/categories/:id` | Autenticado |
| GET | `/categories/:id/destination?sectorId=...` | Autenticado; destino aprovado |
| POST | `/admin/categories` | Administrador |
| PUT | `/admin/categories/:id` | Administrador |
| POST | `/admin/qr-labels` | Administrador |
| GET | `/admin/users` | Administrador |
| POST | `/admin/users/invitations` | Administrador |
| GET | `/lessons?categoryId=...` | Colaborador |
| POST | `/lessons/:id/attempts` | Colaborador; servidor calcula resultado e XP |
| GET | `/me/progress` | Colaborador |
| GET | `/ranking?sectorId=...` | Colaborador ou administrador |
| POST | `/scans` | Colaborador |

**Validações obrigatórias:** impedir elevação de privilégios pelo cliente, validar ownership do progresso, limitar repetição de recompensas via `xp_events UNIQUE`, armazenar somente hashes de senhas, não confiar em respostas marcadas como corretas pelo cliente. O backend deve calcular a correção consultando `question_options`.
