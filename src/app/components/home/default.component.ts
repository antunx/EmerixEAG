import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '@app/services/comunicacion.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styles: [
  ]
})
export class DefaultComponent implements OnInit {

  constructor(private servicioComunicacion: ComunicacionService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.cambioTexto(this.translate.instant('Traduct.inicio'));
  }

  cambioTexto(mensaje: string): void {
    this.servicioComunicacion.enviarMensaje(mensaje);
  }
}
