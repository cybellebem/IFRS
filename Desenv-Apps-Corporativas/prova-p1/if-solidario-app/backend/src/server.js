require("dotenv").config();

const app = require("./app");
const database = require("./config/database");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await database.query("SELECT 1");

    console.log("Banco de dados conectado com sucesso!");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
  }
}

startServer();
