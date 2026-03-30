const mongoose = require("mongoose");
// Função para conectar ao MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/relacional_api");
        console.log("Conectado ao MongoDB com sucesso!");
    } catch (err) {
        console.error("Erro ao conectar ao MongoDB:", err);
        process.exit(1);
    }
};
module.exports = connectDB;