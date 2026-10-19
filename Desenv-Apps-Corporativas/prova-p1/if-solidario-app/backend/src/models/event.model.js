const database = require("../config/database");

/**
 * @typedef {object} EventData
 * @property {string} nome
 * @property {string} descricao
 * @property {string} data Data no formato YYYY-MM-DD.
 * @property {string} local
 * @property {number} maximo_voluntarios
 */

/**
 * @typedef {EventData & { id: number, total_voluntarios: number }} Event
 */

const SELECT_EVENTS = `
  SELECT e.id, e.nome, e.descricao, DATE_FORMAT(e.data, '%Y-%m-%d') AS data,
         e.local, e.maximo_voluntarios,
         CAST(COUNT(ev.voluntario_id) AS UNSIGNED) AS total_voluntarios
  FROM eventos e
  LEFT JOIN eventos_voluntarios ev ON ev.evento_id = e.id
`;

/**
 * Model de eventos: acesso às tabelas `eventos` e `eventos_voluntarios`.
 */
class EventModel {
  /**
   * Lista todos os eventos com a quantidade de voluntários inscritos.
   * @returns {Promise<Event[]>}
   */
  async findAll() {
    const [rows] = await database.query(`${SELECT_EVENTS} GROUP BY e.id ORDER BY e.data`);
    return rows;
  }

  /**
   * Busca um evento pelo id.
   * @param {number} id
   * @returns {Promise<Event|undefined>}
   */
  async findById(id) {
    const [rows] = await database.query(`${SELECT_EVENTS} WHERE e.id = ? GROUP BY e.id`, [id]);
    return rows[0];
  }

  /**
   * Insere um novo evento.
   * @param {EventData} event
   * @returns {Promise<number>} Id do evento criado.
   */
  async create(event) {
    const [result] = await database.query(
      `INSERT INTO eventos (nome, descricao, data, local, maximo_voluntarios)
       VALUES (?, ?, ?, ?, ?)`,
      [event.nome, event.descricao, event.data, event.local, event.maximo_voluntarios],
    );
    return result.insertId;
  }

  /**
   * Atualiza um evento existente.
   * @param {number} id
   * @param {EventData} event
   * @returns {Promise<boolean>} `true` se algum registro foi afetado.
   */
  async update(id, event) {
    const [result] = await database.query(
      `UPDATE eventos
       SET nome = ?, descricao = ?, data = ?, local = ?, maximo_voluntarios = ?
       WHERE id = ?`,
      [event.nome, event.descricao, event.data, event.local, event.maximo_voluntarios, id],
    );
    return result.affectedRows > 0;
  }

  /**
   * Remove um evento.
   * @param {number} id
   * @returns {Promise<boolean>} `true` se o evento existia.
   */
  async remove(id) {
    const [result] = await database.query("DELETE FROM eventos WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }

  /**
   * Lista os voluntários inscritos em um evento.
   * @param {number} eventId
   * @returns {Promise<import("./volunteer.model").Volunteer[]>}
   */
  async findVolunteers(eventId) {
    const [rows] = await database.query(
      `SELECT v.id, v.nome, v.email, v.celular
       FROM voluntarios v
       JOIN eventos_voluntarios ev ON ev.voluntario_id = v.id
       WHERE ev.evento_id = ?
       ORDER BY v.nome`,
      [eventId],
    );
    return rows;
  }

  /**
   * Verifica se um voluntário já está inscrito no evento.
   * @param {number} eventId
   * @param {number} volunteerId
   * @returns {Promise<boolean>}
   */
  async hasVolunteer(eventId, volunteerId) {
    const [rows] = await database.query(
      "SELECT 1 FROM eventos_voluntarios WHERE evento_id = ? AND voluntario_id = ?",
      [eventId, volunteerId],
    );
    return rows.length > 0;
  }

  /**
   * Inscreve um voluntário em um evento.
   * @param {number} eventId
   * @param {number} volunteerId
   * @returns {Promise<void>}
   */
  async addVolunteer(eventId, volunteerId) {
    await database.query(
      "INSERT INTO eventos_voluntarios (evento_id, voluntario_id) VALUES (?, ?)",
      [eventId, volunteerId],
    );
  }

  /**
   * Cancela a inscrição de um voluntário em um evento.
   * @param {number} eventId
   * @param {number} volunteerId
   * @returns {Promise<boolean>} `true` se a inscrição existia.
   */
  async removeVolunteer(eventId, volunteerId) {
    const [result] = await database.query(
      "DELETE FROM eventos_voluntarios WHERE evento_id = ? AND voluntario_id = ?",
      [eventId, volunteerId],
    );
    return result.affectedRows > 0;
  }
}

module.exports = new EventModel();
