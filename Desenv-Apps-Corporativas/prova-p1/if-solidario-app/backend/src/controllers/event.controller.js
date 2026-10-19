const eventService = require("../services/event.service");

/**
 * Controller de eventos: traduz requisições HTTP em chamadas ao EventService.
 */
class EventController {
  /**
   * GET /events
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async list(req, res) {
    res.json(await eventService.list());
  }

  /**
   * GET /events/:id
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async show(req, res) {
    res.json(await eventService.getById(req.params.id));
  }

  /**
   * POST /events
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async create(req, res) {
    const event = await eventService.create(req.body);
    res.status(201).location(`/events/${event.id}`).json(event);
  }

  /**
   * PUT /events/:id
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async update(req, res) {
    res.json(await eventService.update(req.params.id, req.body));
  }

  /**
   * DELETE /events/:id
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async remove(req, res) {
    await eventService.remove(req.params.id);
    res.status(204).end();
  }

  /**
   * POST /events/:id/volunteers — corpo: `{ "voluntario_id": number }`.
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async addVolunteer(req, res) {
    const event = await eventService.addVolunteer(req.params.id, req.body?.voluntario_id);
    res.status(201).json(event);
  }

  /**
   * DELETE /events/:id/volunteers/:volunteerId
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async removeVolunteer(req, res) {
    await eventService.removeVolunteer(req.params.id, req.params.volunteerId);
    res.status(204).end();
  }
}

module.exports = new EventController();
