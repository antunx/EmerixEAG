import { Component, OnInit, HostBinding } from '@angular/core';
import { ComunicacionService } from '@app/services/comunicacion.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '@app/services/post.service';
import { IPago } from '../../models/postPago.model';
import { RtagetProductPersonModel, Product } from '@app/models/rtagetproductperson.model';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styles: [
  ]
})
export class DefaultComponent implements OnInit {
  @HostBinding('class') class = 'pages-container flex-grow';
  estadoPago: string;
  Cliente: string;
  MostrarPopup: boolean;
  IdPersona = '';
  product: Product;
  productos: Product[] = [];
  constructor(
    private translate: TranslateService,
    private servicioComunicacion: ComunicacionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.cambioTexto(this.translate.instant('Traduct.inicio'));
    this.estadoPago = '';
    this.activatedRoute.queryParams.subscribe((params) => {
      // console.log(params.collection_status);
      switch (params.collection_status) {
        case 'approved':
          this.estadoPago = 'Aprobado';
          break;
        case 'in_process':
          this.estadoPago = 'Pendiente';
          break;
        case 'rejected':
          this.estadoPago = 'Rechazado';
          break;
        case 'null':
          this.estadoPago = 'Pago no completado';
          break;
      }
      if (
        params.collection_status === 'approved' ||
        params.collection_status === 'in_process' ||
        params.collection_status === 'rejected'
      ) {
        const pago: IPago = {
          IdPagoMP: params.collection_id,
          Id: params.external_reference,
          Estado: params.collection_status,
          Origen: 'EAG',
          EstadoDetalle: '',
          MedioDePago: params.payment_type,
        };
        this.postService.postPago(pago).subscribe((data) => {
          console.log(data);
          this.router.navigateByUrl('/home/default');
        });
      }
    });
    this.Cliente = localStorage.getItem('Cliente');
  }

  cambioTexto(mensaje: string): void {
    this.servicioComunicacion.enviarMensaje(mensaje);
  }

  onVolviendo(e): void {
    this.estadoPago = e;
  }

  AvisarPago(): void{
    // this.cambioTexto(this.translate.instant('Traduct.avisar_pago'));
    this.router.navigateByUrl('/home/informar_comprobante');
  }

  PrometeFecha(): void{
    // this.cambioTexto(this.translate.instant('Traduct.prometer_fecha'));
    // this.router.navigateByUrl('/home/prometer_fecha');
    alert('PrometeFecha(): en desarrollo |_(-.-)_T ');
  }

  PagarCuotas(): void{
    // this.cambioTexto(this.translate.instant('Traduct.pagar_cuotas'));
    // this.router.navigateByUrl('/home/pagar_cuotas');
    alert('PagarCuotas(): en desarrollo |_(-.-)_T ');
  }
}
