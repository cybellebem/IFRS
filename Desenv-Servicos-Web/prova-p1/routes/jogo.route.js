const express = require("express");
const router = express.Router();
const controller = require("../controllers/jogo.controller");

// GET /jogos: responsável por retornar a lista de todos os jogos cadastrados;
router.get("/", controller.buscarTodos);

// GET /jogos/:id: responsável por retornar os dados de um jogo específico, com base em seu identificador;
router.get("/:id", controller.buscarPorId);

// POST /jogos: responsável por cadastrar um novo jogo;
router.post("/", controller.inserir);

// PUT /jogos/:id: responsável por atualizar os dados de um jogo existente;
router.put("/:id", controller.atualizar);

// DELETE /jogos/:id: responsável por excluir um jogo previamente cadastrado.
router.delete("/:id", controller.deletar);

module.exports = router;