require("dotenv").config();

const app = require("./app");
const database = require("./config/database");

const PORT = process.env.PORT || 3000;

/**
 * Verifica a conexão com o banco e inicia o servidor HTTP.
 */
async function startServer() {
  if (!process.env.JWT_SECRET) {
    console.error("Variável JWT_SECRET não definida no .env.");
    process.exit(1);
  }

  try {
    await database.query("SELECT 1");
    console.log("Banco de dados conectado com sucesso!");

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log(`Documentação Swagger em http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error.message);
    process.exit(1);
  }
}

startServer();
