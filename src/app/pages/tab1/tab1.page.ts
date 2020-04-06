import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ListaItem } from 'src/app/models/lista-item.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  lista: Lista[] = []

  constructor(private deseosService: DeseosService,
    private router: Router,
    private alert: AlertController) {
    this.lista = deseosService.listas;
  }

  async agregarLista() {
    const alert = await this.alert.create({
      header: 'Nueva Lista',
      inputs: [{
        name: 'nombreLista',
        type: 'text',
        placeholder: 'Nombre de la lista'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar');
        }
      },
      {
        text: 'Crear',
        handler: (data) => {
          if (data.nombreLista) {
            const idLista = this.deseosService.crearLista(data.nombreLista).id;
            this.router.navigateByUrl(`/tabs/tab1/new-note/${idLista}`);
          } else {
            return
          }
        }
      }]
    });

    alert.present();
  }
}
