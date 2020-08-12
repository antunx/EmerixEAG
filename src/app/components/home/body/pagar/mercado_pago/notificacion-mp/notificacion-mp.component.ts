import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPago } from '@app/models/postPago.model';
import { PostService } from '@services/post.service';
import { PropService } from '@services/prop.service';

@Component({
  selector: 'app-notificacion-mp',
  templateUrl: './notificacion-mp.component.html',
  styleUrls: [],
})
export class NotificacionMpComponent implements OnInit {
  IdMercadoPago: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private propService: PropService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.IdMercadoPago = params.id;
      console.log(this.IdMercadoPago);
      if (this.IdMercadoPago !== undefined) {
        fetch(
          `https://api.mercadopago.com/v1/payments/${
            this.IdMercadoPago
          }?access_token=${this.propService.getAccesToken()}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            const pago: IPago = {
              IdPagoMP: data.id,
              Id: parseInt(data.external_reference, 10),
              Estado: data.status,
              Origen: 'MP',
              EstadoDetalle: data.status_detail,
              MedioDePago: data.payment_type_id,
            };
            console.log(pago);
            this.postService.postPagoSinToken(pago).subscribe((respuesta) => {
              console.log(respuesta);
            });
          });
      }
    });
  }
}
