import { isEventFull } from "../utils/format";

/**
 * Barra de ocupação das vagas de um evento.
 * @param {{ event: { total_voluntarios: number, maximo_voluntarios: number } }} props
 */
export default function CapacityBar({ event }) {
  const percent = Math.min(100, (event.total_voluntarios / event.maximo_voluntarios) * 100);
  const full = isEventFull(event);

  return (
    <div className="capacity">
      <div className="capacity__track">
        <div
          className={`capacity__fill ${full ? "capacity__fill--full" : ""}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="capacity__label">
        {event.total_voluntarios}/{event.maximo_voluntarios} vagas
        {full && <strong className="tag tag--full">Lotado</strong>}
      </span>
    </div>
  );
}
