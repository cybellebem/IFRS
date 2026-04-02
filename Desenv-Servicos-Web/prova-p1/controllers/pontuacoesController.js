const jogadoresModel = require("../models/pontuacoesModel");

exports.buscarPorId = (req, res) => {
    jogadoresModel.buscarTodos((err, results) => {
        if (err) return res.status(500).send("Erro ao listar jogadores");
        res.json(results);
    });
};

exports.listar = (req, res) => {
    jogadoresModel.buscarTodos((err, results) => {
        if (err) return res.status(500).send("Erro ao listar jogadores");
        res.json(results);
    });
};

exports.adicionar = (req, res) => {
    const { nome, nickname } = req.body;

    if (!nome || !nickname ) {
        return res.status(400).send("Todos os campos são obrigatórios.");
    }

    jogadoresModel.inserir(req.body, (err, result) => {
        if (err) {
            console.error("Erro ao adicionar jogador:", err);
            return res.status(500).send("Erro ao adicionar jogador");
        }

        res.status(201).json({
            mensagem: "Jogador adicionado com sucesso",
            id: result.insertId
        });
    });
};