const dashboardService = require("../services/dashboard.service");

/**
 * Controller do dashboard (rota protegida).
 */
class DashboardController {
  /**
   * GET /dashboard — resumo para o usuário autenticado.
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async show(req, res) {
    const summary = await dashboardService.getSummary(req.user);
    res.json(summary);
  }
}

module.exports = new DashboardController();
