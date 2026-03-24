const express = require("express");
const app = express();
const receitasRoutes = require("./routes/receitas");

app.use(express.json());

app.use("/receitas", receitasRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});