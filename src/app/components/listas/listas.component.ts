import { Component, Input } from '@angular/core';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {

  @Input() completado: boolean = true;
  lista: Lista[] = [];

  constructor(private deseosService: DeseosService,
    private router: Router,
    private alert: AlertController) {
    this.lista = deseosService.listas;
  }

  borrar(item: Lista) {
    this.deseosService.borrarLista(item);
  }

  async editar(item: Lista) {

    const alert = await this.alert.create({
      header: 'Editar',
      inputs: [{
        name: 'nombreLista',
        type: 'text',
        value: item.titulo
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
          item.titulo = data['nombreLista'];
          this.deseosService.guardarStorage();
        }
      }]
    });

    alert.present();
  }

  listaSeleccionada(item: Lista) {
    if (!this.completado)
      this.router.navigateByUrl(`/tabs/tab1/new-note/${item.id}`);
    else
      this.router.navigateByUrl(`/tabs/tab2/new-note/${item.id}`);
  }
}
