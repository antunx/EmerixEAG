import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GetService } from '@services/get.service';
import { Subscription } from 'rxjs';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {

  constructor(
    private router: Router,
    private getservices: GetService,
    private translate: TranslateService,
    private servicioComunicacion: ComunicacionService) { }

  Cliente: string;
  Menu: string;
  ngOnInit(): void {
    this.servicioComunicacion.enviarMensajeObservable.subscribe(mensaje => {
      this.Menu = mensaje;
      // console.log('Navegando a: ' + mensaje);
    });
    this.Cliente = localStorage.getItem('Cliente');
  }

  Inicio(): void{
    this.cambioTexto(this.translate.instant('Traduct.inicio'));
    this.router.navigateByUrl('/home/default');
  }

  // NOTIFICAMOS
  cambioTexto(mensaje: string): void {
    this.servicioComunicacion.enviarMensaje(mensaje);
  }
}
