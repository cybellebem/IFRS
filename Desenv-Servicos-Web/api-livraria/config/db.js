const mysql = require("mysql2");
const connection = mysql.createConnection({
host: "localhost",
user: "seu_usuario", // seu usuário do MySQL
password: "sua_senha", // sua senha
database: "livraria_db",
});
connection.connect((err) => {
if (err) {
console.error("Erro ao conectar:", err);
return;
}
console.log("Conectado ao banco de dados com sucesso!");
});
module.exports = connection;