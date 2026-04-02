const express = require("express");
const router = express.Router();
const controller = require("../controllers/jogadoresController");

router.get("/", controller.listar);
router.post("/", controller.adicionar);

module.exports = router;