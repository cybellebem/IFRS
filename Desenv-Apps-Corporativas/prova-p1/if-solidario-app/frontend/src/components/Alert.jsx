/**
 * Mensagem de feedback. Não renderiza nada quando `message` está vazio.
 * @param {{ message?: string, type?: "error"|"success" }} props
 */
export default function Alert({ message, type = "error" }) {
  if (!message) return null;
  return (
    <div className={`alert alert--${type}`} role={type === "error" ? "alert" : "status"}>
      {message}
    </div>
  );
}
