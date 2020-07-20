import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComunicacionService } from '@app/services/comunicacion.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styles: [
  ]
})
export class NavigationComponent implements OnInit {

  constructor(
    private router: Router,
    private servicioComunicacion: ComunicacionService,
    private translate: TranslateService) { }

  ngOnInit(): void {
  }

  cambioTexto(mensaje: string): void {
    this.servicioComunicacion.enviarMensaje(mensaje);
  }

  Inicio(): void{
    this.cambioTexto(this.translate.instant('Traduct.inicio'));
    this.router.navigateByUrl('/home/default');
  }

  MisCuentas(): void{
    this.cambioTexto(this.translate.instant('Traduct.mis_cuentas'));
    this.router.navigateByUrl('/home/producto');
  }

  Pagar(): void{
    this.cambioTexto(this.translate.instant('Traduct.pagar'));
    alert('Pagar(), en desarrollo');
  }

  RegistrarPago(): void{
    this.cambioTexto(this.translate.instant('Traduct.registrar_pago'));
    alert('RegistrarPago(), en desarrollo');
  }

  Comprobantes(): void{
    this.cambioTexto(this.translate.instant('Traduct.comprobantes'));
    this.router.navigateByUrl('/home/comprobante');
  }

  PromesasPago(): void{
    this.cambioTexto(this.translate.instant('Traduct.promesa_pago'));
    this.router.navigateByUrl('/home/promesa');
  }

  PlanPago(): void{
    this.cambioTexto(this.translate.instant('Traduct.plan_pago'));
    alert('PlanPago(), en desarrollo');
  }

  EstadoSolicitudes(): void{
    this.cambioTexto(this.translate.instant('Traduct.estado_solicitudes'));
    alert('EstadoSolicitudes(), en desarrollo');
  }

  TuPerfil(): void{
    this.cambioTexto(this.translate.instant('Traduct.tu_perfil'));
    alert('TuPerfil(), en desarrollo');
  }

  PreguntasFrecuentes(): void{
    this.cambioTexto(this.translate.instant('Traduct.preguntas_frecuentes'));
    alert('PreguntasFrecuentes(), en desarrollo');
  }

  Salir(): void{
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
