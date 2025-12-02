# Arquitetura Final Implementada - Projeto DoaMais

## 1. Visão Geral
A arquitetura final do DoaMais segue o modelo Cliente-Servidor (API RESTful). [cite_start]O sistema foi implementado como uma aplicação web responsiva unificada [cite: 17] que se comunica com um backend Node.js/Express e um banco de dados NoSQL.

## 2. Justificativas de Mudanças Arquiteturais

[cite_start]Conforme o requisito de justificar eventuais mudanças em relação ao planejamento original[cite: 36], as seguintes alterações foram feitas em relação à Etapa 1 (N705):

### 2.1. Tecnologia Frontend (React.js e React Native -> HTML/CSS/JS Puro Responsivo)

* [cite_start]**Mudança:** O desenvolvimento foi migrado de React.js (Web) e React Native (Mobile) [cite: 6, 8] para uma única **Aplicação Web Responsiva** usando HTML, CSS e JavaScript (Vanilla JS).
* [cite_start]**Justificativa:** A opção pelo Web App Responsivo prioriza a **acessibilidade** e a **usabilidade**, eliminando a barreira do download de aplicativos móveis[cite: 43]. [cite_start]Esta solução simplifica o *deploy* e a manutenção com uma única base de código, e cumpre o requisito de ser um sistema multiplataforma [cite: 2, 8] em termos de acesso.

### 2.2. Tecnologia de Banco de Dados (PostgreSQL -> MongoDB)

* **Mudança:** O banco de dados relacional (PostgreSQL, conforme planejado) foi substituído pelo **MongoDB (NoSQL)**.
* **Justificativa:** O MongoDB oferece **flexibilidade** de esquema para lidar com metadados de doações que podem variar, o que é ideal para o estágio de MVP (Produto Mínimo Viável) do projeto. Isso agiliza a prototipagem e a implementação da API no *stack* Node.js/Express/Mongoose.

## 3. Componentes Principais

* **Frontend:** HTML, CSS (Responsivo), JavaScript Puro (Vanilla JS).
* **Backend:** Node.js com Express.js.
* **Banco de Dados:** MongoDB (via Mongoose).
* **Autenticação:** JWT (JSON Web Tokens).
* **Upload de Arquivos:** Multer.