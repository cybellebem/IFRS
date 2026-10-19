import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/** Libera as rotas filhas apenas para usuários autenticados. */
export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <p className="muted center">Carregando...</p>;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
