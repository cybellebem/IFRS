const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET /times
// Lista todos os times ou pesquisa por jogo
router.get("/", (req, res) => {
  const { jogo } = req.query;

  let sql = "SELECT * FROM times";
  let params = [];

  if (jogo) {
    sql += " WHERE jogo = ?";
    params.push(jogo);
  }

  sql += " ORDER BY id";

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        erro: "Erro ao consultar os times",
      });
    }

    res.status(200).json(results);
  });
});

// GET /times/:id
// Consulta um time pelo ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM times WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        erro: "Erro ao consultar o time",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        erro: "Time não encontrado",
      });
    }

    res.status(200).json(results[0]);
  });
});

// POST /times
// Cadastra um novo time
router.post("/", (req, res) => {
  const { nome, jogo, pais, ano_fundacao } = req.body;

  if (!nome || !jogo || !pais || !ano_fundacao) {
    return res.status(400).json({
      erro: "Todos os campos são obrigatórios",
    });
  }

  const sql = `
        INSERT INTO times
        (nome, jogo, pais, ano_fundacao)
        VALUES (?, ?, ?, ?)
    `;

  const params = [nome, jogo, pais, ano_fundacao];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        erro: "Erro ao cadastrar o time",
      });
    }

    res.status(201).json({
      mensagem: "Time cadastrado com sucesso",
      id: result.insertId,
    });
  });
});

// PUT /times/:id
// Atualiza um time
router.put("/:id", (req, res) => {
  const { id } = req.params;

  const { nome, jogo, pais, ano_fundacao } = req.body;

  if (!nome || !jogo || !pais || !ano_fundacao) {
    return res.status(400).json({
      erro: "Todos os campos são obrigatórios",
    });
  }

  // Primeiro verifica se o time existe
  const sqlBusca = "SELECT * FROM times WHERE id = ?";

  db.query(sqlBusca, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        erro: "Erro ao consultar o time",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        erro: "Time não encontrado",
      });
    }

    const sqlUpdate = `
            UPDATE times
            SET nome = ?,
                jogo = ?,
                pais = ?,
                ano_fundacao = ?
            WHERE id = ?
        `;

    const params = [nome, jogo, pais, ano_fundacao, id];

    db.query(sqlUpdate, params, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          erro: "Erro ao atualizar o time",
        });
      }

      res.status(200).json({
        mensagem: "Time atualizado com sucesso",
      });
    });
  });
});

// DELETE /times/:id
// Exclui um time
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  // Verifica se o time existe
  const sqlBusca = "SELECT * FROM times WHERE id = ?";

  db.query(sqlBusca, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        erro: "Erro ao consultar o time",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        erro: "Time não encontrado",
      });
    }

    const sqlDelete = "DELETE FROM times WHERE id = ?";

    db.query(sqlDelete, [id], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          erro: "Erro ao excluir o time",
        });
      }

      res.status(200).json({
        mensagem: "Time excluído com sucesso",
      });
    });
  });
});

module.exports = router;
