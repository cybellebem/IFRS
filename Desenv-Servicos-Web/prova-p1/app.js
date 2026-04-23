const express = require("express");

const jogoRoute = require("./routes/jogo.route");
const jogadorRoute = require("./routes/jogador.route");
const pontuacaoRoute = require("./routes/pontuacao.route");

const app = express();

app.use(express.json());

app.use("/jogos", jogoRoute);
app.use("/jogadores", jogadorRoute);
app.use("/pontuacoes", pontuacaoRoute);

app.use((req, res) => {
    res.status(404).json({ erro: "Rota não encontrada" });
});

module.exports = app;