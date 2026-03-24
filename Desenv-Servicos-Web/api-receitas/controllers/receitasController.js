const receitasModel = require("../models/receitasModel");

exports.listar = (req, res) => {
    receitasModel.buscarTodos((err, results) => {
        if (err) return res.status(500).send("Erro ao listar receitas");
        res.json(results);
    });
};

exports.buscarPorId = (req, res) => {
    receitasModel.buscarPorId(req.params.id, (err, results) => {
        if (err) return res.status(500).send("Erro ao buscar receita");
        if (results.length === 0) return res.status(404).send("Receita não encontrada");
        res.json(results[0]);
    });
};

exports.adicionar = (req, res) => {
    const { nome, descricao, ingredientes, modo_preparo, tempo_preparo, dificuldade } = req.body;

    if (!nome || !descricao || !ingredientes || !modo_preparo || tempo_preparo == null || !dificuldade) {
        return res.status(400).send("Todos os campos são obrigatórios.");
    }

    receitasModel.inserir(req.body, (err, result) => {
        if (err) {
            console.error("Erro ao adicionar receita:", err);
            return res.status(500).send("Erro ao adicionar receita");
        }

        res.status(201).json({
            mensagem: "Receita adicionada com sucesso",
            id: result.insertId
        });
    });
};

exports.atualizar = (req, res) => {
    const { nome, descricao, ingredientes, modo_preparo, tempo_preparo, dificuldade } = req.body;
    if (!nome || !descricao || !ingredientes || !modo_preparo || !tempo_preparo || !dificuldade) {
        return res.status(400).send("Todos os campos são obrigatórios.");
    }
    receitasModel.atualizar(req.params.id, req.body, (err, result) => {
        if (err) return res.status(500).send("Erro ao atualizar receita");
        if (result.affectedRows === 0) return res.status(404).send("Receita não encontrada");
        res.send("Receita atualizada com sucesso");
    });
};

exports.deletar = (req, res) => {
    receitasModel.deletar(req.params.id, (err, result) => {
        if (err) return res.status(500).send("Erro ao deletar receita");
        if (result.affectedRows === 0) return res.status(404).send("Receita não encontrado");
        res.send("Receita deletada com sucesso");
    });
};