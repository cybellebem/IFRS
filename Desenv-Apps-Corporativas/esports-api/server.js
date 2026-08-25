const express = require("express");
const timesRoutes = require("./routes/times");

const app = express();

const PORT = 3000;

// Permite receber JSON no corpo das requisições
app.use(express.json());

// Rotas dos times
app.use("/times", timesRoutes);

// Rota inicial
app.get("/", (req, res) => {
  res.json({
    mensagem: "API de Times de E-sports funcionando!",
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor executando em http://localhost:${PORT}`);
});
