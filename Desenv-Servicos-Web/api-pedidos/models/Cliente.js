const mongoose = require("mongoose");
// Esquema da coleção 'clientes'
const clienteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});
module.exports = mongoose.model("Cliente", clienteSchema);