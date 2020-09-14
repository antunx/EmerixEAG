import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { GetService } from '@app/services/get.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ComunicacionService } from '@app/services/comunicacion.service';
import { TranslateService } from '@ngx-translate/core';
import { PropService } from '@app/services/prop.service';
import { PromesaDetalle } from '@app/models/promesdetalle.model';

@Component({
  selector: 'app-promesa-historica',
  templateUrl: './promesa-historica.component.html',
  styles: [],
})
export class PromesaHistoricaComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'pages-container flex-grow';
  promesas = [];
  p = 1;
  private sub: Subscription;

  constructor(
    private getServices: GetService,
    private router: Router,
    private propServices: PropService,
    private servicioComunicacion: ComunicacionService,
    private translate: TranslateService
  ) {}

  sortData(): any {
    return this.promesas.sort((a, b) => {
      return (new Date(b.date) as any) - (new Date(a.date) as any);
    });
  }

  ngOnInit(): void {
    this.cambioTexto(this.translate.instant('Traduct.promesa_pago'));
    this.sub = this.getServices
      .getPromesaPago(localStorage.getItem('version_core'), 'false')
      .subscribe((res) => {
        this.promesas = res.Promesas;
        this.promesas = this.sortData();
        // console.log(this.promesas);
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  cambioTexto(mensaje: string): void {
    this.servicioComunicacion.enviarMensaje(mensaje);
  }

  iradetalle(item: PromesaDetalle): void {
    // console.log(item);
    this.propServices.setDetalle(item, false);
    this.router.navigateByUrl('home/promesa-detalle');
  }

  removerComas(numero: string): string {
    if (numero === '' || numero === null) {
      return numero;
    }
    return numero.replace(',', '');
  }

  abrirDetalle(promesa: string): void {
    this.promesas.forEach((prom, index) => {
      if (index !== parseInt(promesa, 10)) {
        document.getElementById(`promesa-${index}`).classList.remove('active');
      }
    });
    document.getElementById(`promesa-${promesa}`).classList.toggle('active');
  }
}
