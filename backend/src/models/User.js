// ARQUIVO: backend/src/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Para hashear a senha com segurança
const jwt = require('jsonwebtoken'); // Para gerar o token de acesso

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'O nome é obrigatório.'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'O e-mail é obrigatório.'],
        unique: true, // Garante que não haverá dois usuários com o mesmo e-mail
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, 'Por favor, use um e-mail válido.'] // Regex para validação simples
    },
    password: {
        type: String,
        required: [true, 'A senha é obrigatória.'],
        minlength: 6,
        select: false // Não retorna o campo de senha em queries por padrão
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// MIDDLEWARE PRE-SAVE (Rodado antes de salvar o usuário no DB)
// Faz o Hash da senha antes de salvar
userSchema.pre('save', async function(next) {
    // Só faz o hash se o campo de senha foi modificado ou é novo
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// MÉTODO PERSONALIZADO: Gerar Token JWT
userSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '7d' // Token expira em 7 dias
    });
};

// MÉTODO PERSONALIZADO: Comparar a senha de login com o hash armazenado
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model('User', userSchema);