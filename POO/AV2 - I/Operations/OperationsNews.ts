import { News } from "../Models/News";

export class OperationsNews {
    private lista: Array<News | null>;

    constructor() {
        this.lista = [];
    }

    public inserir(n: News): boolean {
        if (n == null) {
            return false;
        }

        this.lista.push(n);
        return true;
    }

    public alterar(n: News): boolean {
        if (n == null) {
            return false;
        }

        const posicao = this.lista.findIndex(
            item => item?.getTitulo() === n.getTitulo()
        );

        if (posicao >= 0) {
            this.lista[posicao] = n;
            return true;
        }

        return false;
    }

    public excluir(n: News): boolean {
        if (n == null) {
            return false;
        }

        const posicao = this.lista.findIndex(
            item => item?.getTitulo() === n.getTitulo()
        );

        if (posicao >= 0) {
            this.lista[posicao] = null;
            return true;
        }

        return false;
    }

    public getAll(): Array<News | null> {
        return this.lista;
    }

    public getActiveNews(): Array<News> {
        return this.lista.filter(
            noticia =>
                noticia !== null &&
                noticia.getAtivo()
        ) as News[];
    }
}