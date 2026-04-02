const jogosModel = require("../models/jogosModel");

exports.listar = (req, res) => {
    jogosModel.buscarTodos((err, results) => {
        if (err) return res.status(500).send("Erro ao listar jogos");
        res.json(results);
    });
};

exports.buscarPorId = (req, res) => {
    jogosModel.buscarPorId(req.params.id, (err, results) => {
        if (err) return res.status(500).send("Erro ao buscar jogo");
        if (results.length === 0) return res.status(404).send("Jogo não encontrado");
        res.json(results[0]);
    });
};

exports.adicionar = (req, res) => {
    const { nome, plataforma, ano_lancamento } = req.body;

    if (!nome || !plataforma || ano_lancamento == null) {
        return res.status(400).send("Todos os campos são obrigatórios.");
    }

    jogosModel.inserir(req.body, (err, result) => {
        if (err) {
            console.error("Erro ao adicionar jogo:", err);
            return res.status(500).send("Erro ao adicionar jogo");
        }

        res.status(201).json({
            mensagem: "Jogo adicionado com sucesso",
            id: result.insertId
        });
    });
};

exports.atualizar = (req, res) => {
    const { nome, plataforma, ano_lancamento } = req.body;
    if (!nome || !plataforma || ano_lancamento == null) {
        return res.status(400).send("Todos os campos são obrigatórios.");
    }
    jogosModel.atualizar(req.params.id, req.body, (err, result) => {
        if (err) return res.status(500).send("Erro ao atualizar jogo");
        if (result.affectedRows === 0) return res.status(404).send("Jogo não encontrado");
        res.send("Jogo atualizado com sucesso");
    });
};

exports.deletar = (req, res) => {
    jogosModel.deletar(req.params.id, (err, result) => {
        if (err) return res.status(500).send("Erro ao deletar jogo");
        if (result.affectedRows === 0) return res.status(404).send("Jogo não encontrado");
        res.send("Jogo deletado com sucesso");
    });
};