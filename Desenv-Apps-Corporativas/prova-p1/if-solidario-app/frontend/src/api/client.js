const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const TOKEN_KEY = "if-solidario:token";

/** Evento disparado quando a API recusa o token salvo (expirado ou inválido). */
export const SESSION_EXPIRED_EVENT = "if-solidario:session-expired";

/** @returns {string|null} Token JWT salvo no navegador. */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/** @param {string|null} token Salva (ou remove, se `null`) o token JWT. */
export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

/** Erro de requisição com o status HTTP da resposta. */
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

/**
 * Faz uma requisição JSON à API, enviando o token quando existir.
 * @param {string} path Caminho da rota (ex.: "/events").
 * @param {{ method?: string, body?: object }} [options]
 * @returns {Promise<any>} Corpo da resposta (ou `null` em 204).
 * @throws {ApiError}
 */
export async function request(path, { method = "GET", body } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError("Não foi possível conectar à API. Ela está em execução?", 0);
  }

  if (response.status === 401 && token) {
    setToken(null);
    window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
  }
  if (response.status === 204) return null;
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new ApiError(data.error || "Erro inesperado.", response.status);
  }
  return data;
}

/** Endpoints da API agrupados por recurso. */
export const api = {
  login: (credentials) => request("/auth/login", { method: "POST", body: credentials }),
  me: () => request("/auth/me"),
  dashboard: () => request("/dashboard"),

  listEvents: () => request("/events"),
  getEvent: (id) => request(`/events/${id}`),
  createEvent: (event) => request("/events", { method: "POST", body: event }),
  updateEvent: (id, event) => request(`/events/${id}`, { method: "PUT", body: event }),
  deleteEvent: (id) => request(`/events/${id}`, { method: "DELETE" }),
  addVolunteerToEvent: (eventId, volunteerId) =>
    request(`/events/${eventId}/volunteers`, {
      method: "POST",
      body: { voluntario_id: volunteerId },
    }),
  removeVolunteerFromEvent: (eventId, volunteerId) =>
    request(`/events/${eventId}/volunteers/${volunteerId}`, { method: "DELETE" }),

  listVolunteers: () => request("/volunteers"),
  createVolunteer: (volunteer) => request("/volunteers", { method: "POST", body: volunteer }),
  updateVolunteer: (id, volunteer) =>
    request(`/volunteers/${id}`, { method: "PUT", body: volunteer }),
  deleteVolunteer: (id) => request(`/volunteers/${id}`, { method: "DELETE" }),
};
