const jogoModel = require("../models/jogo.model");

const validarJogo = ({ nome, plataforma, ano_lancamento }) => {
    const anoAtual = new Date().getFullYear();

    if (!nome?.trim() || !plataforma?.trim() || !ano_lancamento?.trim()) {
        return "Todos os campos devem ser preenchidos";
    }

    const ano = Number(ano_lancamento);

    if (!Number.isInteger(ano)) {
        return "O ano deve ser um número inteiro";
    }

    if (ano > anoAtual) {
        return "O ano não pode ser no futuro";
    }

    return null;
};

exports.buscarTodos = async (req, res) => {
    try {
        const jogos = await jogoModel.buscarTodos();
        if (jogos.length === 0) {
            return res.status(404).json({ erro: "Nenhum jogo foi registrado ainda." });
        }
        return res.json(jogos);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

exports.buscarPorId = async (req, res) => {
    try {
        
        if (isNaN(req.params.id)) {
            return res.status(400).json({ erro: "ID deve ser um número." });
        }

        const jogo = await jogoModel.buscarPorId(req.params.id);

        if (!jogo) {
            return res.status(404).json({ erro: "Nenhum Jogo com esse ID foi encontrado" });
        }

        return res.json(jogo);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

exports.inserir = async (req, res) => {
    try {
        const erro = validarJogo(req.body);
        if (erro) {
            return res.status(400).json({ erro });
        }

        const result = await jogoModel.inserir(req.body);

        return res.status(201).json({
            mensagem: "Jogo criado com sucesso",
            id: result.insertId
        });
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const erro = validarJogo(req.body);
        if (erro) {
            return res.status(400).json({ erro });
        }

        const result = await jogoModel.atualizar(req.params.id, req.body);

        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: "Nenhum Jogo com esse ID foi encontrado" });
        }

        return res.json({ mensagem: "Jogo atualizado com sucesso" });
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

exports.deletar = async (req, res) => {
    try {
        const result = await jogoModel.deletar(req.params.id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: "Nenhum Jogo com esse ID foi encontrado" });
        }

        return res.json({ mensagem: "Jogo deletado com sucesso" });
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};