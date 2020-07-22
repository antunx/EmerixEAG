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
  MenuSel: string;
  MenuHijoSel: string;

  MenuInicio: string;
  MenuCuentas: string;
  MenuPagos: string;
  MenuPagosSubMenuPagar: string;
  MenuPagosSubRegistraPagos: string;
  MenuPagosSubComprobantes: string;
  MenuAcuerdos: string;
  MenuAcuerdosSubPromesaPago: string;
  MenuAcuerdosSubPlanPago: string;
  MenuAcuerdosSubEstadoSolicitudes: string;
  MenuTuPerfil: string;
  MenuPreguntas: string;

  constructor(
    private router: Router,
    private servicioComunicacion: ComunicacionService,
    private translate: TranslateService,
    private authService: AuthService) { }

  ngOnInit(): void {
    // LA FORMA CLASICA DEL TRADUCTOR NO ANDA BIEN EN EL INICIO POR ESO SE USA LA SIGUIENTE.
    this.traducirEtiqueta(this.router.url);

    // LA FORMA CLASICA DEL TRADUCTOR NO ANDA BIEN EN EL INICIO POR ESO SE USA LA SIGUIENTE.
    this.translate.get('Traduct.inicio').subscribe((translated: string) => {
      this.MenuSel = translated;
      this.MenuHijoSel = translated;
      this.MenuInicio = translated;
    });
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

      case '/home/informar_comprobante':
        this.Traducir('Traduct.registrar_pago');
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
    this.MenuSel = this.translate.instant('Traduct.inicio');
    this.MenuHijoSel = '';
    this.MenuInicio = this.translate.instant('Traduct.inicio');

    this.cambioTexto(this.translate.instant('Traduct.inicio'));
    this.router.navigateByUrl('/home/default');
  }

  MisCuentas(): void{
    this.MenuSel = this.translate.instant('Traduct.mis_cuentas');
    this.MenuCuentas = this.translate.instant('Traduct.mis_cuentas');

    this.cambioTexto(this.translate.instant('Traduct.mis_cuentas'));
    this.router.navigateByUrl('/home/producto');
  }

  Pagos(): void{
    this.MenuPagos = this.translate.instant('Traduct.pagos');
    this.MenuSel = this.MenuPagos;
  }

  Pagar(): void{
    this.MenuHijoSel = this.translate.instant('Traduct.pagar');
    this.MenuPagos = this.translate.instant('Traduct.pagos');
    this.MenuPagosSubMenuPagar = this.translate.instant('Traduct.pagar');
    this.cambioTexto(this.translate.instant('Traduct.pagar'));
    alert('Pagar(): en desarrollo =(-.-)T ');
  }

  RegistrarPago(): void{
    this.MenuHijoSel = this.translate.instant('Traduct.registrar_pago');
    this.MenuPagos = this.translate.instant('Traduct.pagos');
    this.MenuPagosSubRegistraPagos = this.translate.instant('Traduct.registrar_pago');
    this.cambioTexto(this.translate.instant('Traduct.registrar_pago'));
    this.router.navigateByUrl('/home/informar_comprobante');
  }

  Comprobantes(): void{
    this.MenuHijoSel = this.translate.instant('Traduct.comprobantes');
    this.MenuPagos = this.translate.instant('Traduct.pagos');
    this.MenuPagosSubComprobantes = this.translate.instant('Traduct.comprobantes');
    this.cambioTexto(this.translate.instant('Traduct.comprobantes'));
    this.router.navigateByUrl('/home/comprobante');
  }

  Acuerdos(): void{
    this.MenuAcuerdos = this.translate.instant('Traduct.acuerdos');
    this.MenuSel = this.MenuAcuerdos;
  }

  PromesasPago(): void{
    this.MenuHijoSel = this.translate.instant('Traduct.promesa_pago');
    this.MenuAcuerdos = this.translate.instant('Traduct.acuerdos');
    this.MenuAcuerdosSubPromesaPago = this.translate.instant('Traduct.promesa_pago');
    this.cambioTexto(this.translate.instant('Traduct.promesa_pago'));
    this.router.navigateByUrl('/home/promesa');
  }

  PlanPago(): void{
    this.MenuHijoSel = this.translate.instant('Traduct.plan_pago');
    this.MenuAcuerdos = this.translate.instant('Traduct.acuerdos');
    this.MenuAcuerdosSubPlanPago = this.translate.instant('Traduct.plan_pago');
    this.cambioTexto(this.translate.instant('Traduct.plan_pago'));
    alert('PlanPago(): en desarrollo =(-.-)T ');
  }

  EstadoSolicitudes(): void{
    this.MenuHijoSel = this.translate.instant('Traduct.estado_solicitudes');
    this.MenuAcuerdos = this.translate.instant('Traduct.acuerdos');
    this.MenuAcuerdosSubEstadoSolicitudes = this.translate.instant('Traduct.estado_solicitudes');
    this.cambioTexto(this.translate.instant('Traduct.estado_solicitudes'));
    alert('EstadoSolicitudes(): en desarrollo =(-.-)T ');
  }

  TuPerfil(): void{
    this.MenuSel = this.translate.instant('Traduct.tu_perfil');
    this.MenuHijoSel = '';
    this.MenuTuPerfil = this.translate.instant('Traduct.tu_perfil');
    this.cambioTexto(this.translate.instant('Traduct.tu_perfil'));
    alert('TuPerfil(): en desarrollo =(-.-)T ');
  }

  PreguntasFrecuentes(): void{
    this.MenuSel = this.translate.instant('Traduct.preguntas_frecuentes');
    this.MenuHijoSel = '';
    this.MenuPreguntas = this.translate.instant('Traduct.preguntas_frecuentes');
    this.cambioTexto(this.translate.instant('Traduct.preguntas_frecuentes'));
    this.router.navigateByUrl('/home/preguntas');
  }

  Salir(): void{
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  // NOTIFICAMOS
  cambioTexto(mensaje: string): void {
    this.servicioComunicacion.enviarMensaje(mensaje);
  }
}
