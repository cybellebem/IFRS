const eventModel = require("../models/event.model");
const volunteerModel = require("../models/volunteer.model");

const UPCOMING_EVENTS_LIMIT = 3;

/**
 * Service do dashboard: agrega indicadores do sistema.
 */
class DashboardService {
  /**
   * @param {typeof eventModel} events Model de eventos.
   * @param {typeof volunteerModel} volunteers Model de voluntários.
   */
  constructor(events = eventModel, volunteers = volunteerModel) {
    this.events = events;
    this.volunteers = volunteers;
  }

  /**
   * Monta o resumo exibido no dashboard.
   * @param {import("./auth.service").TokenPayload} user Usuário autenticado.
   * @returns {Promise<object>} Saudação, totais e próximos eventos.
   */
  async getSummary(user) {
    const [events, totalVolunteers] = await Promise.all([
      this.events.findAll(),
      this.volunteers.count(),
    ]);
    const today = new Date().toISOString().slice(0, 10);

    return {
      message: `Bem-vindo(a), ${user.email}!`,
      user,
      totais: {
        eventos: events.length,
        voluntarios: totalVolunteers,
        inscricoes: events.reduce((sum, event) => sum + event.total_voluntarios, 0),
        eventosLotados: events.filter(isFull).length,
      },
      proximosEventos: events
        .filter((event) => event.data >= today)
        .slice(0, UPCOMING_EVENTS_LIMIT),
    };
  }
}

/**
 * @param {import("../models/event.model").Event} event
 * @returns {boolean} `true` se o evento atingiu o limite de voluntários.
 */
function isFull(event) {
  return event.total_voluntarios >= event.maximo_voluntarios;
}

module.exports = new DashboardService();
module.exports.DashboardService = DashboardService;
