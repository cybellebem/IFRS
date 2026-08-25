import PersonagemCard from "./PersonagemCard";

function ListaPersonagens({ personagens }) {
  return (
    <div className="lista">
      {personagens.map((personagem) => (
        <PersonagemCard key={personagem.id} personagem={personagem} />
      ))}
    </div>
  );
}

export default ListaPersonagens;
