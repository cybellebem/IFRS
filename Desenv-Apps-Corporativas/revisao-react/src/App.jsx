import { useState } from "react";
import "./App.css";

function ResumoCarrinho({ quantidade, total }) {
  return (
    <div className="resumo-carrinho">
      <h2>Carrinho</h2>

      <p>Itens: {quantidade}</p>

      <p>Total: R$ {total.toFixed(2).replace(".", ",")}</p>
    </div>
  );
}

function FormularioProduto({ adicionarProduto }) {
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    preco: "",
    estoque: "",
  });

  const [erros, setErros] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setNovoProduto({
      ...novoProduto,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const novosErros = {};

    if (novoProduto.nome.trim() === "") {
      novosErros.nome = "O nome é obrigatório.";
    }

    if (novoProduto.preco === "" || Number(novoProduto.preco) <= 0) {
      novosErros.preco = "O preço deve ser maior que zero.";
    }

    if (novoProduto.estoque === "" || Number(novoProduto.estoque) < 0) {
      novosErros.estoque = "O estoque não pode ser negativo.";
    }

    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      return;
    }

    const produto = {
      id: Date.now(),
      nome: novoProduto.nome,
      preco: Number(novoProduto.preco),
      estoque: Number(novoProduto.estoque),
    };

    adicionarProduto(produto);

    setNovoProduto({
      nome: "",
      preco: "",
      estoque: "",
    });

    setErros({});
  }

  return (
    <div className="formulario-container">
      <h2>Cadastrar Produto</h2>

      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label>Nome:</label>

          <input
            type="text"
            name="nome"
            value={novoProduto.nome}
            onChange={handleChange}
          />

          {erros.nome && <p className="erro">{erros.nome}</p>}
        </div>

        <div className="campo">
          <label>Preço:</label>

          <input
            type="number"
            name="preco"
            value={novoProduto.preco}
            onChange={handleChange}
            step="0.01"
          />

          {erros.preco && <p className="erro">{erros.preco}</p>}
        </div>

        <div className="campo">
          <label>Estoque:</label>

          <input
            type="number"
            name="estoque"
            value={novoProduto.estoque}
            onChange={handleChange}
          />

          {erros.estoque && <p className="erro">{erros.estoque}</p>}
        </div>

        <button type="submit">Cadastrar produto</button>
      </form>
    </div>
  );
}

function FiltrosProdutos({
  pesquisa,
  setPesquisa,
  filtroEstoque,
  setFiltroEstoque,
}) {
  return (
    <div className="filtros-container">
      <div className="campo-pesquisa">
        <label>Pesquisar:</label>

        <input
          type="text"
          placeholder="Digite o nome do produto..."
          value={pesquisa}
          onChange={(event) => setPesquisa(event.target.value)}
        />
      </div>

      <div className="filtro-estoque">
        <label>Estoque:</label>

        <select
          value={filtroEstoque}
          onChange={(event) => setFiltroEstoque(event.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="disponiveis">Disponíveis</option>
          <option value="semEstoque">Sem estoque</option>
        </select>
      </div>
    </div>
  );
}

function Produto({ nome, preco, estoque, status, adicionarAoCarrinho }) {
  return (
    <div className="card">
      <h3 className="produto-nome">{nome}</h3>

      <p>Preço: R$ {preco.toFixed(2).replace(".", ",")}</p>

      <p>Estoque: {estoque}</p>

      <span className={`status ${status.toLowerCase().replace(" ", "-")}`}>
        {status}
      </span>

      <button
        className="botao-carrinho"
        onClick={() => adicionarAoCarrinho(preco)}
        disabled={estoque === 0}
      >
        {estoque === 0 ? "Sem estoque" : "Adicionar ao carrinho"}
      </button>
    </div>
  );
}

function ListaProdutos({ produtos, adicionarAoCarrinho }) {
  return (
    <div className="lista-container">
      <h2>Produtos</h2>

      <div className="lista-produtos">
        {produtos.map((produto) => (
          <Produto
            key={produto.id}
            nome={produto.nome}
            preco={produto.preco}
            estoque={produto.estoque}
            status={
              produto.estoque === 0
                ? "Indisponível"
                : produto.estoque >= 5
                  ? "Disponível"
                  : "Estoque baixo"
            }
            adicionarAoCarrinho={adicionarAoCarrinho}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [produtos, setProdutos] = useState([
    { id: 1, nome: "Notebook", preco: 3500, estoque: 4 },
    { id: 2, nome: "Mouse", preco: 80, estoque: 12 },
    { id: 3, nome: "Teclado", preco: 150, estoque: 0 },
    { id: 4, nome: "Monitor", preco: 900, estoque: 3 },
  ]);

  const [quantidade, setQuantidade] = useState(0);
  const [total, setTotal] = useState(0);

  // Estados dos filtros
  const [pesquisa, setPesquisa] = useState("");
  const [filtroEstoque, setFiltroEstoque] = useState("todos");

  function adicionarAoCarrinho(preco) {
    setQuantidade(quantidade + 1);
    setTotal(total + preco);
  }

  function adicionarProduto(produto) {
    setProdutos((produtosAtuais) => [...produtosAtuais, produto]);
  }

  // Pesquisa + filtro
  const produtosFiltrados = produtos.filter((produto) => {
    // Pesquisa pelo nome
    const correspondePesquisa = produto.nome
      .toLowerCase()
      .includes(pesquisa.toLowerCase());

    // Filtro de estoque
    const correspondeEstoque =
      filtroEstoque === "todos" ||
      (filtroEstoque === "disponiveis" && produto.estoque > 0) ||
      (filtroEstoque === "semEstoque" && produto.estoque === 0);

    // Os dois precisam ser verdadeiros
    return correspondePesquisa && correspondeEstoque;
  });

  return (
    <div className="app">
      <h1>Revisão React</h1>

      <ResumoCarrinho quantidade={quantidade} total={total} />

      <FormularioProduto adicionarProduto={adicionarProduto} />

      <FiltrosProdutos
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
        filtroEstoque={filtroEstoque}
        setFiltroEstoque={setFiltroEstoque}
      />

      <ListaProdutos
        produtos={produtosFiltrados}
        adicionarAoCarrinho={adicionarAoCarrinho}
      />
    </div>
  );
}

export default App;
