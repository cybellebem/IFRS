import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import { useAuth } from "../context/AuthContext";

/** Tela de login (POST /auth/login). */
export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login">
      <form className="card login__card" onSubmit={handleSubmit}>
        <h1>IF Solidário</h1>

        <Alert message={error} />

        <label>
          E-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nome@ifrs.edu.br"
            autoComplete="username"
            required
          />
        </label>
        <label>
          Senha
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        <button className="btn btn--primary btn--block" disabled={submitting}>
          {submitting ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
