import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComunicacionService } from '@app/services/comunicacion.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@app/services/auth.service';

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
    private translate: TranslateService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.traducirEtiqueta(this.router.url);
  }

  traducirEtiqueta(ruta: string): void {
    switch (ruta) {
      case '/home/default':
        this.Traducir('Traduct.inicio');
        break;

      case '/home/producto':
        this.Traducir('Traduct.mis_cuentas');
        break;

      case '/home/pagar':
        this.Traducir('Traduct.pagar');
        break;

      case '/home/comprobante':
        this.Traducir('Traduct.comprobantes');
        break;

      case '/home/promesa':
        this.Traducir('Traduct.promesa_pago');
        break;

      case '/home/plan_pago':
        this.Traducir('Traduct.plan_pago');
        break;

      case '/home/estado_solicitudes':
        this.Traducir('Traduct.estado_solicitudes');
        break;

      case '/home/tu_perfil':
        this.Traducir('Traduct.tu_perfil');
        break;

      case '/home/preguntas':
        this.Traducir('Traduct.preguntas_frecuentes');
        break;

      default:
        this.Traducir('navigation: opcion de menu no controlada.');
        break;
    }
  }

  Traducir(termino: string): void {
    this.translate.get(termino).subscribe((translated: string) => {
      // translation =  translated;
      this.cambioTexto(translated);
      // const translation = this.translate.instant('Traduct.inicio');
    });
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
    this.router.navigateByUrl('/home/informar_comprobante');
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
    this.router.navigateByUrl('/home/preguntas');
  }

  Salir(): void{
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  cambioTexto(mensaje: string): void {
    this.servicioComunicacion.enviarMensaje(mensaje);
  }
}
