const pool = require("../database/db");

exports.buscarTodos = async () => {
    const [rows] = await pool.query("SELECT * FROM jogos");
    return rows;
};

exports.buscarPorId = async (id) => {
    const [rows] = await pool.query("SELECT * FROM jogos WHERE id = ?", [id]);
    return rows[0];
};

exports.inserir = async (jogo) => {
    const [result] = await pool.query(
        "INSERT INTO jogos (nome, plataforma, ano_lancamento) VALUES (?, ?, ?)",
        [jogo.nome, jogo.plataforma, jogo.ano_lancamento]
    );
    return result;
};

exports.atualizar = async (id, jogo) => {
    const [result] = await pool.query(
        "UPDATE jogos SET nome = ?, plataforma = ?, ano_lancamento = ? WHERE id = ?",
        [jogo.nome, jogo.plataforma, jogo.ano_lancamento, id]
    );
    return result;
};

exports.deletar = async (id) => {
    const [result] = await pool.query(
        "DELETE FROM jogos WHERE id = ?",
        [id]
    );
    return result;
};