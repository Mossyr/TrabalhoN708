# ♻️ PROJETO DOAMAIS: CONECTANDO DOADORES E DONATÁRIOS

[cite_start]**Equipe 49:** Moacir Cadmiel, Rangel Amaral, João Pedro, Paulo Ricardo [cite: 232, 237, 238]

[cite_start]O DoaMais é uma plataforma multiplataforma desenvolvida para conectar pessoas que desejam doar itens em bom estado com aquelas que precisam, promovendo a reutilização e combatendo o descarte irregular na cidade de Fortaleza, Ceará[cite: 241]. [cite_start]O projeto está alinhado ao ODS 11: Cidades e Comunidades Sustentáveis[cite: 37, 242].

---

## [cite_start]1. Funcionalidades Implementadas [cite: 118, 143]

O sistema foi implementado como uma **Aplicação Web Responsiva** que suporta o ciclo completo de doação.

* **Autenticação:** Cadastro, Login e Logout seguros (JWT).
* **Publicação:** Criação de novos itens para doação (com upload de fotos).
* **Listagem:** Visualização de um feed geral de itens (Home).
* **Detalhes do Item:** Visualização de descrição, localização e contato (WhatsApp) do doador.
* **Perfil do Usuário:** Visualização de dados pessoais e das doações publicadas.
* **Status de Implementação:** COMPLETO.

## [cite_start]2. Tecnologias Utilizadas [cite: 119, 147]

| Camada | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| **Frontend (Apresentação)** | HTML, CSS, JavaScript | Implementação **Responsiva** (Vanilla JS) |
| **Backend (Serviços)** | Node.js, Express.js | [cite_start]API RESTful [cite: 7] |
| **Banco de Dados** | MongoDB (Mongoose) | Utilizado NoSQL para flexibilidade de esquema. |
| **Segurança/Auth** | JWT e BCryptjs | Token de Autenticação e Hash de Senha. |
| **Uploads** | Multer | Processamento de *multipart/form-data*. |

## [cite_start]3. Arquitetura do Sistema [cite: 152]

[cite_start]O sistema segue o modelo cliente-servidor (API RESTful)[cite: 153]. A principal alteração foi a unificação do Frontend em uma única aplicação web responsiva. [cite_start]Todos os componentes de código estão organizados nas pastas `frontend/web/` e `backend/src/`[cite: 123].

## [cite_start]4. Instruções de Instalação e Execução [cite: 120]

### Pré-requisitos
* [cite_start]Node.js (v18+) [cite: 157]
* MongoDB Atlas ou Local (Credenciais em `.env`)

### Backend (Pasta `backend/`)
1.  Crie o arquivo `.env` na raiz da pasta `backend/` com `MONGO_URI` e `JWT_SECRET`.
2.  Instale as dependências: `npm install`
3.  Inicie o servidor: `npm run dev`

### [cite_start]Testes Automatizados (Obrigatório) [cite: 123]
* Na pasta `backend/`, rode: `npm run test` (Confirma o sucesso de 13 testes de Autenticação e Doações).

### Frontend (Pasta `frontend/web/`)
1.  Abra o arquivo `index.html` em qualquer navegador moderno.

## [cite_start]5. Acesso ao Sistema (Credenciais de Teste) [cite: 121]

* **URL de Acesso:** `http://localhost:5500/frontend/web/index.html` (ou endereço de *deploy*)
* **Credenciais de Teste:**
    * **E-mail:** `teste@doamais.com`
    * **Senha:** `senha123`

## [cite_start]6. Validação com Público-Alvo [cite: 164, 184]

**Esta seção será preenchida após a coleta de *feedback* na igreja.**

* [cite_start]**Público-Alvo Específico:** [Preencher com o nome da comunidade/entidade] [cite: 165, 185]
* [cite_start]**Resumo da Validação:** [Resumo do que foi testado e as conclusões] [cite: 166]
* [cite_start]**Ajustes Implementados:** [Liste os ajustes feitos no código baseado no feedback] [cite: 168, 187]

## [cite_start]7. Equipe de Desenvolvimento [cite: 169]

* Moacir Cadmiel Silva dos Santos (Matrícula: 2318038)
* Rangel Amaral Ferreira (Matrícula: 2327067)
* João Pedro Pereira Alves (Matrícula: 2326205)
* Paulo Ricardo de Castro Sousa (Matrícula: 2326189)