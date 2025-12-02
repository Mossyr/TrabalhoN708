// ARQUIVO: backend/src/controllers/authController.js (CORRIGIDO E NOVO)

const User = require('../models/User'); 

// Função auxiliar para criar o token JWT e enviar a resposta
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    res.status(statusCode).json({
        success: true,
        token,
        user: { 
            id: user._id, 
            name: user.name, 
            email: user.email 
        } 
    });
};

// @desc    Registrar um novo usuário
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ 
                success: false, 
                message: 'Já existe um usuário cadastrado com este e-mail.' 
            });
        }

        user = await User.create({
            name,
            email,
            password 
        });

        sendTokenResponse(user, 201, res);

    } catch (error) {
        console.error('Erro no registro:', error);
        
        // ⚠️ TRATAMENTO DE ERRO: Validação Mongoose para o Teste
        if (error.name === 'ValidationError') {
            const message = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ 
                success: false,
                message: message.join(', ')
            });
        }
        
        res.status(500).json({ 
            success: false, 
            message: 'Erro interno do servidor ao registrar o usuário.' 
        });
    }
};

// @desc    Logar usuário
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 
            success: false, 
            message: 'Por favor, forneça e-mail e senha.' 
        });
    }

    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Credenciais inválidas. (E-mail não encontrado)' 
            });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                message: 'Credenciais inválidas. (Senha incorreta)' 
            });
        }

        sendTokenResponse(user, 200, res);

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erro interno do servidor ao tentar logar.' 
        });
    }
};

// @desc    Obter dados do usuário logado (Meu Perfil)
// @route   GET /api/auth/me
// @access  Private (Protegido por token)
exports.getMe = async (req, res) => {
    const user = await User.findById(req.user.id); 

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Usuário não encontrado.'
        });
    }

    res.status(200).json({
        success: true,
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        }
    });
};