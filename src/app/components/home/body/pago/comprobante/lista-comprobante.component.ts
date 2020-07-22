import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GetService } from '@services/get.service';
import { Comprobante } from '@app/models/comprobante.models';
import { Subscription } from 'rxjs';
import { ComunicacionService } from '@app/services/comunicacion.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lista-comprobante',
  templateUrl: './lista-comprobante.component.html',
  styles: [
  ]
})
export class ListaComprobanteComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private translate: TranslateService,
    private servicioComunicacion: ComunicacionService,
    private getservices: GetService) {}

  private subscription: Subscription = new Subscription();
  Comprobantes: Comprobante[];
  ngOnInit(): void{
    this.cambioTexto(this.translate.instant('Traduct.comprobantes'));
    this.getComprobantesDetalle();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  cambioTexto(mensaje: string): void {
    this.servicioComunicacion.enviarMensaje(mensaje);
  }
  getComprobantesDetalle(): void{
    this.subscription.add(this.getservices.getComprobantesDetail(localStorage.getItem('version_core'), 'false').subscribe((res) => {
      if (res.ErrorCode > 0){
        console.log(res.ErrorMessage);
      } else{
        this.Comprobantes = res.Comprobantes;
        // console.log(this.Comprobantes);
      }
    }, (err) => {
        console.log(err);
    }));
  }
}
