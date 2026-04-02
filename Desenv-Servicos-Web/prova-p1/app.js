const express = require("express");
const cors = require("cors");
require("dotenv").config();

const jogosRoutes = require("./routes/jogosRoutes");
const jogadoresRoutes = require("./routes/jogadoresRoutes");
const pontuacoesRoutes = require("./routes/pontuacoesRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/jogos", jogosRoutes);
app.use("/jogadores", jogadoresRoutes);
app.use("/", pontuacoesRoutes);

app.use((req, res) => {
    res.status(404).json({ erro: "Rota não encontrada" });
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta 3000`);
});