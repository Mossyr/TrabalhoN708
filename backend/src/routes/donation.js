// ARQUIVO: backend/src/routes/donation.js (COMPLETO)

const express = require('express');
const router = express.Router();
const multer = require('multer');

const { protect } = require('../middleware/auth'); // Middleware de proteção
const { createDonation, getDonations, getDonation, getMyDonations } = require('../controllers/donationController'); // Importa getMyDonations

// Configuração do Multer para upload em disco
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limite de 5MB por arquivo
}).array('images', 2); // 'images' é o nome do campo no Frontend, Máx 2 arquivos


// Rotas de Doação:

// 1. Rota de Publicação (PROTEGIDA e COM UPLOAD DE ARQUIVO)
router.post('/', protect, upload, createDonation); 

// 2. Rota para Minhas Doações (PROTEGIDA) - **NOVA ROTA NECESSÁRIA PARA O PERFIL**
router.get('/my', protect, getMyDonations);

// 3. Rota de Listagem GERAL (PÚBLICA)
// Esta rota deve vir DEPOIS de rotas mais específicas, como '/my'
router.get('/', getDonations);

// 4. Rota de Detalhes (PÚBLICA)
router.get('/:id', getDonation);


module.exports = router;