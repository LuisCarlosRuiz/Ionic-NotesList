import { Injectable, LOCALE_ID } from '@angular/core';
import { Lista } from '../models/lista.model';
import { ListaItem } from '../models/lista-item.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() {
    this.cargarStorage();
  }

  crearLista(titulo: string): Lista {
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();
    return nuevaLista;
  }

  obtenerLista(id: string | number): Lista {
    id = Number(id);
    return this.listas.find(a => a.id === id);
  }

  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  cargarStorage() {
    const data = localStorage.getItem('data');
    if (data)
      this.listas = JSON.parse(data);
  }

  borrarLista(item: Lista) {
    const index = this.listas.indexOf(item, 0);

    if (index >= 0)
      this.listas.splice(index, 1);

    this.guardarStorage();
  }
}
