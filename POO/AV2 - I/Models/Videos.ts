import { Core } from "./Core";

export class Videos extends Core {
    private url: string;
    private duracao: string;

    constructor(
        titulo: string,
        texto: string,
        imagem: string,
        dataPublicacao: string,
        tags: string,
        link: string,
        ativo: boolean,
        url: string,
        duracao: string
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

        this.url = url;
        this.duracao = duracao;
    }
}