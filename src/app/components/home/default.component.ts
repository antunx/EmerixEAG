import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '@app/services/comunicacion.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styles: [
  ]
})
export class DefaultComponent implements OnInit {

  constructor(private servicioComunicacion: ComunicacionService) { }

  ngOnInit(): void {
    this.cambioTexto('Inicio');
  }

  cambioTexto(mensaje: string): void {
    this.servicioComunicacion.enviarMensaje(mensaje);
  }
}
