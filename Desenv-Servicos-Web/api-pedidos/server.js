const express = require("express");
const connectDB = require("./config/db");
const clienteRoutes = require("./routes/clienteRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const app = express();

const PORT = 3000;
// Conecta ao banco de dados MongoDB
connectDB();
// Middleware para tratar JSON
app.use(express.json());
// Rotas principais
app.use("/clientes", clienteRoutes);
app.use("/pedidos", pedidoRoutes);
// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});