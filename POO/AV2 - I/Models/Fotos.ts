export class Fotos {
    private thumb: string;
    private thumbnail: string;
    private credito: string;
    private legenda: string;

    constructor(
        thumb: string,
        thumbnail: string,
        credito: string,
        legenda: string
    ) {
        this.thumb = thumb;
        this.thumbnail = thumbnail;
        this.credito = credito;
        this.legenda = legenda;
    }
}