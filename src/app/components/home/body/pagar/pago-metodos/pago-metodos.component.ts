import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ɵConsole,
} from '@angular/core';
import { PropService } from '@app/services/prop.service';
import { GetService } from '@app/services/get.service';
import { PostService } from '@app/services/post.service';
import { TranslateService } from '@ngx-translate/core';
import { IfStmt } from '@angular/compiler';
import { PrePago } from '@models/postPrePago.model';

@Component({
  selector: 'app-pago-metodos',
  templateUrl: './pago-metodos.component.html',
  styles: [],
})
export class PagoMetodosComponent implements OnInit {
  // pago: any;
  @Input() pagoStep: number;
  @Input() pago;
  @Output() volviendo = new EventEmitter<number>();

  mensajeLoad = '';

  constructor(
    private propService: PropService,
    private postService: PostService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // this.pago = this.propService.getPego();
    // console.log(this.pago);
  }

  volver(): void {
    // this.pago = this.propService.getPego();
    // console.log(this.pago);
    this.pagoStep = this.pagoStep - 1;
    this.volviendo.emit(this.pagoStep);
  }

  cerrarPopup(): void {
    (document.getElementById(
      `overlay-metodos`
    ) as HTMLInputElement).classList.remove('active');
  }

  GenerarPrepago(): void {
    // console.log(forma.value);
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
      const productoAux = {
        IdObjeto: producto.id,
        Importe: producto.importe,
        TipoObjeto: '',
      };
      if (producto.tipo === 'PROMESA') {
        productoAux.TipoObjeto = 'PROMESA';
      } else if (producto.tipo === 'MONTO') {
        productoAux.TipoObjeto = 'MONTO';
      } else {
        productoAux.TipoObjeto = 'CUENTA';
      }
      obj.Items.push(productoAux);
      // console.log(producto);
      if (producto.tipo !== 'PROMESA' && producto.tipo !== 'MONTO') {
        if (producto.cuotas !== undefined && producto.cuotas.length > 0) {
          // console.log(producto);
          const importeCuota = producto.importe / producto.cuotas.length;
          producto.cuotas.forEach((cuota) => {
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
    const aux = {};
    this.postService.postPrePago(obj).subscribe((res) => {
      this.mensajeLoad = 'Generando Preferencia';
      res.Preferencia.map((propiedades) => {
        aux[propiedades.Propiedad] = propiedades.Valor;
      });
      const newLocal = 'access_token';
      this.propService.setAccesToken(aux[newLocal]);
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
