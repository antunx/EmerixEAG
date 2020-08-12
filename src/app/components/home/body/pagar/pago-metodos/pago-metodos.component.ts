import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropService } from '@app/services/prop.service';
import { GetService } from '@app/services/get.service';
import { PostService } from '@app/services/post.service';
import { TranslateService } from '@ngx-translate/core';
import { IfStmt } from '@angular/compiler';
import { PrePago } from '@models/postPrePago.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pago-metodos',
  templateUrl: './pago-metodos.component.html',
  styles: [],
})
export class PagoMetodosComponent implements OnInit {
  // pago: any;
  @Input() pagoGeneradoStep: number;
  @Input() pago;
  @Output() volviendo = new EventEmitter<number>();

  mensajeLoad = '';

  constructor(
    private propService: PropService,
    private postService: PostService,
    private translate: TranslateService
  ) {}

  metodo = {
    valor: '',
  };

  ngOnInit(): void {
    // this.pago = this.propService.getPego();
    // console.log(this.pago);
  }

  volver(): void {
    // this.pago = this.propService.getPego();
    // console.log(this.pago);
    if (this.pago?.Items.length !== 0) {
      this.pagoGeneradoStep = this.pagoGeneradoStep - 1;
    } else {
      this.pagoGeneradoStep = this.pagoGeneradoStep - 2;
    }
    this.volviendo.emit(this.pagoGeneradoStep);
  }

  cerrarPopup(): void {
    (document.getElementById(
      `overlay-metodos`
    ) as HTMLInputElement).classList.remove('active');
  }

  GenerarPrepago(forma: NgForm): void {
    // console.log(forma.value);
    if (forma.invalid) {
      (document.getElementById(
        'overlay-metodos'
      ) as HTMLInputElement).classList.add('active');
      return;
    }

    if (forma.value.metodo === 'Banco') {
      alert('Este metodo esta en desarrollo');
      return;
    }

    if (forma.value.metodo === 'MercadoPago') {
      (document.getElementById(
        'overlay-load-metodos'
      ) as HTMLInputElement).classList.add('active');
      this.mensajeLoad = 'Obteniendo informacion de pago';
      const obj: PrePago = {
        IdPersona: localStorage.getItem('version_core'),
        Fecha: new Date(Date.now()),
        ImporteTotal: JSON.parse(this.pago.TotalPagar),
        Items: [],
      };

      this.pago.Items.forEach((producto) => {
        // console.log(producto);
        const productoAux = {
          IdObjeto: producto.Id,
          Importe: producto.ImportePagar,
          TipoObjeto: producto.Tipo === 'PROMESA' ? 'PROMESA' : 'CUENTA',
        };
        obj.Items.push(productoAux);
        if (producto.Tipo !== 'PROMESA') {
          if (producto.Cuotas.length > 0) {
            const importeCuota = producto.ImportePagar / producto.Cuotas.length;
            producto.Cuotas.forEach((cuota) => {
              const cuotaAux = {
                IdObjeto: cuota,
                Importe: importeCuota,
                TipoObjeto: 'CUOPREST',
              };
              obj.Items.push(cuotaAux);
            });
          }
        }
      });
      // console.log(obj);
      const aux = {};
      this.postService.postPrePago(obj).subscribe((res) => {
        this.mensajeLoad = 'Generando Preferencia';
        res.Preferencia.map((propiedades) => {
          aux[propiedades.Propiedad] = propiedades.Valor;
        });
        this.propService.setAccesToken(aux['access_token']);
        // console.log(aux);
        const payment_methods = {
          excluded_payment_methods: JSON.parse(
            aux['payment_methods.excluded_payment_methods.id']
          ),
          excluded_payment_types: JSON.parse(
            aux['payment_methods.excluded_payment_types.id']
          ),
          default_payment_method_id:
            aux['payment_methods.default_payment_method_idd'],
          installments: JSON.parse(aux['payment_methods.installments']),
          default_installments: JSON.parse(
            aux['payment_methods.default_installments']
          ),
        };

        const items = {
          id: aux['items.id'],
          title: aux['items.title'],
          description: aux['items.description'],
          currency_id: aux['items.currency_id'],
          quantity: JSON.parse(aux['items.quantity']),
          unit_price: JSON.parse(aux['items.unit_price']),
        };

        const payer = {
          name: aux['payer.name'],
          surname: aux['payer.surname'],
          email: aux['payer.email'],
          phone: {
            area_code: aux['payer.phone.area_code'],
            number: aux['payer.phone.number'],
          },
          identification: {
            type: aux['payer.identification.type'],
            number: aux['payer.identification.number'],
          },
        };

        let dateFrom = aux['expiration_date_from'];
        dateFrom = dateFrom.replace(/[.]/g, '-');
         // console.log(dateFrom);

        let dateTo = aux['expiration_date_to'];
        dateTo = dateTo.replace(/[.]/g, '-');
        // console.log(dateTo);

        const preference = {
          items: [items],
          payer,
          payment_methods,
          back_urls: {
            success: aux['back_urls.success'],
            pending: aux['back_urls.pending'],
            failure: aux['back_urls.failure'],
          },
          auto_return: aux['auto_return'],
          expires: JSON.parse(aux['expires']),
          external_reference: aux['external_reference'],
          notification_url: aux['notification_url'],
          expiration_date_from: dateFrom,
          expiration_date_to: dateTo,
        };

        this.postService
          .postPreferenceMp(preference, aux['access_token'])
          .subscribe((res) => {
            this.mensajeLoad = 'Obteniendo Link de Pago';
            // console.log(res);
            const ActPreference = {
              IdPago: res.external_reference,
              Preferencia: res.sandbox_init_point,
            };

            this.postService
              .postActualizarPreference(ActPreference)
              .subscribe((res) => {
                if (res.ErrorCode === 0) {
                  document.location.href = ActPreference.Preferencia;
                }
              });
          });
      });
    }
  }
}
