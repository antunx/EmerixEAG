import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '@app/services/comunicacion.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styles: [
  ]
})
export class DefaultComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private servicioComunicacion: ComunicacionService,
    private router: Router) { }

  ngOnInit(): void {
    this.cambioTexto(this.translate.instant('Traduct.inicio'));
  }

  cambioTexto(mensaje: string): void {
    this.servicioComunicacion.enviarMensaje(mensaje);
  }
}
