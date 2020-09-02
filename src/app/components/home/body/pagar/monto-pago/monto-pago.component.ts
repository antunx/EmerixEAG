import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { productosPromesas } from '@app/models/productosypromesas.model';
import { prePago, Mensajes } from '@models/objetoprepago.model';

@Component({
  selector: 'app-monto-pago',
  templateUrl: './monto-pago.component.html',
  styleUrls: [],
})
export class MontoPagoComponent implements OnInit, OnChanges {
  @Input() resp: productosPromesas;
  @Input() pagoStep: number;
  @Input() volverHome: boolean;
  @Output() volviendo = new EventEmitter<number>();
  @Output() siguiente = new EventEmitter<number>();
  @Output() prePagoGen = new EventEmitter<any>();
  montoSeleccionado: number;
  DeudaTotalImprimir: Array<any>;
  MensajeAlert: string;
  popupNro: number;
  pago: prePago;
  deudaTotal: number;
  mensajes: Mensajes;
  montoAPagar: number;

  constructor(private translate: TranslateService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.resp?.currentValue !== undefined) {
      // console.log(this.resp);
      this.DeudaTotalImprimir = parseFloat(JSON.stringify(this.resp.DeudaTotal))
        .toFixed(2)
        .split('.');
      this.mensajes = this.resp.Mensajes[0];
      this.deudaTotal = this.resp.DeudaTotal;
      this.montoAPagar = this.resp.DeudaTotal;
      // console.log(this.DeudaTotalImprimir)
    }
  }

  ngOnInit(): void {
    this.montoSeleccionado = 1;
    this.DeudaTotalImprimir = [];
    // this.pagoParcial = 0;
  }

  volver(): void {
    this.volviendo.emit(this.pagoStep - this.pagoStep);
  }

  seleccionarTipoMonto(e): void {
    this.montoSeleccionado = e;
    if (e === 1) {
      (document.getElementById(
        'total-deuda'
      ) as HTMLInputElement).classList.add('active');
      (document.getElementById(
        'parcial-deuda'
      ) as HTMLInputElement).classList.remove('active');
      this.montoAPagar = this.resp.DeudaTotal;
    } else {
      (document.getElementById(
        'total-deuda'
      ) as HTMLInputElement).classList.remove('active');
      (document.getElementById(
        'parcial-deuda'
      ) as HTMLInputElement).classList.add('active');
      this.montoAPagar = parseFloat(
        (document.getElementById('monto') as HTMLInputElement).value
      );
    }
  }

  montoParcial(e): void {
    this.montoAPagar = parseFloat(e.target.value);
    // console.log(this.montoAPagar);
  }

  generarPago(e): void {
    // console.log(this.montoAPagar);
    if (
      this.montoSeleccionado === 2 &&
      this.montoAPagar.toString().split('.')[1]?.length > 2
    ) {
      this.MensajeAlert = this.translate.instant('Traduct.error_decimales');
      this.popupNro = 1;
      document.querySelector('#overlay-monto').classList.add('active');
      return;
    } else if (this.montoAPagar <= 0 || isNaN(this.montoAPagar)) {
      this.popupNro = 1;
      this.MensajeAlert = this.translate.instant('Traduct.error_monto_pago');
      this.MensajeAlert = this.MensajeAlert.replace(
        '<PAGO_MINIMO>',
        JSON.stringify(0)
      );
      this.MensajeAlert = this.MensajeAlert.replace(
        '<PAGO_MAXIMO>',
        JSON.stringify(this.resp.DeudaTotal)
      );
      (document.getElementById(
        `overlay-monto`
      ) as HTMLInputElement).classList.add('active');
      return;
    }
    const pago = {
      TotalPagar: this.montoAPagar,
      DeudaTotal: this.deudaTotal,
      Mensajes: { ...this.mensajes },
      Cliente: localStorage.getItem('version_core'),
      Items: [],
      TipoPago: 'MONTO',
    };
    const objeto = {
      Id: 0,
      Nombre: '',
      Deuda: this.deudaTotal,
      CodigoMoneda: '',
      Tipo: 'MONTO',
      ImportePagar: this.montoAPagar,
      Cuotas: [],
      DiasMora: 0,
    };
    pago.Items.push(objeto);
    this.pagoStep = this.pagoStep + 2;
    // this.pago = pago;
    this.siguiente.emit(this.pagoStep);
    this.prePagoGen.emit(pago);
    // console.log(JSON.stringify(pago));
  }

  cerrarPopup(): void {
    document.querySelector('#overlay-monto').classList.remove('active');
    this.MensajeAlert = '';
    this.popupNro = 0;
  }

  volveraHome(): void {
    this.router.navigateByUrl('/home/default');
  }
}




