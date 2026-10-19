const AppError = require("../errors/AppError");
const volunteerModel = require("../models/volunteer.model");
const { parseId, requireText, requireEmail, optionalText } = require("../utils/validators");

/**
 * Service de voluntários: validações e regras de negócio do cadastro.
 */
class VolunteerService {
  /**
   * @param {typeof volunteerModel} volunteers Model de voluntários.
   */
  constructor(volunteers = volunteerModel) {
    this.volunteers = volunteers;
  }

  /**
   * Lista todos os voluntários.
   * @returns {Promise<import("../models/volunteer.model").Volunteer[]>}
   */
  list() {
    return this.volunteers.findAll();
  }

  /**
   * Busca um voluntário pelo id.
   * @param {string|number} id
   * @returns {Promise<import("../models/volunteer.model").Volunteer>}
   * @throws {AppError} 404 se não existir.
   */
  async getById(id) {
    const volunteer = await this.volunteers.findById(parseId(id));
    if (!volunteer) {
      throw AppError.notFound("Voluntário não encontrado.");
    }
    return volunteer;
  }

  /**
   * Cadastra um voluntário. O e-mail deve ser único.
   * @param {object} body Corpo da requisição.
   * @returns {Promise<import("../models/volunteer.model").Volunteer>}
   * @throws {AppError} 400 em dados inválidos; 409 se o e-mail já existir.
   */
  async create(body) {
    const data = this.#validate(body);
    await this.#ensureEmailAvailable(data.email);
    const id = await this.volunteers.create(data);
    return { id, ...data };
  }

  /**
   * Atualiza um voluntário.
   * @param {string|number} id
   * @param {object} body
   * @returns {Promise<import("../models/volunteer.model").Volunteer>}
   * @throws {AppError} 404 se não existir; 409 se o e-mail pertencer a outro voluntário.
   */
  async update(id, body) {
    const current = await this.getById(id);
    const data = this.#validate(body);
    await this.#ensureEmailAvailable(data.email, current.id);
    await this.volunteers.update(current.id, data);
    return { id: current.id, ...data };
  }

  /**
   * Remove um voluntário (as inscrições em eventos são removidas em cascata).
   * @param {string|number} id
   * @returns {Promise<void>}
   * @throws {AppError} 404 se não existir.
   */
  async remove(id) {
    const removed = await this.volunteers.remove(parseId(id));
    if (!removed) {
      throw AppError.notFound("Voluntário não encontrado.");
    }
  }

  /**
   * Valida e normaliza o corpo da requisição.
   * @param {object} [body]
   * @returns {import("../models/volunteer.model").VolunteerData}
   */
  #validate(body = {}) {
    return {
      nome: requireText(body.nome, "nome"),
      email: requireEmail(body.email),
      celular: optionalText(body.celular),
    };
  }

  /**
   * Garante que nenhum outro voluntário use o e-mail informado.
   * @param {string} email
   * @param {number} [ownerId] Id do voluntário que pode manter o e-mail.
   * @throws {AppError} 409 se o e-mail já estiver em uso.
   */
  async #ensureEmailAvailable(email, ownerId) {
    const existing = await this.volunteers.findByEmail(email);
    if (existing && existing.id !== ownerId) {
      throw AppError.conflict("Já existe um voluntário com este e-mail.");
    }
  }
}

module.exports = new VolunteerService();
module.exports.VolunteerService = VolunteerService;
