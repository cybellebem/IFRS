# IF Solidário

Sistema para organizar voluntariados do IFRS. Permite gerenciar **voluntários** e **eventos sociais**, com autenticação JWT e controle de acesso por papel (`admin` / `user`).

## Estrutura

```
if-solidario-app/
├── backend/
│   ├── src/
│   │   ├── config/        # conexão MySQL e especificação Swagger
│   │   ├── controllers/   # recebem a requisição e chamam o service
│   │   ├── database/      # ddl.sql, dml.sql e scripts init/reset
│   │   ├── docs/          # schemas OpenAPI reutilizáveis
│   │   ├── errors/        # AppError (erro com status HTTP)
│   │   ├── middlewares/   # autenticação/autorização JWT e tratamento de erros
│   │   ├── models/        # acesso ao banco (SQL)
│   │   ├── routes/        # endpoints + anotações @openapi
│   │   ├── services/      # regras de negócio
│   │   ├── utils/         # validações reutilizáveis
│   │   ├── app.js
│   │   └── server.js
│   ├── tests.rest         # requisições de exemplo (REST Client)
│   └── eslint.config.js / .prettierrc
├── frontend/
│   └── src/
│       ├── api/           # cliente HTTP (fetch + token)
│       ├── components/    # Layout, ProtectedRoute, formulários...
│       ├── context/       # AuthContext (login/logout)
│       ├── hooks/         # useApi
│       └── pages/         # Login, Dashboard, Eventos, Detalhe do evento, Voluntários
└── video.txt              # link do vídeo de apresentação
```

## Instalação e execução

### 1. Banco de dados

O script do banco está em [backend/src/database/ddl.sql](backend/src/database/ddl.sql) (estrutura) e [backend/src/database/dml.sql](backend/src/database/dml.sql) (dados fictícios). Há duas formas de criá-lo:

- **Automática:** `npm run db:init` (cria se não existir e popula se estiver vazio) ou `npm run db:reset` (apaga e recria tudo).
- **Manual:** execute `ddl.sql` e depois `dml.sql` no MySQL Workbench / cliente MySQL.

### 2. Back-end

```bash
npm install
npm run db:reset          # cria o banco "voluntariado" com os dados fictícios
npm run dev               # ou: npm start
```

API em `http://localhost:3000` · Swagger em **`http://localhost:3000/api-docs`**

### 3. Front-end

```bash
npm install
npm run dev
```

Aplicação em `http://localhost:5173`.

### Scripts úteis

| Projeto  | Comando            | Descrição                             |
| -------- | ------------------ | ------------------------------------- |
| backend  | `npm run start`    | inicializa somente a aplicação        |
| backend  | `npm run dev`      | inicializa o banco e sobe com nodemon |
| backend  | `npm run db:reset` | recria o banco com dados fictícios    |
| backend  | `npm run lint`     | ESLint                                |
| backend  | `npm run format`   | Prettier                              |
| frontend | `npm run dev`      | servidor de desenvolvimento Vite      |
| frontend | `npm run build`    | build de produção                     |
| frontend | `npm run lint`     | ESLint                                |

## Usuários

| E-mail                | Senha    | Papel   |
| --------------------- | -------- | ------- |
| `admin@ifrs.edu.br`   | `123456` | `admin` |
| `usuario@ifrs.edu.br` | `123456` | `user`  |

## API REST

Todas as respostas são JSON. Erros seguem o formato `{ "error": "mensagem" }`.
Rotas protegidas exigem o cabeçalho `Authorization: Bearer <token>`.

### Autenticação

| Método | Rota          | Acesso      | Descrição                                                 |
| ------ | ------------- | ----------- | --------------------------------------------------------- |
| POST   | `/auth/login` | público     | Recebe `{ email, password }` e retorna `{ token, user }`. |
| GET    | `/auth/me`    | autenticado | Retorna o payload do token.                               |

### Dashboard

| Método | Rota         | Acesso      | Descrição                                                                        |
| ------ | ------------ | ----------- | -------------------------------------------------------------------------------- |
| GET    | `/dashboard` | autenticado | Saudação, totais (eventos, voluntários, inscrições, lotados) e próximos eventos. |

### Eventos

| Método | Rota                                  | Acesso      | Descrição                                      |
| ------ | ------------------------------------- | ----------- | ---------------------------------------------- |
| GET    | `/events`                             | autenticado | Lista eventos com `total_voluntarios`.         |
| GET    | `/events/:id`                         | autenticado | Detalhe do evento + lista `voluntarios`.       |
| POST   | `/events`                             | **admin**   | Cadastra evento.                               |
| PUT    | `/events/:id`                         | **admin**   | Atualiza evento.                               |
| DELETE | `/events/:id`                         | **admin**   | Exclui evento.                                 |
| POST   | `/events/:id/volunteers`              | autenticado | Inscreve voluntário: `{ "voluntario_id": 1 }`. |
| DELETE | `/events/:id/volunteers/:volunteerId` | autenticado | Cancela inscrição.                             |

### Voluntários

| Método | Rota              | Acesso      | Descrição            |
| ------ | ----------------- | ----------- | -------------------- |
| GET    | `/volunteers`     | autenticado | Lista voluntários.   |
| GET    | `/volunteers/:id` | autenticado | Busca voluntário.    |
| POST   | `/volunteers`     | **admin**   | Cadastra voluntário. |
| PUT    | `/volunteers/:id` | **admin**   | Atualiza voluntário. |
| DELETE | `/volunteers/:id` | **admin**   | Exclui voluntário.   |

### Documentação e testes

- **Swagger:** `http://localhost:3000/api-docs` (JSON em `/api-docs.json`). Use o botão **Authorize** com o token retornado pelo login.
- **REST Client:** abra [backend/tests.rest](backend/tests.rest) no VS Code com a extensão _REST Client_, execute primeiro os dois logins e depois as demais requisições (os tokens são reaproveitados automaticamente).

## Telas do front-end

| Rota          | Descrição                                                                        |
| ------------- | -------------------------------------------------------------------------------- |
| `/login`      | Login com e-mail e senha.                                                        |
| `/dashboard`  | Indicadores e próximos eventos (rota protegida).                                 |
| `/events`     | Lista de eventos com ocupação das vagas; admin cria, edita e exclui.             |
| `/events/:id` | Detalhes do evento, inscrição e remoção de voluntários (bloqueia quando lotado). |
| `/volunteers` | Lista de voluntários; admin cria, edita e exclui.                                |
