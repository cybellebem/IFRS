const connection = require("../config/db");

exports.buscarTodos = (callback) => {
    connection.query("SELECT * FROM jogadores", callback);
};

exports.inserir = ({ nome, nickname }, callback) => {
    const sql = "INSERT INTO jogos (nome, nickname) VALUES (?, ?)";
    connection.query(sql, [nome, nickname], callback);
};