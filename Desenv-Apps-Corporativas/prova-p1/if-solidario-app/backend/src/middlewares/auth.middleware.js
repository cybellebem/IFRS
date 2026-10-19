const AppError = require("../errors/AppError");
const authService = require("../services/auth.service");

/**
 * Exige um token JWT válido no cabeçalho `Authorization: Bearer <token>`
 * e disponibiliza o payload em `req.user`.
 * @type {import("express").RequestHandler}
 */
function authenticate(req, res, next) {
  const [scheme, token] = (req.headers.authorization || "").split(" ");
  if (scheme !== "Bearer" || !token) {
    throw AppError.unauthorized("Token não informado.");
  }
  req.user = authService.verifyToken(token);
  next();
}

/**
 * Restringe a rota aos papéis informados. Deve ser usado após `authenticate`.
 * @param {...("admin"|"user")} roles Papéis autorizados.
 * @returns {import("express").RequestHandler}
 */
function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      throw AppError.forbidden("Acesso permitido apenas para: " + roles.join(", ") + ".");
    }
    next();
  };
}

module.exports = { authenticate, authorize };
