const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
// Rotas para cliente
router.post("/", clienteController.criarCliente);
router.get("/", clienteController.listarClientes);
module.exports = router;