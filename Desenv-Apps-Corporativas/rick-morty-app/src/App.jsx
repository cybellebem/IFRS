import { useEffect, useState } from "react";
import ListaPersonagens from "./components/ListaPersonagens";

function App() {
  const [personagens, setPersonagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [busca, setBusca] = useState("");

  // Função responsável somente por consultar a API
  const consultarAPI = async (url) => {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error("Erro ao consultar a API");
    }

    const data = await resposta.json();

    return data.results;
  };

  // Carrega os personagens quando a aplicação inicia
  useEffect(() => {
    const carregarPersonagens = async () => {
      try {
        const resultados = await consultarAPI(
          "https://rickandmortyapi.com/api/character",
        );

        setPersonagens(resultados);
        setErro(null);
      } catch (error) {
        setErro("Não foi possível carregar os personagens.", error);
        setPersonagens([]);
      } finally {
        setLoading(false);
      }
    };

    carregarPersonagens();
  }, []);

  // Pesquisa personagens pelo nome
  const pesquisar = async () => {
    if (!busca.trim()) {
      return;
    }

    try {
      setLoading(true);
      setErro(null);

      const resultados = await consultarAPI(
        `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(
          busca,
        )}`,
      );

      setPersonagens(resultados);
    } catch (error) {
      setPersonagens([]);
      setErro("Não foi possível encontrar o personagem.", error);
    } finally {
      setLoading(false);
    }
  };

  // Limpa a pesquisa e consulta novamente a API principal
  const limparPesquisa = async () => {
    setBusca("");

    try {
      setLoading(true);
      setErro(null);

      const resultados = await consultarAPI(
        "https://rickandmortyapi.com/api/character",
      );

      setPersonagens(resultados);
    } catch (error) {
      setPersonagens([]);
      setErro("Não foi possível carregar os personagens.", error);
    } finally {
      setLoading(false);
    }
  };

  // Tela de carregamento
  if (loading) {
    return (
      <div className="container">
        <h1>Rick and Morty</h1>
        <p className="mensagem">Carregando personagens...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Personagens de Rick and Morty</h1>

      <div className="pesquisa">
        <input
          type="text"
          placeholder="Pesquisar personagem"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              pesquisar();
            }
          }}
        />

        <button onClick={pesquisar}>Pesquisar</button>

        <button className="botao-limpar" onClick={limparPesquisa}>
          Limpar pesquisa
        </button>
      </div>

      {erro && <p className="erro">{erro}</p>}

      {!erro && personagens.length > 0 && (
        <ListaPersonagens personagens={personagens} />
      )}
    </div>
  );
}

export default App;
