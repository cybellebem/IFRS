const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'abc123',
    database: 'prova_p1',
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool;