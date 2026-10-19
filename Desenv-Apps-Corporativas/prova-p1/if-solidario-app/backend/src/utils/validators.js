const AppError = require("../errors/AppError");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Converte um parâmetro de rota em id inteiro positivo.
 * @param {string|number} value
 * @param {string} [label="id"] Nome do campo usado na mensagem de erro.
 * @returns {number}
 * @throws {AppError} Quando o valor não é um inteiro positivo.
 */
function parseId(value, label = "id") {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    throw AppError.badRequest(`O ${label} informado é inválido.`);
  }
  return id;
}

/**
 * Garante que o valor seja um texto não vazio e o retorna sem espaços nas pontas.
 * @param {unknown} value
 * @param {string} field Nome do campo usado na mensagem de erro.
 * @returns {string}
 * @throws {AppError}
 */
function requireText(value, field) {
  if (typeof value !== "string" || value.trim() === "") {
    throw AppError.badRequest(`O campo '${field}' é obrigatório.`);
  }
  return value.trim();
}

/**
 * Valida e normaliza (minúsculas) um e-mail.
 * @param {unknown} value
 * @returns {string}
 * @throws {AppError}
 */
function requireEmail(value) {
  const email = requireText(value, "email").toLowerCase();
  if (!EMAIL_REGEX.test(email)) {
    throw AppError.badRequest("O e-mail informado é inválido.");
  }
  return email;
}

/**
 * Valida uma data no formato YYYY-MM-DD.
 * @param {unknown} value
 * @param {string} field
 * @returns {string}
 * @throws {AppError}
 */
function requireDate(value, field) {
  const date = requireText(value, field);
  if (!DATE_REGEX.test(date) || Number.isNaN(Date.parse(date))) {
    throw AppError.badRequest(`O campo '${field}' deve estar no formato AAAA-MM-DD.`);
  }
  return date;
}

/**
 * Valida um número inteiro maior que zero.
 * @param {unknown} value
 * @param {string} field
 * @returns {number}
 * @throws {AppError}
 */
function requirePositiveInteger(value, field) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) {
    throw AppError.badRequest(`O campo '${field}' deve ser um inteiro maior que zero.`);
  }
  return number;
}

/**
 * Normaliza um texto opcional: retorna `null` quando vazio.
 * @param {unknown} value
 * @returns {string|null}
 */
function optionalText(value) {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}

module.exports = {
  parseId,
  requireText,
  requireEmail,
  requireDate,
  requirePositiveInteger,
  optionalText,
};
