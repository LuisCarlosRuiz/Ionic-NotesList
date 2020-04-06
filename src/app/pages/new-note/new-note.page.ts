import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from "../../models/lista.model";
import { ListaItem } from 'src/app/models/lista-item.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.page.html',
  styleUrls: ['./new-note.page.scss'],
})
export class NewNotePage {

  lista: Lista;
  nombreItem: string = '';

  constructor(private service: DeseosService,
    private route: ActivatedRoute,
    private alert: AlertController) {

    this.route.params.subscribe(params => {
      if (params['listaId'])
        this.lista = this.service.obtenerLista(params['listaId']);
    });

  }

  agregarItem() {
    if (this.nombreItem.length === 0) {
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);

    this.nombreItem = '';

    this.service.guardarStorage();
  }

  cambioCheck(item: ListaItem) {

    const completados = this.lista.items.filter(q => !q.completado).length;

    if (completados === 0) {
      this.lista.Terminacion = new Date();
      this.lista.completada = true;
    }else{
      this.lista.Terminacion = null;
      this.lista.completada = false;
    }

    this.service.guardarStorage();
  }

  borrar(index: number){
    this.lista.items.splice(index,1);
    this.service.guardarStorage();
  }

  async editar(i: number){

    const itemEditar = this.lista.items[i];

    const alert = await this.alert.create({
      header: 'Editar',
      inputs: [{
        name: 'nombreListaItem',
        type: 'text',
        value: itemEditar.descripcion
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar');
        }
      },
      {
        text: 'Guardar',
        handler: (data) => {
          itemEditar.descripcion = data['nombreListaItem'];
          this.service.guardarStorage();
        }
      }]
    });

    alert.present();
  }
}
