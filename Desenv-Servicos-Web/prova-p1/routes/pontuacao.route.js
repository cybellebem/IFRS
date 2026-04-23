const express = require("express");
const router = express.Router();
const controller = require("../controllers/pontuacao.controller");

// POST /pontuacoes: responsável por registrar uma nova pontuação;
router.post("/", controller.inserir);

// GET /pontuacoes/ranking/:idJogo: responsável por retornar o ranking dos jogadores para um jogo específico;
router.get("/ranking/:idJogo", controller.buscarRanking);

// GET /pontuacoes/jogos/populares: responsável por retornar os jogos com maior número de pontuações registradas.
router.get("/jogos/populares", controller.buscarJogosPopulares);

module.exports = router;