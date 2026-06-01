import { Core } from "./Core";
import { Fotos } from "./Fotos";

export class Galeria extends Core {
    private fotos: Fotos[];

    constructor(
        titulo: string,
        texto: string,
        imagem: string,
        dataPublicacao: string,
        tags: string,
        link: string,
        ativo: boolean,
        fotos: Fotos[]
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

        this.fotos = fotos;
    }
}