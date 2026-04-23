const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

(async () => {
    try {
        const conn = await pool.getConnection();
        console.log("Banco conectado com sucesso");
        conn.release();
    } catch (err) {
        console.error("Erro ao conectar no banco:", err.message);
    }
})();

module.exports = pool;