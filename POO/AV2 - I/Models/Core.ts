export abstract class Core {
    private titulo: string;
    private texto: string;
    private imagem: string;
    private dataPublicacao: string;
    private tags: string;
    private link: string;
    private ativo: boolean;

    constructor(
        titulo: string,
        texto: string,
        imagem: string,
        dataPublicacao: string,
        tags: string,
        link: string,
        ativo: boolean
    ) {
        this.titulo = titulo;
        this.texto = texto;
        this.imagem = imagem;
        this.dataPublicacao = dataPublicacao;
        this.tags = tags;
        this.link = link;
        this.ativo = ativo;
    }

    public getAtivo(): boolean {
        return this.ativo;
    }

    public setAtivo(ativo: boolean): void {
        this.ativo = ativo;
    }

    public getTitulo(): string {
        return this.titulo;
    }
}