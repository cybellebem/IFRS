import { useState } from "react";

const EMPTY_EVENT = { nome: "", descricao: "", data: "", local: "", maximo_voluntarios: 10 };

/**
 * Formulário de criação/edição de evento.
 * @param {{ initial?: object, onSubmit: (event: object) => Promise<void>, onCancel: () => void }} props
 */
export default function EventForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({ ...EMPTY_EVENT, ...initial });
  const [saving, setSaving] = useState(false);

  function update(field) {
    return (e) => setForm({ ...form, [field]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit({ ...form, maximo_voluntarios: Number(form.maximo_voluntarios) });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h3>{initial?.id ? "Editar evento" : "Novo evento"}</h3>
      <div className="form__grid">
        <label>
          Nome
          <input value={form.nome} onChange={update("nome")} required />
        </label>
        <label>
          Local
          <input value={form.local} onChange={update("local")} required />
        </label>
        <label>
          Data
          <input type="date" value={form.data} onChange={update("data")} required />
        </label>
        <label>
          Máximo de voluntários
          <input
            type="number"
            min="1"
            value={form.maximo_voluntarios}
            onChange={update("maximo_voluntarios")}
            required
          />
        </label>
        <label className="form__full">
          Descrição
          <textarea rows="3" value={form.descricao} onChange={update("descricao")} required />
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
