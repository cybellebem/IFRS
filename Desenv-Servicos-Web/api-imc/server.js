const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
res.json({ message: "Bem-vindo à API de IMC!" });
});
// Rota básica de IMC
// Exemplo: /imc?peso=70&altura=1.75
app.get("/imc", (req, res) => {
    let peso = req.query.peso;
    let altura = req.query.altura;

    let imc = Math.round(peso / (altura * altura) *10 / 10);

    let categoria;
    if (imc < 18.5) {
        categoria = "Abaixo do peso";
    } else if (imc >= 18.5 && imc < 25) {
        categoria = "Peso normal";
    } else if (imc >= 25 && imc < 30) {
        categoria = "Sobrepeso";
    } else {
        categoria = "Obesidade";
    }

    res.send(`Seu IMC é ${imc} considerado ${categoria}`);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});