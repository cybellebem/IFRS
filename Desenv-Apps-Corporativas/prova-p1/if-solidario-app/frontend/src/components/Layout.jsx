import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/** Estrutura das páginas autenticadas: barra de navegação + conteúdo. */
export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <>
      <header className="navbar">
        <div className="navbar__inner">
          <span className="brand">IF Solidário</span>
          <nav className="navbar__links">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/events">Eventos</NavLink>
            <NavLink to="/volunteers">Voluntários</NavLink>
          </nav>
          <div className="navbar__user">
            <span className={`badge badge--${user.role}`}>{user.role}</span>
            <span className="navbar__email">{user.email}</span>
            <button className="btn btn--ghost" onClick={handleLogout}>
              Sair
            </button>
          </div>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
