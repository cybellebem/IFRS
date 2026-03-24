const express = require("express");
const router = express.Router();
const receitasController = require("../controllers/receitasController");

router.get("/", receitasController.listar);

router.get("/:id", receitasController.buscarPorId);

router.post("/", receitasController.adicionar);

router.put("/:id", receitasController.atualizar);

router.delete("/:id", receitasController.deletar);

module.exports = router;