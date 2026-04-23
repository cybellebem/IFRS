const jogadorModel = require("../models/jogador.model");

exports.buscarTodos = async (req, res) => {
    try {
        const jogadores = await jogadorModel.buscarTodos();
        return res.json(jogadores);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

exports.inserir = async (req, res) => {
    try {
        const { nome, nickname } = req.body;

        if (!nome?.trim() || !nickname?.trim()) {
            return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
        }

        const existente = await jogadorModel.buscarPorNickname(nickname);

        if (existente) {
            return res.status(400).json({
                erro: "Nickname já está em uso"
            });
        }

        const result = await jogadorModel.inserir(req.body);

        return res.status(201).json({
            mensagem: "Jogador adicionado com sucesso",
            id: result.insertId
        });

    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};