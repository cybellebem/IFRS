const pool = require("../database/db");

exports.buscarTodos = async () => {
    const [rows] = await pool.query("SELECT * FROM jogadores");
    return rows;
};

exports.buscarPorId = async (id) => {
    const [rows] = await pool.query("SELECT * FROM jogadores WHERE id = ?", [id]);
    return rows[0];
};

exports.buscarPorNickname = async (nickname) => {
    const [rows] = await pool.query(
        "SELECT * FROM jogadores WHERE nickname = ?",
        [nickname]
    );
    return rows[0];
};

exports.inserir = async (jogador) => {
    const [result] = await pool.query(
        "INSERT INTO jogadores (nome, nickname) VALUES (?, ?)",
        [jogador.nome, jogador.nickname]
    );
    return result;
};
