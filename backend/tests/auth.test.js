// ARQUIVO: backend/tests/auth.test.js

const supertest = require('supertest');
const mongoose = require('mongoose');
const User = require('../src/models/User'); // Importa o Model de Usuário

// ⚠️ ATENÇÃO: É NECESSÁRIO QUE O SEU ARQUIVO INDEX.JS EXPORTE O APP 
// PARA SER IMPORTADO AQUI. Adicione 'module.exports = app;' no final de index.js

// O arquivo de entrada do Express deve ser importado para ser testado
const app = require('../src/index'); 
const request = supertest(app);

// Usuário de teste
const testUser = {
    name: 'Teste Jest',
    email: 'teste.jest@doamais.com',
    password: 'senha12345'
};

// --- Configuração dos Testes ---

// Antes de todos os testes, conecta ao DB (se ainda não estiver conectado)
// E garante que o usuário de teste seja removido para um ambiente limpo.
beforeAll(async () => {
    // Garante que o usuário de teste não exista antes de rodar os testes
    await User.deleteOne({ email: testUser.email });
});

// Após todos os testes, o usuário de teste é removido
afterAll(async () => {
    await User.deleteOne({ email: testUser.email });
    // Opcional: Desconecta o Mongoose
    // await mongoose.connection.close(); 
});


// --- GRUPO DE TESTES: REGISTRO (/api/auth/register) ---

describe('POST /api/auth/register', () => {
    
    // Teste 1: Registro bem-sucedido
    test('Deve registrar um novo usuário e retornar um token (status 201)', async () => {
        const response = await request
            .post('/api/auth/register')
            .send(testUser)
            .expect(201); // Espera o código de criação 201
            
        // Verifica se a resposta contém os campos esperados
        expect(response.body.success).toBe(true);
        expect(response.body.token).toBeDefined();
        expect(response.body.user.email).toBe(testUser.email);
    });

    // Teste 2: Recusa registro duplicado
    test('Deve falhar ao tentar registrar o mesmo usuário duas vezes (status 400)', async () => {
        const response = await request
            .post('/api/auth/register')
            .send(testUser)
            .expect(400); // Espera o código de erro do cliente 400
            
        expect(response.body.success).toBe(false);
        expect(response.body.message).toMatch(/já existe um usuário cadastrado/i);
    });

    // Teste 3: Falha por campos obrigatórios (Bad Request)
    test('Deve falhar se a senha estiver ausente (status 400)', async () => {
        const response = await request
            .post('/api/auth/register')
            .send({ name: 'Incompleto', email: 'falha@teste.com' })
            .expect(400); 
            
        expect(response.body.success).toBe(false);
    });
});


// --- GRUPO DE TESTES: LOGIN (/api/auth/login) ---

describe('POST /api/auth/login', () => {
    
    // Teste 4: Login bem-sucedido
    test('Deve logar o usuário e retornar um token (status 200)', async () => {
        const response = await request
            .post('/api/auth/login')
            .send({ email: testUser.email, password: testUser.password })
            .expect(200); // Espera o código de sucesso 200
            
        expect(response.body.success).toBe(true);
        expect(response.body.token).toBeDefined();
    });

    // Teste 5: Login falha com senha incorreta
    test('Deve falhar o login com senha incorreta (status 401)', async () => {
        const response = await request
            .post('/api/auth/login')
            .send({ email: testUser.email, password: 'senha_errada' })
            .expect(401); // Espera o código de Não Autorizado 401
            
        expect(response.body.success).toBe(false);
        expect(response.body.message).toMatch(/Credenciais inválidas/i);
    });

    // Teste 6: Login falha com e-mail inexistente
    test('Deve falhar o login com e-mail que não existe (status 401)', async () => {
        const response = await request
            .post('/api/auth/login')
            .send({ email: 'naoexiste@teste.com', password: 'qualquer_senha' })
            .expect(401); 
            
        expect(response.body.success).toBe(false);
        expect(response.body.message).toMatch(/Credenciais inválidas/i);
    });
});