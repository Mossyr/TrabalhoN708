// ARQUIVO: backend/src/routes/auth.js (COMPLETO)

const express = require('express');
// Importa as funções do authController.js
const { registerUser, loginUser, getMe } = require('../controllers/authController'); 
const { protect } = require('../middleware/auth'); // Importar middleware de proteção

const router = express.Router();

// Rotas públicas
router.post('/register', registerUser);
router.post('/login', loginUser); 

// Rota protegida para obter o perfil
router.get('/me', protect, getMe); 

module.exports = router;