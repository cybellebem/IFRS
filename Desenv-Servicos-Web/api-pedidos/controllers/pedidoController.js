const Pedido = require("../models/Pedido");
// Cria um novo pedido
exports.criarPedido = async (req, res) => {
    try {
        const pedido = new Pedido(req.body);
        await pedido.save();
        res.status(201).json(pedido);
    } catch (err) {
        res.status(400).json({ message: "Erro ao criar pedido", err });
    }
};
// Lista todos os pedidos com dados populados do cliente
exports.listarPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find().populate("cliente");
        res.status(200).json(pedidos);
    } catch (err) {
        res.status(500).json({ message: "Erro ao listar pedidos", err });
    }
};
// 🔍 Busca com filtros por cliente e valor mínimo
exports.buscarPedidos = async (req, res) => {
    const { clienteId, valorMinimo } = req.query;
    let filtro = {};
    if (clienteId) {
        filtro.cliente = clienteId;
    }
    if (valorMinimo) {
        filtro.valorTotal = { $gte: parseFloat(valorMinimo) };
    }
    try {
        const pedidos = await Pedido.find(filtro).populate("cliente");
        res.status(200).json(pedidos);
    } catch (err) {
        res.status(500).json({
            message: "Erro ao buscar pedidos com filtro", err
        });
    }
};