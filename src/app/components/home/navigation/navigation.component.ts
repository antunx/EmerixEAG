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

  Inicio(): void{
    this.MenuSel = this.translate.instant('Traduct.inicio');
    this.MenuInicio = this.translate.instant('Traduct.inicio');
    this.cambioTexto(this.translate.instant('Traduct.inicio'));
    this.router.navigateByUrl('/home/default');
    this.clickMobile(true);
  }

  Pagar(): void{
    this.MenuSel = this.translate.instant('Traduct.pagar');
    this.MenuPagar = this.translate.instant('Traduct.pagar');
    this.cambioTexto(this.translate.instant('Traduct.pagar'));
    this.router.navigateByUrl('/home/pagar');
    this.clickMobile(true);
  }

  AvisarPago(): void{
    this.MenuSel = this.translate.instant('Traduct.avisar_pago');
    this.MenuAvisarPago = this.translate.instant('Traduct.avisar_pago');
    this.cambioTexto(this.translate.instant('Traduct.avisar_pago'));
    this.router.navigateByUrl('/home/informar_comprobante');
    this.clickMobile(true);
  }

  PrometeFecha(): void{
    this.MenuSel = this.translate.instant('Traduct.prometer_fecha');
    this.MenuPrometerFecha  = this.translate.instant('Traduct.prometer_fecha');
    this.cambioTexto(this.translate.instant('Traduct.prometer_fecha'));
    this.router.navigateByUrl('/home/promesa');
    this.clickMobile(true);
  }

  PagarCuotas(): void{
    this.MenuSel = this.translate.instant('Traduct.pagar_cuotas');
    this.MenuPagarCuotas = this.translate.instant('Traduct.pagar_cuotas');
    this.cambioTexto(this.translate.instant('Traduct.pagar_cuotas'));
    // this.router.navigateByUrl('/home/pagar_cuotas');
    alert('PagarCuotas(): en desarrollo |_(-.-)_T ');
    this.clickMobile(true);
  }

  PromesasHechas(): void{
    this.MenuSel = this.translate.instant('Traduct.promesas_hechas');
    this.MenuPromesasHechas = this.translate.instant('Traduct.promesas_hechas');
    this.cambioTexto(this.translate.instant('Traduct.promesas_hechas'));
    this.router.navigateByUrl('/home/promesa-historica');
    this.clickMobile(true);
  }

  PlanesPedidos(): void{
    this.MenuSel = this.translate.instant('Traduct.planes_pedidos');
    this.MenuPlanesPedidos = this.translate.instant('Traduct.planes_pedidos');
    this.cambioTexto(this.translate.instant('Traduct.planes_pedidos'));
    this.router.navigateByUrl('/home/acuerdo-historico');
    this.clickMobile(true);
  }

  Comprobantes(): void{
    this.MenuSel = this.translate.instant('Traduct.tus_comprobantes');
    this.MenuComprobantes = this.translate.instant('Traduct.tus_comprobantes');
    this.cambioTexto(this.translate.instant('Traduct.tus_comprobantes'));
    this.router.navigateByUrl('/home/comprobante');
    this.clickMobile(true);
  }

  TuPerfil(): void{
    this.MenuSel = this.translate.instant('Traduct.tu_perfil');
    this.MenuTuPerfil = this.translate.instant('Traduct.tu_perfil');
    this.cambioTexto(this.translate.instant('Traduct.tu_perfil'));
    this.router.navigateByUrl('/home/tu_perfil');
    this.clickMobile(true);
  }

  PreguntasFrecuentes(): void{
    this.MenuSel = this.translate.instant('Traduct.preguntas_frecuentes');
    this.MenuPreguntas = this.translate.instant('Traduct.preguntas_frecuentes');
    this.cambioTexto(this.translate.instant('Traduct.preguntas_frecuentes'));
    this.router.navigateByUrl('/home/preguntas');
    this.clickMobile(true);
  }

  Salir(): void{
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  // NOTIFICAMOS
  cambioTexto(mensaje: string): void {
    this.servicioComunicacion.enviarMensaje(mensaje);
  }

  clickMobile(active: boolean): void{
    const mobileMenuBtn = document.querySelector('#mobile-menu-toggle');
    const navOverlay = document.querySelector('#nav-overlay');

    // mobileMenuBtn.checked = false;
    (document.getElementById(`mobile-menu-toggle`) as HTMLInputElement).checked = false;

    if (active) {
      navOverlay.classList.remove('active');
    } else {
      navOverlay.classList.add('active');
    }
    if (!active) {
      navOverlay.classList.remove('active');
      // mobileMenuBtn.checked = false;
      (document.getElementById(`mobile-menu-toggle`) as HTMLInputElement).checked = false;
    }
  }
}
