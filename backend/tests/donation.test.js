// ARQUIVO: backend/tests/donation.test.js (FINAL CORRIGIDO)

const supertest = require('supertest');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Donation = require('../src/models/Donation');

const app = require('../src/index');
const request = supertest(app);

// Usuário e token que serão gerados no teste de autenticação
let token;
let userId;
let donationId; 

// Dados de teste
const testUser = {
    name: 'Doador Teste',
    email: 'doador.teste@doamais.com',
    password: 'senha12345'
};
const testDonation = {
    title: 'Cadeira de Escritório',
    description: 'Cadeira ergonômica usada, em bom estado.',
    category: 'moveis', 
    location: 'Aldeota',
    contact: '85998765432'
};

// --- Configuração e Limpeza ---
beforeAll(async () => {
    // 1. Limpar e Registrar o usuário de teste (necessário para obter token e ID)
    await User.deleteMany({ email: testUser.email });
    await Donation.deleteMany({ title: testDonation.title });
    
    const registerRes = await request.post('/api/auth/register').send(testUser);
    
    token = registerRes.body.token;
    userId = registerRes.body.user.id;
});

afterAll(async () => {
    await User.deleteMany({ email: testUser.email });
    await Donation.deleteMany({ _id: donationId });
});

// --- GRUPO DE TESTES: DOAÇÕES PROTEGIDAS (POST /api/donations) ---
describe('POST /api/donations (Criação)', () => {

    test('Deve criar uma doação com sucesso e retornar 201', async () => {
        const response = await request
            .post('/api/donations')
            .set('Authorization', `Bearer ${token}`) 
            .field('title', testDonation.title)
            .field('description', testDonation.description)
            .field('category', testDonation.category)
            .field('location', testDonation.location)
            .field('contact', testDonation.contact)
            .attach('images', Buffer.alloc(0), 'fake.jpg')
            .expect(201);
            
        donationId = response.body.data._id; 

        expect(response.body.success).toBe(true);
        expect(response.body.data.title).toBe(testDonation.title);
        expect(response.body.data.user.toString()).toBe(userId);
    });

    test('Deve falhar se a categoria estiver ausente (status 400)', async () => {
        const response = await request
            .post('/api/donations')
            .set('Authorization', `Bearer ${token}`)
            .field('title', 'Item Sem Categoria')
            .field('description', 'x')
            .field('contact', testDonation.contact)
            .field('location', testDonation.location)
            .attach('images', Buffer.alloc(0), 'fake.jpg')
            .expect(400); 
            
        expect(response.body.success).toBe(false);
        // 🚀 CORREÇÃO FINAL: Esperar a mensagem em português do Model
        expect(response.body.message).toContain('A categoria é obrigatória.'); 
    });

    test('Deve negar a publicação se não houver token (status 401)', async () => {
        await request
            .post('/api/donations')
            .send(testDonation)
            .expect(401);
    });
});


// --- GRUPO DE TESTES: VISUALIZAÇÃO PÚBLICA (GET /api/donations) ---
describe('GET /api/donations', () => {

    test('Deve listar todas as doações e retornar status 200', async () => {
        const response = await request
            .get('/api/donations')
            .expect(200);
            
        expect(response.body.success).toBe(true);
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.count).toBeGreaterThan(0);
    });
});


// --- GRUPO DE TESTES: DETALHES E MINHAS DOAÇÕES ---
describe('VISUALIZAÇÃO /api/donations/:id e /my', () => {

    test('GET /api/donations/:id deve retornar os detalhes do item (status 200)', async () => {
        if (!donationId) throw new Error("Dependência: donationId não foi gerado.");
        
        const response = await request
            .get(`/api/donations/${donationId}`)
            .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.title).toBe(testDonation.title);
    });
    
    test('GET /api/donations/:id deve retornar 404 para ID inexistente', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        await request
            .get(`/api/donations/${fakeId}`)
            .expect(404);
    });

    test('GET /api/donations/my deve retornar apenas as doações do usuário logado (status 200)', async () => {
        if (!donationId) throw new Error("Dependência: donationId não foi gerado.");

        const response = await request
            .get('/api/donations/my')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.length).toBe(1);
        expect(response.body.data[0].user.toString()).toBe(userId);
    });
});