const authService = require("../services/auth.service");

/**
 * Controller de autenticação.
 * Erros lançados são encaminhados automaticamente pelo Express 5 ao middleware de erros.
 */
class AuthController {
  /**
   * POST /auth/login — autentica e devolve o token JWT.
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async login(req, res) {
    const result = await authService.login(req.body);
    res.json(result);
  }

  /**
   * GET /auth/me — devolve os dados do usuário do token.
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  me(req, res) {
    res.json(req.user);
  }
}

module.exports = new AuthController();
