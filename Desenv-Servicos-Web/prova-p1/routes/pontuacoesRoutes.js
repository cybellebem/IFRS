const express = require("express");
const router = express.Router();
const controller = require("../controllers/pontuacoesController");

router.post("/", controller.adicionar);
router.get("/ranking/:idJogo", controller.buscarPorId);
router.get("/jogos/populares", controller.listar);

module.exports = router;