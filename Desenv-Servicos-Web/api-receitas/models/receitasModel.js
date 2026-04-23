const connection = require("../config/db");

exports.buscarTodos = (callback) => {
    connection.query("SELECT * FROM receitas", callback);
};

exports.buscarPorId = (id, callback) => {
    connection.query("SELECT * FROM receitas WHERE id = ?", [id], callback);
};

exports.inserir = ({ nome, descricao, ingredientes, modo_preparo, tempo_preparo, dificuldade }, callback) => {
    const sql = "INSERT INTO receitas (nome, descricao, ingredientes, modo_preparo, tempo_preparo, dificuldade) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(sql, [nome, descricao, ingredientes, modo_preparo, tempo_preparo, dificuldade ], callback);
};

exports.atualizar = (id, { nome, descricao, ingredientes, modo_preparo, tempo_preparo, dificuldade }, callback) => {
    const sql = "UPDATE receitas SET nome = ?, descricao = ?, ingredientes = ?, modo_preparo = ?, tempo_preparo = ?, dificuldade = ? WHERE id = ?";
    connection.query(sql, [nome, descricao, ingredientes, modo_preparo, tempo_preparo, dificuldade, id], callback);
};

exports.deletar = (id, callback) => {
    connection.query("DELETE FROM receitas WHERE id = ?", [id], callback);
};