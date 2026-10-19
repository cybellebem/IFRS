import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import Alert from "../components/Alert";
import CapacityBar from "../components/CapacityBar";
import EventForm from "../components/EventForm";
import { useAuth } from "../context/AuthContext";
import { useApi } from "../hooks/useApi";
import { formatDate } from "../utils/format";

/** Listagem de eventos; administradores podem criar, editar e excluir. */
export default function EventsPage() {
  const { isAdmin } = useAuth();
  const { data: events, error: loadError, loading, reload } = useApi(api.listEvents);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function runAction(action, message) {
    setError("");
    setSuccess("");
    try {
      await action();
      setSuccess(message);
      setEditing(null);
      await reload();
    } catch (err) {
      setError(err.message);
    }
  }

  function handleSave(event) {
    return editing.id
      ? runAction(() => api.updateEvent(editing.id, event), "Evento atualizado.")
      : runAction(() => api.createEvent(event), "Evento cadastrado.");
  }

  function handleDelete(event) {
    if (!window.confirm(`Excluir o evento "${event.nome}"?`)) return;
    runAction(() => api.deleteEvent(event.id), "Evento excluído.");
  }

  return (
    <>
      <div className="page-header">
        <h1>Eventos sociais</h1>
        {isAdmin && !editing && (
          <button className="btn btn--primary" onClick={() => setEditing({})}>
            + Novo evento
          </button>
        )}
      </div>

      <Alert message={loadError || error} />
      <Alert message={success} type="success" />

      {editing && (
        <EventForm
          key={editing.id ?? "new"}
          initial={editing}
          onSubmit={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      {loading ? (
        <p className="muted">Carregando...</p>
      ) : (
        <div className="table-wrap card">
          <table>
            <thead>
              <tr>
                <th>Evento</th>
                <th>Data</th>
                <th>Local</th>
                <th>Vagas</th>
                <th aria-label="Ações" />
              </tr>
            </thead>
            <tbody>
              {events?.map((event) => (
                <tr key={event.id}>
                  <td>
                    <Link to={`/events/${event.id}`}>{event.nome}</Link>
                  </td>
                  <td>{formatDate(event.data)}</td>
                  <td>{event.local}</td>
                  <td>
                    <CapacityBar event={event} />
                  </td>
                  <td className="actions">
                    <Link className="btn btn--small" to={`/events/${event.id}`}>
                      Detalhes
                    </Link>
                    {isAdmin && (
                      <>
                        <button className="btn btn--small" onClick={() => setEditing(event)}>
                          Editar
                        </button>
                        <button
                          className="btn btn--small btn--danger"
                          onClick={() => handleDelete(event)}
                        >
                          Excluir
                        </button>
                      </>
                    )}
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
