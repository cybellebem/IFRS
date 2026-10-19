const database = require("../config/database");

/**
 * @typedef {object} VolunteerData
 * @property {string} nome
 * @property {string} email
 * @property {string|null} celular
 */

/**
 * @typedef {VolunteerData & { id: number }} Volunteer
 */

const VOLUNTEER_COLUMNS = "id, nome, email, celular";

/**
 * Model de voluntários: acesso à tabela `voluntarios`.
 */
class VolunteerModel {
  /**
   * Lista todos os voluntários.
   * @returns {Promise<Volunteer[]>}
   */
  async findAll() {
    const [rows] = await database.query(
      `SELECT ${VOLUNTEER_COLUMNS} FROM voluntarios ORDER BY nome`,
    );
    return rows;
  }

  /**
   * Busca um voluntário pelo id.
   * @param {number} id
   * @returns {Promise<Volunteer|undefined>}
   */
  async findById(id) {
    const [rows] = await database.query(
      `SELECT ${VOLUNTEER_COLUMNS} FROM voluntarios WHERE id = ?`,
      [id],
    );
    return rows[0];
  }

  /**
   * Busca um voluntário pelo e-mail.
   * @param {string} email
   * @returns {Promise<Volunteer|undefined>}
   */
  async findByEmail(email) {
    const [rows] = await database.query(
      `SELECT ${VOLUNTEER_COLUMNS} FROM voluntarios WHERE email = ?`,
      [email],
    );
    return rows[0];
  }

  /**
   * Insere um novo voluntário.
   * @param {VolunteerData} volunteer
   * @returns {Promise<number>} Id do voluntário criado.
   */
  async create(volunteer) {
    const [result] = await database.query(
      "INSERT INTO voluntarios (nome, email, celular) VALUES (?, ?, ?)",
      [volunteer.nome, volunteer.email, volunteer.celular],
    );
    return result.insertId;
  }

  /**
   * Atualiza um voluntário existente.
   * @param {number} id
   * @param {VolunteerData} volunteer
   * @returns {Promise<boolean>} `true` se algum registro foi afetado.
   */
  async update(id, volunteer) {
    const [result] = await database.query(
      "UPDATE voluntarios SET nome = ?, email = ?, celular = ? WHERE id = ?",
      [volunteer.nome, volunteer.email, volunteer.celular, id],
    );
    return result.affectedRows > 0;
  }

  /**
   * Remove um voluntário (as inscrições são removidas em cascata).
   * @param {number} id
   * @returns {Promise<boolean>} `true` se o voluntário existia.
   */
  async remove(id) {
    const [result] = await database.query("DELETE FROM voluntarios WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }

  /**
   * Conta o total de voluntários cadastrados.
   * @returns {Promise<number>}
   */
  async count() {
    const [[{ total }]] = await database.query("SELECT COUNT(*) AS total FROM voluntarios");
    return total;
  }
}

module.exports = new VolunteerModel();
