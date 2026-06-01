import { Core } from "./Core";

export class News extends Core {
    private resumo: string;
    private autor: string;

    constructor(
        titulo: string,
        texto: string,
        imagem: string,
        dataPublicacao: string,
        tags: string,
        link: string,
        ativo: boolean,
        resumo: string,
        autor: string
    ) {
        super(
            titulo,
            texto,
            imagem,
            dataPublicacao,
            tags,
            link,
            ativo
        );

        this.resumo = resumo;
        this.autor = autor;
    }

    public setAutor(autor: string): void {
        this.autor = autor;
    }

    public getAutor(): string {
        return this.autor;
    }
}