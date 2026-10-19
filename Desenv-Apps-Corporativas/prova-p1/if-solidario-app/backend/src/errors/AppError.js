/**
 * Erro de aplicação com status HTTP associado.
 * Lançado pelos services e convertido em resposta pelo middleware de erros.
 */
class AppError extends Error {
  /**
   * @param {string} message Mensagem amigável para o cliente.
   * @param {number} [statusCode=400] Código HTTP da resposta.
   */
  constructor(message, statusCode = 400) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }

  /** @param {string} message */
  static badRequest(message) {
    return new AppError(message, 400);
  }

  /** @param {string} message */
  static unauthorized(message) {
    return new AppError(message, 401);
  }

  /** @param {string} message */
  static forbidden(message) {
    return new AppError(message, 403);
  }

  /** @param {string} message */
  static notFound(message) {
    return new AppError(message, 404);
  }

  /** @param {string} message */
  static conflict(message) {
    return new AppError(message, 409);
  }
}

module.exports = AppError;
