const AppError = require("../errors/AppError");

/**
 * Responde 404 para rotas inexistentes.
 * @type {import("express").RequestHandler}
 */
function notFoundHandler(req, res) {
  res.status(404).json({ error: `Rota ${req.method} ${req.originalUrl} não encontrada.` });
}

/**
 * Converte erros em respostas JSON padronizadas `{ error }`.
 * Erros inesperados viram 500 sem expor detalhes internos.
 * @type {import("express").ErrorRequestHandler}
 */
function errorHandler(error, req, res, next) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ error: error.message });
  }
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ error: "JSON inválido no corpo da requisição." });
  }

  console.error(error);
  return res.status(500).json({ error: "Erro interno do servidor." });
}

module.exports = { notFoundHandler, errorHandler };
