const Cliente = require("../models/Cliente");
// Cria um novo cliente
exports.criarCliente = async (req, res) => {
    try {
        const cliente = new Cliente(req.body);
        await cliente.save();
        res.status(201).json(cliente);
    } catch (err) {
        res.status(400).json({ message: "Erro ao criar cliente", err });
    }
};
// Lista todos os clientes
exports.listarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.status(200).json(clientes);
    } catch (err) {
        res.status(500).json({ message: "Erro ao listar clientes", err });
    }
};