import { useState } from "react";
import { api } from "../api/client";
import Alert from "../components/Alert";
import VolunteerForm from "../components/VolunteerForm";
import { useAuth } from "../context/AuthContext";
import { useApi } from "../hooks/useApi";

/** Listagem de voluntários; administradores podem criar, editar e excluir. */
export default function VolunteersPage() {
  const { isAdmin } = useAuth();
  const { data: volunteers, error: loadError, loading, reload } = useApi(api.listVolunteers);
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

  function handleSave(volunteer) {
    return editing.id
      ? runAction(() => api.updateVolunteer(editing.id, volunteer), "Voluntário atualizado.")
      : runAction(() => api.createVolunteer(volunteer), "Voluntário cadastrado.");
  }

  function handleDelete(volunteer) {
    if (!window.confirm(`Excluir o voluntário "${volunteer.nome}"?`)) return;
    runAction(() => api.deleteVolunteer(volunteer.id), "Voluntário excluído.");
  }

  return (
    <>
      <div className="page-header">
        <h1>Voluntários</h1>
        {isAdmin && !editing && (
          <button className="btn btn--primary" onClick={() => setEditing({})}>
            + Novo voluntário
          </button>
        )}
      </div>

      <Alert message={loadError || error} />
      <Alert message={success} type="success" />

      {editing && (
        <VolunteerForm
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
                <th>Nome</th>
                <th>E-mail</th>
                <th>Celular</th>
                {isAdmin && <th aria-label="Ações" />}
              </tr>
            </thead>
            <tbody>
              {volunteers?.map((volunteer) => (
                <tr key={volunteer.id}>
                  <td>{volunteer.nome}</td>
                  <td>{volunteer.email}</td>
                  <td>{volunteer.celular || "—"}</td>
                  {isAdmin && (
                    <td className="actions">
                      <button className="btn btn--small" onClick={() => setEditing(volunteer)}>
                        Editar
                      </button>
                      <button
                        className="btn btn--small btn--danger"
                        onClick={() => handleDelete(volunteer)}
                      >
                        Excluir
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
