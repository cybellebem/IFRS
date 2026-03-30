const mongoose = require("mongoose");
// Esquema da coleção 'pedidos', com referência à coleção 'clientes'
const pedidoSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cliente",
        required: true
    },
    dataPedido: {
        type: Date,
        default: Date.now
    },
    valorTotal: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model("Pedido", pedidoSchema);