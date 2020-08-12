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

  MenuCuentas: string;
  MenuPagos: string;
  MenuPagosSubMenuPagar: string;
  MenuPagosSubRegistraPagos: string;
  MenuAcuerdos: string;
  MenuAcuerdosSubPromesaPago: string;
  MenuAcuerdosSubPlanPago: string;
  MenuAcuerdosSubEstadoSolicitudes: string;

  MenuInicio: string;
  MenuPagar: string;
  MenuAvisarPago: string;
  MenuPrometerFecha: string;
  MenuPagarCuotas: string;
  MenuPromesasHechas: string;
  MenuPlanesPedidos: string;
  MenuComprobantes: string;
  MenuTuPerfil: string;
  MenuPreguntas: string;

  constructor(
    private router: Router,
    private servicioComunicacion: ComunicacionService,
    private translate: TranslateService,
    private authService: AuthService) {
    }

  ngOnInit(): void {
      this.translate.get('Traduct.inicio').subscribe((translated: string) => {
       this.MenuSel = translated;
       this.MenuInicio = translated;
       this.router.navigateByUrl('/home/default');
      });
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

  /* RegistrarPago(): void{
    this.MenuPagos = this.translate.instant('Traduct.pagos');
    this.MenuPagosSubRegistraPagos = this.translate.instant('Traduct.registrar_pago');
    this.cambioTexto(this.translate.instant('Traduct.registrar_pago'));
    this.router.navigateByUrl('/home/informar_comprobante');
  } */

  Acuerdos(): void{
    this.MenuAcuerdos = this.translate.instant('Traduct.acuerdos');
    this.MenuSel = this.MenuAcuerdos;
  }

  PromesasPago(): void{
    this.MenuAcuerdos = this.translate.instant('Traduct.acuerdos');
    this.MenuAcuerdosSubPromesaPago = this.translate.instant('Traduct.promesa_pago');
    this.cambioTexto(this.translate.instant('Traduct.promesa_pago'));
    this.router.navigateByUrl('/home/promesa');
  }

  PlanPago(): void{
    this.MenuAcuerdos = this.translate.instant('Traduct.acuerdos');
    this.MenuAcuerdosSubPlanPago = this.translate.instant('Traduct.plan_pago');
    this.cambioTexto(this.translate.instant('Traduct.plan_pago'));
    alert('PlanPago(): en desarrollo |_(-.-)_T ');
  }

  EstadoSolicitudes(): void{
    this.MenuAcuerdos = this.translate.instant('Traduct.acuerdos');
    this.MenuAcuerdosSubEstadoSolicitudes = this.translate.instant('Traduct.estado_solicitudes');
    this.cambioTexto(this.translate.instant('Traduct.estado_solicitudes'));
    alert('EstadoSolicitudes(): en desarrollo |_(-.-)_T ');
  }





  Inicio(): void{
    this.MenuSel = this.translate.instant('Traduct.inicio');
    this.MenuInicio = this.translate.instant('Traduct.inicio');

    this.cambioTexto(this.translate.instant('Traduct.inicio'));
    this.router.navigateByUrl('/home/default');
  }

  Pagar(): void{
    this.MenuSel = this.translate.instant('Traduct.pagar');
    this.MenuPagar = this.translate.instant('Traduct.pagar');
    this.cambioTexto(this.translate.instant('Traduct.pagar'));
    this.router.navigateByUrl('/home/pagar');
  }

  AvisarPago(): void{
    this.MenuSel = this.translate.instant('Traduct.avisar_pago');
    this.MenuAvisarPago = this.translate.instant('Traduct.avisar_pago');
    this.cambioTexto(this.translate.instant('Traduct.avisar_pago'));
    this.router.navigateByUrl('/home/informar_comprobante');
  }

  PrometeFecha(): void{
    this.MenuSel = this.translate.instant('Traduct.prometer_fecha');
    this.MenuPrometerFecha  = this.translate.instant('Traduct.prometer_fecha');
    this.cambioTexto(this.translate.instant('Traduct.prometer_fecha'));
    // this.router.navigateByUrl('/home/prometer_fecha');
    alert('PrometeFecha(): en desarrollo |_(-.-)_T ');
  }

  PagarCuotas(): void{
    this.MenuSel = this.translate.instant('Traduct.pagar_cuotas');
    this.MenuPagarCuotas = this.translate.instant('Traduct.pagar_cuotas');
    this.cambioTexto(this.translate.instant('Traduct.pagar_cuotas'));
    // this.router.navigateByUrl('/home/pagar_cuotas');
    alert('PagarCuotas(): en desarrollo |_(-.-)_T ');
  }

  PromesasHechas(): void{
    this.MenuSel = this.translate.instant('Traduct.promesas_hechas');
    this.MenuPromesasHechas = this.translate.instant('Traduct.promesas_hechas');
    this.cambioTexto(this.translate.instant('Traduct.promesas_hechas'));
    // this.router.navigateByUrl('/home/promesas_hechas');
    alert('PromesasHechas(): en desarrollo |_(-.-)_T ');
  }

  PlanesPedidos(): void{
    this.MenuSel = this.translate.instant('Traduct.planes_pedidos');
    this.MenuPlanesPedidos = this.translate.instant('Traduct.planes_pedidos');
    this.cambioTexto(this.translate.instant('Traduct.planes_pedidos'));
    // this.router.navigateByUrl('/home/planes_pedidos');
    alert('PlanesPedidos(): en desarrollo |_(-.-)_T ');
  }

  Comprobantes(): void{
    this.MenuSel = this.translate.instant('Traduct.tus_comprobantes');
    this.MenuPagos = this.translate.instant('Traduct.pagos');
    this.MenuComprobantes = this.translate.instant('Traduct.tus_comprobantes');
    this.cambioTexto(this.translate.instant('Traduct.tus_comprobantes'));
    this.router.navigateByUrl('/home/comprobante');
  }

  TuPerfil(): void{
    this.MenuSel = this.translate.instant('Traduct.tu_perfil');
    this.MenuTuPerfil = this.translate.instant('Traduct.tu_perfil');
    this.cambioTexto(this.translate.instant('Traduct.tu_perfil'));
    this.router.navigateByUrl('/home/tu_perfil');
  }

  PreguntasFrecuentes(): void{
    this.MenuSel = this.translate.instant('Traduct.preguntas_frecuentes');
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
