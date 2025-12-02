// ARQUIVO: backend/src/middleware/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

// Função que será usada em todas as rotas protegidas (Ex: Publicar Item)
exports.protect = async (req, res, next) => {
    let token;

    // 1. Verificar se o token existe no header (formato: Bearer <token>)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Extrai o token da string 'Bearer <token>'
        token = req.headers.authorization.split(' ')[1];
    }
    
    // Se não houver token, o acesso é negado
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Acesso negado. Token não encontrado.' 
        });
    }

    try {
        // 2. Verificar e decodificar o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Anexar o usuário à requisição (req.user)
        // Isso permite saber quem é o doador na rota de publicação
        req.user = await User.findById(decoded.id);

        if (!req.user) {
             return res.status(401).json({ 
                success: false, 
                message: 'Acesso negado. Usuário do token não existe.' 
            });
        }
        
        next(); // Continua para o próximo middleware/controller

    } catch (err) {
        console.error('Erro de validação do token:', err);
        return res.status(401).json({ 
            success: false, 
            message: 'Acesso negado. Token inválido ou expirado.' 
        });
    }
};