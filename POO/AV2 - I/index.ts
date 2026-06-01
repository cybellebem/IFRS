import { News } from "./Models/News";
import { OperationsNews } from "./Operations/OperationsNews";

const noticia1 = new News(
    "Notícia 1",
    "Texto 1",
    "img1.jpg",
    "01/06/2026",
    "esporte",
    "link1",
    true,
    "Resumo 1",
    "Autor 1"
);

const noticia2 = new News(
    "Notícia 2",
    "Texto 2",
    "img2.jpg",
    "01/06/2026",
    "política",
    "link2",
    true,
    "Resumo 2",
    "Autor 2"
);

const noticia3 = new News(
    "Notícia 3",
    "Texto 3",
    "img3.jpg",
    "01/06/2026",
    "tecnologia",
    "link3",
    false,
    "Resumo 3",
    "Autor 3"
);

const operacoes = new OperationsNews();

operacoes.inserir(noticia1);
operacoes.inserir(noticia2);
operacoes.inserir(noticia3);

console.log("TODAS AS NOTÍCIAS");
console.log(operacoes.getAll());

console.log("NOTÍCIAS ATIVAS");
console.log(operacoes.getActiveNews());

noticia2.setAutor("Novo Autor");
operacoes.alterar(noticia2);

operacoes.excluir(noticia1);

console.log("LISTA FINAL");
console.log(operacoes.getAll());