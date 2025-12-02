# Documentação da API REST - DoaMais

A API é acessível em `http://localhost:3000/api/` (ambiente de desenvolvimento).

## 1. Autenticação e Perfil (Rotas: /api/auth)

| Rota | Método | Descrição | Acesso |
| :--- | :--- | :--- | :--- |
| `/auth/register` | **POST** | Cria uma nova conta de usuário. | Público |
| `/auth/login` | **POST** | Autentica o usuário e retorna o token JWT. | Público |
| `/auth/me` | **GET** | Retorna os dados do usuário logado (Nome, E-mail, ID). | Protegido (JWT) |

## 2. Doações e Listagem (Rotas: /api/donations)

| Rota | Método | Descrição | Acesso |
| :--- | :--- | :--- | :--- |
| `/donations` | **POST** | Publica um novo item para doação (requer *multipart/form-data* e autenticação). | Protegido (JWT) |
| `/donations` | **GET** | Lista todas as doações disponíveis (Feed da Home). | Público |
| `/donations/my` | **GET** | Retorna a lista de doações criadas pelo usuário logado (Minhas Doações no Perfil). | Protegido (JWT) |
| `/donations/:id` | **GET** | Retorna os detalhes de uma doação específica. | Público |