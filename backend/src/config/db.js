// ARQUIVO: backend/src/config/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // A MONGO_URI é lida do seu arquivo .env
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Conectado: ${conn.connection.host}`);
        
    } catch (error) {
        console.error(`Erro ao conectar ao MongoDB: ${error.message}`);
        // Termina o processo em caso de falha crítica
        process.exit(1); 
    }
};

module.exports = connectDB;