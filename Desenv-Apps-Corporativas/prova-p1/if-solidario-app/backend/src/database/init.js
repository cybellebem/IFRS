const { DDL_FILE, DML_FILE, runSqlFile, withConnection } = require("./runner");

/**
 * Cria banco e tabelas (se não existirem) e insere os dados fictícios
 * se o banco estiver vazio.
 */
withConnection(async (connection) => {
  await runSqlFile(connection, DDL_FILE);
  console.log("Banco e tabelas criados/verificados.");

  const [[{ total }]] = await connection.query("SELECT COUNT(*) AS total FROM usuarios");

  if (total === 0) {
    await runSqlFile(connection, DML_FILE);
    console.log("Dados fictícios inseridos.");
  }

  console.log("Banco de dados inicializado com sucesso!");
});
