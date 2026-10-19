const AppError = require("../errors/AppError");
const eventModel = require("../models/event.model");
const volunteerModel = require("../models/volunteer.model");
const {
  parseId,
  requireText,
  requireDate,
  requirePositiveInteger,
} = require("../utils/validators");

/**
 * Service de eventos: validações e regras de negócio, como o
 * limite máximo de voluntários por evento.
 */
class EventService {
  /**
   * @param {typeof eventModel} events Model de eventos.
   * @param {typeof volunteerModel} volunteers Model de voluntários.
   */
  constructor(events = eventModel, volunteers = volunteerModel) {
    this.events = events;
    this.volunteers = volunteers;
  }

  /**
   * Lista todos os eventos.
   * @returns {Promise<import("../models/event.model").Event[]>}
   */
  list() {
    return this.events.findAll();
  }

  /**
   * Busca um evento pelo id, incluindo os voluntários inscritos.
   * @param {string|number} id
   * @returns {Promise<object>} Evento com a lista `voluntarios`.
   * @throws {AppError} 404 se não existir.
   */
  async getById(id) {
    const event = await this.#findOrFail(parseId(id));
    const voluntarios = await this.events.findVolunteers(event.id);
    return { ...event, voluntarios };
  }

  /**
   * Cadastra um novo evento.
   * @param {object} body Corpo da requisição.
   * @returns {Promise<import("../models/event.model").Event>}
   * @throws {AppError} 400 em dados inválidos.
   */
  async create(body) {
    const data = this.#validate(body);
    const id = await this.events.create(data);
    return this.events.findById(id);
  }

  /**
   * Atualiza um evento. O novo limite não pode ser menor que o
   * número de voluntários já inscritos.
   * @param {string|number} id
   * @param {object} body
   * @returns {Promise<import("../models/event.model").Event>}
   * @throws {AppError} 400 em dados inválidos; 404 se não existir.
   */
  async update(id, body) {
    const current = await this.#findOrFail(parseId(id));
    const data = this.#validate(body);

    if (data.maximo_voluntarios < current.total_voluntarios) {
      throw AppError.badRequest(
        `O evento já possui ${current.total_voluntarios} voluntários inscritos; ` +
          "o limite não pode ser menor que isso.",
      );
    }

    await this.events.update(current.id, data);
    return this.events.findById(current.id);
  }

  /**
   * Remove um evento.
   * @param {string|number} id
   * @returns {Promise<void>}
   * @throws {AppError} 404 se não existir.
   */
  async remove(id) {
    const removed = await this.events.remove(parseId(id));
    if (!removed) {
      throw AppError.notFound("Evento não encontrado.");
    }
  }

  /**
   * Inscreve um voluntário no evento, respeitando o limite de vagas.
   * @param {string|number} eventId
   * @param {string|number} volunteerId
   * @returns {Promise<import("../models/event.model").Event>} Evento atualizado.
   * @throws {AppError} 404 se evento/voluntário não existirem; 409 se já inscrito ou lotado.
   */
  async addVolunteer(eventId, volunteerId) {
    const event = await this.#findOrFail(parseId(eventId, "id do evento"));
    const volunteer = await this.volunteers.findById(parseId(volunteerId, "id do voluntário"));

    if (!volunteer) {
      throw AppError.notFound("Voluntário não encontrado.");
    }
    if (await this.events.hasVolunteer(event.id, volunteer.id)) {
      throw AppError.conflict("Voluntário já inscrito neste evento.");
    }
    if (event.total_voluntarios >= event.maximo_voluntarios) {
      throw AppError.conflict("Evento lotado: limite máximo de voluntários atingido.");
    }

    await this.events.addVolunteer(event.id, volunteer.id);
    return this.events.findById(event.id);
  }

  /**
   * Cancela a inscrição de um voluntário no evento.
   * @param {string|number} eventId
   * @param {string|number} volunteerId
   * @returns {Promise<void>}
   * @throws {AppError} 404 se a inscrição não existir.
   */
  async removeVolunteer(eventId, volunteerId) {
    const removed = await this.events.removeVolunteer(
      parseId(eventId, "id do evento"),
      parseId(volunteerId, "id do voluntário"),
    );
    if (!removed) {
      throw AppError.notFound("Inscrição não encontrada.");
    }
  }

  /**
   * @param {number} id
   * @returns {Promise<import("../models/event.model").Event>}
   * @throws {AppError} 404 se o evento não existir.
   */
  async #findOrFail(id) {
    const event = await this.events.findById(id);
    if (!event) {
      throw AppError.notFound("Evento não encontrado.");
    }
    return event;
  }

  /**
   * Valida e normaliza o corpo da requisição de evento.
   * @param {object} [body]
   * @returns {import("../models/event.model").EventData}
   */
  #validate(body = {}) {
    return {
      nome: requireText(body.nome, "nome"),
      descricao: requireText(body.descricao, "descricao"),
      data: requireDate(body.data, "data"),
      local: requireText(body.local, "local"),
      maximo_voluntarios: requirePositiveInteger(body.maximo_voluntarios, "maximo_voluntarios"),
    };
  }
}

module.exports = new EventService();
module.exports.EventService = EventService;
