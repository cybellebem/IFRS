const volunteerService = require("../services/volunteer.service");

/**
 * Controller de voluntários: traduz requisições HTTP em chamadas ao VolunteerService.
 */
class VolunteerController {
  /**
   * GET /volunteers
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async list(req, res) {
    res.json(await volunteerService.list());
  }

  /**
   * GET /volunteers/:id
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async show(req, res) {
    res.json(await volunteerService.getById(req.params.id));
  }

  /**
   * POST /volunteers
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async create(req, res) {
    const volunteer = await volunteerService.create(req.body);
    res.status(201).location(`/volunteers/${volunteer.id}`).json(volunteer);
  }

  /**
   * PUT /volunteers/:id
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async update(req, res) {
    res.json(await volunteerService.update(req.params.id, req.body));
  }

  /**
   * DELETE /volunteers/:id
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async remove(req, res) {
    await volunteerService.remove(req.params.id);
    res.status(204).end();
  }
}

module.exports = new VolunteerController();
