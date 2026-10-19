/**
 * Converte "AAAA-MM-DD" em "DD/MM/AAAA" sem conversão de fuso horário.
 * @param {string} isoDate
 * @returns {string}
 */
export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

/**
 * @param {{ total_voluntarios: number, maximo_voluntarios: number }} event
 * @returns {boolean} `true` se o evento atingiu o limite de voluntários.
 */
export function isEventFull(event) {
  return event.total_voluntarios >= event.maximo_voluntarios;
}
