import { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api/client";
import Alert from "../components/Alert";
import CapacityBar from "../components/CapacityBar";
import { useApi } from "../hooks/useApi";
import { formatDate, isEventFull } from "../utils/format";

/** Detalhes do evento com inscrição/cancelamento de voluntários. */
export default function EventDetailPage() {
  const { id } = useParams();
  const loadEvent = useCallback(() => api.getEvent(id), [id]);
  const { data: event, error: loadError, loading, reload } = useApi(loadEvent);
  const { data: volunteers } = useApi(api.listVolunteers);
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function runAction(action, message) {
    setError("");
    setSuccess("");
    try {
      await action();
      setSuccess(message);
      setSelected("");
      await reload();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p className="muted">Carregando...</p>;
  if (loadError) return <Alert message={loadError} />;

  const enrolledIds = new Set(event.voluntarios.map((v) => v.id));
  const available = (volunteers ?? []).filter((v) => !enrolledIds.has(v.id));
  const full = isEventFull(event);

  function handleAdd(e) {
    e.preventDefault();
    runAction(() => api.addVolunteerToEvent(event.id, Number(selected)), "Voluntário inscrito.");
  }

  return (
    <>
      <Link to="/events" className="back-link">
        ← Voltar para eventos
      </Link>

      <div className="card detail">
        <span className="event-card__date">{formatDate(event.data)}</span>
        <h1>{event.nome}</h1>
        <p className="muted">{event.local}</p>
        <p>{event.descricao}</p>
        <CapacityBar event={event} />
      </div>

      <Alert message={error} />
      <Alert message={success} type="success" />

      <div className="page-header">
        <h2>Voluntários inscritos</h2>
      </div>

      <form className="card inline-form" onSubmit={handleAdd}>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          disabled={full}
          required
        >
          <option value="">
            {full ? "Evento lotado — sem vagas" : "Selecione um voluntário para inscrever"}
          </option>
          {available.map((v) => (
            <option key={v.id} value={v.id}>
              {v.nome} ({v.email})
            </option>
          ))}
        </select>
        <button className="btn btn--primary" disabled={full || !selected}>
          Inscrever
        </button>
      </form>

      {event.voluntarios.length === 0 ? (
        <p className="muted">Nenhum voluntário inscrito ainda.</p>
      ) : (
        <div className="table-wrap card">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Celular</th>
                <th aria-label="Ações" />
              </tr>
            </thead>
            <tbody>
              {event.voluntarios.map((v) => (
                <tr key={v.id}>
                  <td>{v.nome}</td>
                  <td>{v.email}</td>
                  <td>{v.celular || "—"}</td>
                  <td className="actions">
                    <button
                      className="btn btn--small btn--danger"
                      onClick={() =>
                        runAction(
                          () => api.removeVolunteerFromEvent(event.id, v.id),
                          "Inscrição cancelada.",
                        )
                      }
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
