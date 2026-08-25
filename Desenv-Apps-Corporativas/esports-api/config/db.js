const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "cyb",
  password: "123",
  database: "esports_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = db;
