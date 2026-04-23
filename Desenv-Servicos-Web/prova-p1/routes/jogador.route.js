const express = require("express");
const router = express.Router();
const controller = require("../controllers/jogador.controller");

// GET /jogadores: responsável por retornar a lista de todos os jogadores cadastrados;
router.get("/", controller.buscarTodos);

// POST /jogadores: responsável por cadastrar um novo jogador.
router.post("/", controller.inserir);

module.exports = router;