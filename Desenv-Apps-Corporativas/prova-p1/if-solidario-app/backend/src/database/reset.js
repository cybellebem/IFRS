require("dotenv").config();
const mysql = require("mysql2/promise");

async function resetDatabase() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    console.log("Conectado ao MySQL.");

    console.log("Apagando banco de dados...");

    await connection.query(`
      DROP DATABASE IF EXISTS voluntariado
    `);

    console.log("Banco apagado.");

    await connection.query(`
      CREATE DATABASE voluntariado
    `);

    await connection.query(`
      USE voluntariado
    `);

    console.log("Banco recriado.");

    await connection.query(`
      CREATE TABLE usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(150) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL,
        cargo ENUM('admin', 'user') NOT NULL DEFAULT 'user'
      )
    `);

    await connection.query(`
      CREATE TABLE eventos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(150) NOT NULL,
        descricao TEXT NOT NULL,
        data DATE NOT NULL,
        local VARCHAR(200) NOT NULL,
        maximo_voluntarios INT NOT NULL
      )
    `);

    await connection.query(`
      CREATE TABLE voluntarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(150) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        celular VARCHAR(20) NULL
      )
    `);

    await connection.query(`
      CREATE TABLE eventos_voluntarios (
        evento_id INT NOT NULL,
        voluntario_id INT NOT NULL,

        PRIMARY KEY (evento_id, voluntario_id),

        FOREIGN KEY (evento_id)
          REFERENCES eventos(id)
          ON DELETE CASCADE,

        FOREIGN KEY (voluntario_id)
          REFERENCES voluntarios(id)
          ON DELETE CASCADE
      )
    `);

    console.log("Tabelas recriadas.");

    console.log("Banco resetado com sucesso!");
  } catch (error) {
    console.error("Erro ao resetar banco:", error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

resetDatabase();
