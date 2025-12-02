// ARQUIVO: backend/src/models/Donation.js

const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    // 1. Doador (Ligação com o Model de Usuário)
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    // 2. Informações do Item (Enviado pelo Formulário)
    title: {
        type: String,
        required: [true, 'O título é obrigatório.'],
        trim: true,
        maxlength: [100, 'O título não pode ter mais de 100 caracteres.']
    },
    description: {
        type: String,
        required: [true, 'A descrição é obrigatória.']
    },
    category: {
        type: String,
        required: [true, 'A categoria é obrigatória.'],
        enum: ['moveis', 'roupas', 'eletronicos', 'livros', 'outros']
    },
    location: {
        type: String,
        required: [true, 'A localização é obrigatória.']
    },
    contact: {
        type: String, // Telefone/WhatsApp
        required: [true, 'O contato (Telefone/WhatsApp) é obrigatório.']
    },
    // 3. Imagens (Urls após o upload)
    imageUrls: {
        type: [String], // Array de Strings (URLs)
        validate: {
            validator: function(v) {
                return v && v.length <= 2; // Máximo de 2 imagens, conforme requisito do Frontend
            },
            message: 'Você deve anexar no máximo 2 fotos.'
        }
    },
    // 4. Metadados
    status: {
        type: String,
        enum: ['Disponível', 'Reservado', 'Doado'],
        default: 'Disponível'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Donation', DonationSchema);