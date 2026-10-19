const { DDL_FILE, DML_FILE, runSqlFile, withConnection } = require("./runner");

/**
 * Apaga o banco, recria a estrutura e insere novamente os dados fictícios.
 */
withConnection(async (connection) => {
  await connection.query("DROP DATABASE IF EXISTS voluntariado");
  console.log("Banco apagado.");

  await runSqlFile(connection, DDL_FILE);
  await runSqlFile(connection, DML_FILE);

  console.log("Banco resetado com sucesso!");
});
