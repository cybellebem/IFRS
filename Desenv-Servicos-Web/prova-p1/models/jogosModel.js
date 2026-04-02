const connection = require("../config/db");

exports.buscarTodos = (callback) => {
    connection.query("SELECT * FROM jogos", callback);
};

exports.buscarPorId = (id, callback) => {
    connection.query("SELECT * FROM jogos WHERE id = ?", [id], callback);
};

exports.inserir = ({ nome, plataforma, ano_lancamento }, callback) => {
    const sql = "INSERT INTO jogos (nome, plataforma, ano_lancamento) VALUES (?, ?, ?)";
    connection.query(sql, [nome, plataforma, ano_lancamento], callback);
};

exports.atualizar = (id, { nome, plataforma, ano_lancamento },
    callback) => {
    const sql = "UPDATE jogos SET nome = ?, plataforma = ?, ano_lancamento = ? WHERE id = ?";
    connection.query(sql, [nome, plataforma, ano_lancamento, id], callback);
};

exports.deletar = (id, callback) => {
    connection.query("DELETE FROM jogos WHERE id = ?", [id], callback);
};