# ♻️ PROJETO DOAMAIS: CONECTANDO DOADORES E DONATÁRIOS

**Equipe 36:** Moacir Cadmiel, Rangel Amaral, João Pedro, Paulo Ricardo 

O DoaMais é uma plataforma multiplataforma desenvolvida para conectar pessoas que desejam doar itens em bom estado com aquelas que precisam, promovendo a reutilização e combatendo o descarte irregular na cidade de Fortaleza, Ceará. O projeto está alinhado ao ODS 11: Cidades e Comunidades Sustentáveis.

---

## 1. Funcionalidades Implementadas

O sistema foi implementado como uma **Aplicação Web Responsiva** que suporta o ciclo completo de doação.

* **Autenticação:** Cadastro, Login e Logout seguros (JWT).
* **Publicação:** Criação de novos itens para doação (com upload de fotos).
* **Listagem:** Visualização de um feed geral de itens (Home).
* **Detalhes do Item:** Visualização de descrição, localização e contato (WhatsApp) do doador.
* **Perfil do Usuário:** Visualização de dados pessoais e das doações publicadas.
* **Status de Implementação:** COMPLETO.

## 2. Tecnologias Utilizadas

| Camada | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| **Frontend (Apresentação)** | HTML, CSS, JavaScript | Implementação **Responsiva** (Vanilla JS) |
| **Backend (Serviços)** | Node.js, Express.js | API RESTful |
| **Banco de Dados** | MongoDB (Mongoose) | Utilizado NoSQL para flexibilidade de esquema. |
| **Segurança/Auth** | JWT e BCryptjs | Token de Autenticação e Hash de Senha. |
| **Uploads** | Multer | Processamento de *multipart/form-data*. |

## 3. Arquitetura do Sistema

O sistema segue o modelo cliente-servidor (API RESTful). A principal alteração foi a unificação do Frontend em uma única aplicação web responsiva. Todos os componentes de código estão organizados nas pastas `frontend/web/` e `backend/src/`.

## 4. Instruções de Instalação e Execução

### Pré-requisitos
* Node.js (v18+)
* MongoDB Atlas ou Local (Credenciais em `.env`)

### Backend (Pasta `backend/`)
1.  Crie o arquivo `.env` na raiz da pasta `backend/` com `MONGO_URI` e `JWT_SECRET`.
2.  Instale as dependências: `npm install`
3.  Inicie o servidor: `npm run dev`

### Testes Automatizados (Obrigatório)
* Na pasta `backend/`, rode: `npm run test` (Confirma o sucesso de 13 testes de Autenticação e Doações).

### Frontend (Pasta `frontend/web/`)
1.  Abra o arquivo `index.html` em qualquer navegador moderno.

## 5. Acesso ao Sistema (Credenciais de Teste)

* **URL de Acesso:** `http://localhost:5500/frontend/web/index.html` (ou endereço de *deploy*)
* **Credenciais de Teste:**
    * **E-mail:** `teste@doamais.com`
    * **Senha:** `senha123`

## 6. Validação com Público-Alvo

* **Público-Alvo Específico:** Membros do Grupo de Voluntariado da Comunidade Local.
* **Resumo da Validação:** O sistema foi apresentado e validado por usuários de smartphone. O feedback principal resultou na modernização completa do CSS e na obrigatoriedade do campo Localização.
* **Ajustes Implementados:** Refatoração do Design/CSS e implementação da obrigatoriedade do campo "Localização" na publicação.

## 7. Equipe de Desenvolvimento

* Moacir Cadmiel Silva dos Santos (Matrícula: 2318038)
* Rangel Amaral Ferreira (Matrícula: 2327067)
* João Pedro Pereira Alves (Matrícula: 2326205)
* Paulo Ricardo de Castro Sousa (Matrícula: 2326189)