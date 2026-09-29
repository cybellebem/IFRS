require("dotenv").config();
const mysql = require("mysql2/promise");

async function initializeDatabase() {
  let connection;

  try {
    // Conecta no MySQL sem escolher um banco específico
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    console.log("Conectado ao MySQL.");

    // Cria o banco caso não exista
    await connection.query(`
      CREATE DATABASE IF NOT EXISTS voluntariado
    `);

    console.log("Banco 'voluntariado' verificado.");

    // Seleciona o banco
    await connection.query(`USE voluntariado`);

    // Tabela de usuários
    await connection.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(150) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL,
        cargo ENUM('admin', 'user') NOT NULL DEFAULT 'user'
      )
    `);

    // Tabela de eventos
    await connection.query(`
      CREATE TABLE IF NOT EXISTS eventos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(150) NOT NULL,
        descricao TEXT NOT NULL,
        data DATE NOT NULL,
        local VARCHAR(200) NOT NULL,
        maximo_voluntarios INT NOT NULL
      )
    `);

    // Tabela de voluntários
    await connection.query(`
      CREATE TABLE IF NOT EXISTS voluntarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(150) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        celular VARCHAR(20) NULL
      )
    `);

    // Tabela de relacionamento
    await connection.query(`
      CREATE TABLE IF NOT EXISTS eventos_voluntarios (
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

    console.log("Tabelas criadas/verificadas.");

    console.log("Banco de dados inicializado com sucesso!");
  } catch (error) {
    console.error("Erro ao inicializar banco:", error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

initializeDatabase();
