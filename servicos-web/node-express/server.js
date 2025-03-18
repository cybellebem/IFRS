const express = require("express");
// Cria uma instância do aplicativo Express
const app = express();
// Define a porta em que o servidor irá rodar
const PORT = 3000;
// Define uma rota GET para o caminho raiz ("/")
app.get("/", (req, res) => {
    // Envia uma resposta em JSON para o cliente
    res.json({ message: "Olá, Mundo!" });
});
// Inicia o servidor e faz com que ele escute na porta definida
app.listen(PORT, () => {
    // Exibe uma mensagem no console informando que o servidor está em execução
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});