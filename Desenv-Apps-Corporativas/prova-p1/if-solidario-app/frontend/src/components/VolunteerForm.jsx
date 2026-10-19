import { useState } from "react";

const EMPTY_VOLUNTEER = { nome: "", email: "", celular: "" };

/**
 * Formulário de criação/edição de voluntário.
 * @param {{ initial?: object, onSubmit: (volunteer: object) => Promise<void>, onCancel: () => void }} props
 */
export default function VolunteerForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    ...EMPTY_VOLUNTEER,
    ...initial,
    celular: initial?.celular ?? "",
  });
  const [saving, setSaving] = useState(false);

  function update(field) {
    return (e) => setForm({ ...form, [field]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit(form);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h3>{initial?.id ? "Editar voluntário" : "Novo voluntário"}</h3>
      <div className="form__grid">
        <label>
          Nome
          <input value={form.nome} onChange={update("nome")} required />
        </label>
        <label>
          E-mail
          <input type="email" value={form.email} onChange={update("email")} required />
        </label>
        <label>
          Celular
          <input value={form.celular} onChange={update("celular")} placeholder="Opcional" />
        </label>
      </div>
      <div className="form__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          Cancelar
        </button>
        <button className="btn btn--primary" disabled={saving}>
          {saving ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </form>
  );
}
