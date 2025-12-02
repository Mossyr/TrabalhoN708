// ARQUIVO: backend/src/index.js (COMPLETO)

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const donationRoutes = require('./routes/donation');

// Carregar variáveis de ambiente do .env
dotenv.config();

// Conectar ao Banco de Dados (MongoDB)
connectDB();

const app = express();

// --- MIDDLEWARE ---
// 1. Habilita o CORS para permitir que o Frontend acesse a API
app.use(cors()); 

// 2. Body Parser (Permite que o Express leia o JSON enviado no corpo das requisições)
app.use(express.json()); 

// 3. Servir arquivos estáticos (upload de imagens)
// Esta linha torna a pasta 'uploads' (criada na raiz do backend) acessível publicamente via '/uploads'
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));


// --- MONTAR AS ROTAS ---
// Rota principal de Autenticação (/api/auth/register, /api/auth/login)
app.use('/api/auth', authRoutes);

// Rotas de Doações (/api/donations, /api/donations/:id)
app.use('/api/donations', donationRoutes); 


// Rota de Teste Simples (Raiz)
app.get('/', (req, res) => {
    res.send('API DoaMais Rodando... Conectada ao MongoDB.');
});


// --- INICIALIZAÇÃO DO SERVIDOR ---
const PORT = process.env.PORT || 3000; 

// Só inicia o listen se não estiver em ambiente de teste
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

// ⚠️ ESSENCIAL PARA TESTES: Exportar o app para o Jest/Supertest
module.exports = app;