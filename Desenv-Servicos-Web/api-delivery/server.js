const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
res.json({ message: "Bem-vindo à API de Juros Delivery!" });
});

// Exemplo: /delivery/8
app.get("/delivery/:distancia", (req, res) => {
    let distancia = Number(req.params.distancia);
    let tempo;

    if (isNaN(distancia) || distancia < 0){
        return res.status(400).json({
            sucesso: false,
            mensagem: "Distância inválida. Informe um número positivo."
        });
    }


    if (distancia <= 5) {
        tempo = 20;
    } else if (distancia <= 10) {
        tempo = 40;
    } else {
        tempo = 60;
    }

    res.json({
        sucesso: true,
        distancia: distancia,
        tempo: tempo
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});