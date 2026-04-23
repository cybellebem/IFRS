const pontuacaoModel = require("../models/pontuacao.model");
const jogoModel = require("../models/jogo.model");
const jogadorModel = require("../models/jogador.model");

exports.inserir = async (req, res) => {
    try {
        const { jogo_id, jogador_id, pontuacao } = req.body;

        if (!jogo_id?.trim() || !jogador_id?.trim()  || !pontuacao?.trim()) {
            return res.status(400).json({
                erro: "Todos os campos são obrigatórios"
            });
        }

        if (!Number.isInteger(jogo_id) || !Number.isInteger(jogador_id) || !Number.isInteger(pontuacao)) {
            return res.status(400).json({
                erro: "Jogo ID, Jogador ID e Pontuação devem ser números inteiros"
            });
        }

        if (pontuacao < 0) {
            return res.status(400).json({
                erro: "Pontuação não pode ser negativa"
            });
        }

        const jogoExiste = await jogoModel.buscarPorId(jogo_id);
        if (!jogoExiste) {
            return res.status(404).json({
                erro: "Jogo não encontrado"
            });
        }

        const jogadorExiste = await jogadorModel.buscarPorId(jogador_id);
        if (!jogadorExiste) {
            return res.status(404).json({
                erro: "Jogador não encontrado"
            });
        }

        const result = await pontuacaoModel.inserir(req.body);

        return res.status(201).json({
            mensagem: "Pontuação registrada com sucesso",
            id: result.insertId
        });

    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};


exports.buscarRanking = async (req, res) => {
    try {
        const idJogo = Number(req.params.idJogo);

        if (!Number.isInteger(idJogo)) {
            return res.status(400).json({ erro: "Jogo ID inválido" });
        }

        const jogoExiste = await jogoModel.buscarPorId(idJogo);

        if (!jogoExiste) {
            return res.status(404).json({ erro: "Jogo não encontrado" });
        }

        const ranking = await pontuacaoModel.buscarRankingPorJogo(idJogo);

        if (ranking.length === 0) {
            return res.status(404).json({ erro: "Nenhuma pontuação encontrada para este jogo" });
        }
        
        return res.json(ranking);

    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};


exports.buscarJogosPopulares = async (req, res) => {
    try {
        const jogos = await pontuacaoModel.buscarJogosPopulares();

        if (jogos.length === 0) {
            return res.status(404).json({ erro: "Nenhuma pontuação foi registrada ainda :( " });
        }

        return res.json(jogos);

    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};