function PersonagemCard({ personagem }) {
  return (
    <div className="card">
      <img src={personagem.image} alt={`Imagem de ${personagem.name}`} />

      <div className="card-conteudo">
        <h2>{personagem.name}</h2>

        <p>
          <strong>Espécie:</strong> {personagem.species}
        </p>

        <p>
          <strong>Status:</strong> {personagem.status}
        </p>

        <p>
          <strong>Gênero:</strong> {personagem.gender}
        </p>

        <p>
          <strong>Localização:</strong> {personagem.location.name}
        </p>
      </div>
    </div>
  );
}

export default PersonagemCard;
