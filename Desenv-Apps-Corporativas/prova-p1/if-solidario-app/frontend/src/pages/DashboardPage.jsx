import { Link } from "react-router-dom";
import { api } from "../api/client";
import Alert from "../components/Alert";
import CapacityBar from "../components/CapacityBar";
import { useApi } from "../hooks/useApi";
import { formatDate } from "../utils/format";

const STAT_LABELS = {
  eventos: "Eventos",
  voluntarios: "Voluntários",
  inscricoes: "Inscrições",
  eventosLotados: "Eventos lotados",
};

/** Tela do dashboard (GET /dashboard, rota protegida). */
export default function DashboardPage() {
  const { data, error, loading } = useApi(api.dashboard);

  if (loading) return <p className="muted">Carregando...</p>;
  if (error) return <Alert message={error} />;

  return (
    <>
      <div className="page-header">
        <h1>{data.message}</h1>
      </div>

      <section className="stats">
        {Object.entries(STAT_LABELS).map(([key, label]) => (
          <div className="card stat" key={key}>
            <span className="stat__value">{data.totais[key]}</span>
            <span className="stat__label">{label}</span>
          </div>
        ))}
      </section>

      <h2>Próximos eventos</h2>
      {data.proximosEventos.length === 0 && <p className="muted">Nenhum evento futuro.</p>}
      <div className="grid">
        {data.proximosEventos.map((event) => (
          <Link to={`/events/${event.id}`} className="card event-card" key={event.id}>
            <span className="event-card__date">{formatDate(event.data)}</span>
            <h3>{event.nome}</h3>
            <p className="muted">{event.local}</p>
            <CapacityBar event={event} />
          </Link>
        ))}
      </div>
    </>
  );
}
