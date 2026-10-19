require("dotenv").config();
const fs = require("node:fs/promises");
const path = require("node:path");
const mysql = require("mysql2/promise");

const DDL_FILE = path.join(__dirname, "ddl.sql");
const DML_FILE = path.join(__dirname, "dml.sql");

/**
 * Abre uma conexão com o servidor MySQL sem selecionar banco,
 * permitindo executar vários comandos SQL de uma vez.
 * @returns {Promise<import("mysql2/promise").Connection>}
 */
function createServerConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    multipleStatements: true,
  });
}

/**
 * Executa o conteúdo de um arquivo .sql.
 * @param {import("mysql2/promise").Connection} connection
 * @param {string} filePath Caminho do arquivo SQL.
 */
async function runSqlFile(connection, filePath) {
  const sql = await fs.readFile(filePath, "utf8");
  await connection.query(sql);
}

/**
 * Executa uma tarefa com uma conexão aberta, garantindo seu fechamento.
 * @param {(connection: import("mysql2/promise").Connection) => Promise<void>} task
 */
async function withConnection(task) {
  let connection;
  try {
    connection = await createServerConnection();
    await task(connection);
  } catch (error) {
    console.error("Erro no banco de dados:", error.message);
    process.exitCode = 1;
  } finally {
    if (connection) await connection.end();
  }
}

module.exports = { DDL_FILE, DML_FILE, runSqlFile, withConnection };
