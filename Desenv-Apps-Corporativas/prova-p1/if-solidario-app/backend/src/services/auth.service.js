const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");
const userModel = require("../models/user.model");
const { requireEmail, requireText } = require("../utils/validators");

const TOKEN_EXPIRATION = "1h";

/**
 * @typedef {object} TokenPayload
 * @property {string} email
 * @property {"admin"|"user"} role
 */

/**
 * Service de autenticação: valida credenciais e emite/verifica tokens JWT.
 */
class AuthService {
  /**
   * @param {typeof userModel} users Model de usuários (injetado para facilitar testes).
   */
  constructor(users = userModel) {
    this.users = users;
  }

  /**
   * Autentica o usuário e gera um token JWT com payload `{ email, role }`.
   * @param {{ email?: string, password?: string }} [credentials]
   * @returns {Promise<{ token: string, user: TokenPayload }>}
   * @throws {AppError} 400 se faltar dado; 401 se as credenciais forem inválidas.
   */
  async login({ email, password } = {}) {
    const normalizedEmail = requireEmail(email);
    const plainPassword = requireText(password, "password");

    const user = await this.users.findByEmail(normalizedEmail);
    const isValid = user && (await bcrypt.compare(plainPassword, user.senha));
    if (!isValid) {
      throw AppError.unauthorized("E-mail ou senha inválidos.");
    }

    const payload = { email: user.email, role: user.cargo };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });

    return { token, user: payload };
  }

  /**
   * Verifica um token JWT e devolve seu payload.
   * @param {string} token
   * @returns {TokenPayload}
   * @throws {AppError} 401 se o token for inválido ou estiver expirado.
   */
  verifyToken(token) {
    try {
      const { email, role } = jwt.verify(token, process.env.JWT_SECRET);
      return { email, role };
    } catch {
      throw AppError.unauthorized("Token inválido ou expirado.");
    }
  }
}

module.exports = new AuthService();
module.exports.AuthService = AuthService;
