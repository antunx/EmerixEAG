import { Component, OnInit } from '@angular/core';
import { GetService } from '@app/services/get.service';
import { Router } from '@angular/router';
import { ComunicacionService } from '@app/services/comunicacion.service';
import { TranslateService } from '@ngx-translate/core';
import { PropService } from '@app/services/prop.service';
import { PromesaDetalle } from '@app/models/promesdetalle.model';

@Component({
  selector: 'app-promesa-detalle',
  templateUrl: './promesa-detalle.component.html',
  styles: [],
})
export class PromesaDetalleComponent implements OnInit {
  detalle: PromesaDetalle;
  cuentas: any;

  constructor(
    private router: Router,
    private servicioComunicacion: ComunicacionService,
    private translate: TranslateService,
    private propServices: PropService
  ) {}

  ngOnInit(): void {
    this.cambioTexto(this.translate.instant('Traduct.promesa_pago'));
    this.detalle = this.propServices.getDetalle();
    this.cuentas = this.detalle.Detalle;
    // console.log(this.cuentas);
  }

  volver(): void {
    this.router.navigateByUrl('/home/promesa-historica');
  }

  cambioTexto(mensaje: string): void {
    this.servicioComunicacion.enviarMensaje(mensaje);
  }
}
