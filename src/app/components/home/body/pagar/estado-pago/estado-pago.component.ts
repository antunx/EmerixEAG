import {
  Component,
  OnInit,
  HostBinding,
  Output,
  EventEmitter,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estado-pago',
  templateUrl: './estado-pago.component.html',
  styleUrls: [],
})
export class EstadoPagoComponent implements OnInit {
  @HostBinding('class') class = 'pages-container flex-grow';
  @Output() volver = new EventEmitter<string>();
  estadoPago: string;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.estadoPago = '';
    this.activatedRoute.queryParams.subscribe((params) => {
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
      /*if (
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
        });
      }*/
    });
  }

  volverHome(): void {
    this.volver.emit('');
  }
}
