const database = require("../config/database");

/**
 * @typedef {object} User
 * @property {number} id
 * @property {string} email
 * @property {string} senha Hash bcrypt da senha.
 * @property {"admin"|"user"} cargo
 */

/**
 * Model de usuários: acesso à tabela `usuarios`.
 */
class UserModel {
  /**
   * Busca um usuário pelo e-mail.
   * @param {string} email
   * @returns {Promise<User|undefined>}
   */
  async findByEmail(email) {
    const [rows] = await database.query(
      "SELECT id, email, senha, cargo FROM usuarios WHERE email = ?",
      [email],
    );
    return rows[0];
  }
}

module.exports = new UserModel();
