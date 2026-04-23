const pool = require("../database/db");

exports.buscarRankingPorJogo = async (jogoId) => {
    const [rows] = await pool.query(`
        SELECT 
            p.id,
            p.pontuacao,
            p.data_registro,
            j.nome AS jogo,
            jog.nickname AS jogador
        FROM pontuacoes p
        JOIN jogos j ON p.jogo_id = j.id
        JOIN jogadores jog ON p.jogador_id = jog.id
        WHERE p.jogo_id = ?
        ORDER BY p.pontuacao DESC
        LIMIT 10
    `, [jogoId]);

    return rows;
};

exports.buscarJogosPopulares = async () => {
    const [rows] = await pool.query(`
        SELECT 
            j.id,
            j.nome,
            COUNT(p.id) AS total_pontuacoes
        FROM jogos j
        JOIN pontuacoes p ON p.jogo_id = j.id
        GROUP BY j.id
        ORDER BY total_pontuacoes DESC
        LIMIT 3
    `);

    return rows;
};

exports.inserir = async ({ jogo_id, jogador_id, pontuacao }) => {
    const [result] = await pool.query(`
        INSERT INTO pontuacoes (jogo_id, jogador_id, pontuacao)
        VALUES (?, ?, ?)
    `, [jogo_id, jogador_id, pontuacao]);

    return result;
};