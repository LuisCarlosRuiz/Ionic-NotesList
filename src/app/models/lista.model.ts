import { ListaItem } from './lista-item.model';

export class Lista {
    id: number;
    titulo: string;
    Creacion: Date;
    Terminacion: Date;
    completada: boolean;
    items: ListaItem[];

    constructor(titulo: string) {
        this.titulo = titulo;
        this.Creacion = new Date();
        this.completada = false;
        this.items = [];

        this.id = new Date().getTime();
    }
}