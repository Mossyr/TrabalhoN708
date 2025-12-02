// ARQUIVO: backend/src/controllers/donationController.js (FINAL CORRIGIDO E ROBUSTO)

const mongoose = require('mongoose');
const Donation = require('../models/Donation'); 

// @desc    Publicar um novo item para doação
// @route   POST /api/donations
// @access  Private (Apenas usuários logados)
exports.createDonation = async (req, res) => {
    const { title, description, category, location, contact } = req.body;
    const files = req.files;

    // 1. Validação do Arquivo (Feita manualmente pois Multer não é Mongoose)
    if (!files || files.length === 0) {
        return res.status(400).json({ 
            success: false, 
            message: 'Obrigatório anexar pelo menos uma imagem.' 
        });
    }

    const serverUrl = process.env.SERVER_URL || 'http://localhost:3000';
    const imageUrls = files.map(file => `${serverUrl}/uploads/${file.filename}`);

    try {
        // 2. Criação da Doação (A validação de campos obrigatórios é feita pelo Mongoose aqui)
        const newDonation = await Donation.create({
            user: req.user.id,
            title,
            description,
            category,
            location,
            contact,
            imageUrls
        });

        res.status(201).json({
            success: true,
            message: 'Item publicado com sucesso!',
            data: newDonation
        });

    } catch (error) {
        console.error('Erro na publicação da doação:', error);
        
        // ⚠️ CORREÇÃO: TRATAMENTO DE ERRO PARA VALIDATION ERROR DO MONGOOSE
        if (error.name === 'ValidationError') {
            // O Mongoose retorna erros específicos (Ex: Path `category` is required)
            const message = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ // Retorna 400 (Bad Request)
                success: false,
                message: message.join(', ')
            });
        }
        
        res.status(500).json({ 
            success: false, 
            message: 'Erro interno ao salvar a doação.' 
        });
    }
};

// @desc    Listar todos os itens de doação
// @route   GET /api/donations
// @access  Public (Qualquer um pode ver)
exports.getDonations = async (req, res) => {
    try {
        // Popula o campo 'user' para mostrar nome e email do doador
        const donations = await Donation.find().populate('user', 'name email').sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: donations.length,
            data: donations
        });
    } catch (error) {
        console.error('Erro ao listar doações:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erro interno ao buscar as doações.' 
        });
    }
};

// @desc    Obter detalhes de um item específico
// @route   GET /api/donations/:id
// @access  Public
exports.getDonation = async (req, res) => {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ 
            success: false, 
            message: 'ID inválido ou não fornecido.' 
        });
    }

    try {
        const donation = await Donation.findById(id).populate('user', 'name email');

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: `Doação com ID ${id} não encontrada.`
            });
        }

        res.status(200).json({
            success: true,
            data: donation
        });
    } catch (error) {
        console.error('Erro ao buscar doação:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erro interno ao buscar a doação.' 
        });
    }
};

// @desc    Obter todas as doações do usuário logado (My Donations)
// @route   GET /api/donations/my
// @access  Private (Protegido por token)
exports.getMyDonations = async (req, res) => {
    try {
        // Filtra por req.user.id, que foi anexado pelo middleware 'protect'
        const myDonations = await Donation.find({ user: req.user.id }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: myDonations.length,
            data: myDonations
        });
    } catch (error) {
        console.error('Erro ao listar minhas doações:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erro interno ao buscar minhas doações.' 
        });
    }
};