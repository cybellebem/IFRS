const mysql = require("mysql2/promise");

/** Pool de conexões MySQL compartilhado pelos models. */
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "voluntariado",
  port: process.env.DB_PORT,
});

module.exports = pool;
