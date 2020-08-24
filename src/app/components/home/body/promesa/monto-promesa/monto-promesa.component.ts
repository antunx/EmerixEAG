import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Promesa } from '@app/models/Promesa.model';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monto-promesa',
  templateUrl: './monto-promesa.component.html',
  styles: [],
})
export class MontoPromesaComponent implements OnInit, OnChanges {
  @Input() resp: Promesa;
  @Input() promesaStep: number;
  @Input() volverHome: boolean;
  @Output() volviendo = new EventEmitter<number>();
  @Output() siguiente = new EventEmitter<number>();
  @Output() promGen = new EventEmitter<any>();
  montoSeleccionado: number = 1;
  DeudaTotalImprimir = [];
  pagoParcial: number = 0;
  // promesa: any;
  periodo: string = '';
  fechaPromesa: Date;
  button: boolean;
  MensajeAlert: string;
  popupNro: number;
  pagoMinimo: number;

  constructor(private translate: TranslateService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.resp?.currentValue !== undefined) {
      // console.log(this.resp);
      this.pagoMinimo = this.resp.PagoMinimo;
      this.DeudaTotalImprimir = JSON.stringify(this.resp.DeudaTotal).split('.');
      // console.log(this.DeudaTotalImprimir)
    }
  }

  ngOnInit(): void {}

  volver(): void {
    this.volviendo.emit(this.promesaStep - this.promesaStep);
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
    } else {
      (document.getElementById(
        'total-deuda'
      ) as HTMLInputElement).classList.remove('active');
      (document.getElementById(
        'parcial-deuda'
      ) as HTMLInputElement).classList.add('active');
    }
  }

  montoParcial(e): void {
    this.pagoParcial = JSON.parse(e.target.value);
  }

  // cambiarPeriodo(e): void {
  //   const select = document.getElementById('selectFechaMonto');
  //   const placeholder = select.querySelector(
  //     '.placeholder div'
  //   ) as HTMLDivElement;
  //   const target = e.target;
  //   !select.classList.contains('date-selected') &&
  //     select.classList.toggle('active');
  //   if (target.classList.contains('selectable')) {
  //     if (target.classList.contains('date-picker')) {
  //       select.classList.add('date-selected');
  //       this.periodo = '';
  //       // console.log(this.periodo);
  //     } else {
  //       placeholder.innerText = target.innerText;
  //       this.periodo = target.parentElement.getAttribute('data-value');
  //       // console.log(this.periodo);
  //     }
  //   } else if (target.classList.contains('alternate-select')) {
  //     select.classList.remove('date-selected');
  //   }
  // }

  cambiarPeriodo(e): void {
    const select = document.getElementById('selectFechaMonto');
    this.button = false;
    const placeholder = select.querySelector(
      '.placeholder div'
    ) as HTMLDivElement;
    const target = e.target;
    !select.classList.contains('date-selected') &&
      select.classList.toggle('active');
    if (target.classList.contains('selectable')) {
      if (target.classList.contains('date-picker')) {
        select.classList.add('date-selected');
        this.periodo = '';
      } else {
        placeholder.innerText = target.innerText;
        this.periodo = target.parentElement.getAttribute('data-value');
      }
    } else if (target.classList.contains('alternate-select')) {
      select.classList.remove('date-selected');
    }
  }

  // setearFecha(e): void {
  //   // console.log(e.target.value);
  //   const aux = new Date();
  //   if (this.resp.DiasMaximo === 0) {
  //     aux.setDate(aux.getDate() + this.resp.DiasMaximoParam);
  //   } else {
  //     aux.setDate(aux.getDate() + this.resp.DiasMaximo);
  //   }
  //   if (
  //     new Date(e.target.value) < new Date(Date.now()) ||
  //     new Date(e.target.value) > aux
  //   ) {
  //     this.fechaPromesa = null;
  //     this.button = true;
  //     this.MensajeAlert = this.translate.instant('Traduct.error_fecha_promesa');
  //     this.MensajeAlert = this.MensajeAlert.replace(
  //       'ParamDate',
  //       JSON.stringify(this.resp?.DiasMaximo || this.resp?.DiasMaximoParam)
  //     );
  //     this.popupNro = 1;
  //     document.querySelector('#overlay-monto').classList.add('active');
  //   } else {
  //     // this.formatfecha(e);
  //     const auxFecha = new Date(e.target.value);
  //     auxFecha.setDate(auxFecha.getDate() + 1);
  //     this.fechaPromesa = auxFecha;
  //     this.button = false;
  //   }
  // }

  setearFecha(e): void {
    // console.log(e.target.value);
    const aux = new Date();
    const fecha = new Date(e.target.value);
    fecha.setDate(fecha.getDate() + 1);
    if (this.resp.DiasMaximo === 0) {
      aux.setDate(aux.getDate() + this.resp.DiasMaximoParam);
    } else {
      aux.setDate(aux.getDate() + this.resp.DiasMaximo);
    }
    if (
      /*new Date(e.target.value)*/ fecha < new Date(Date.now()) ||
      /*new Date(e.target.value)*/ fecha > aux
    ) {
      this.fechaPromesa = null;
      this.button = true;
      this.MensajeAlert = this.translate.instant('Traduct.error_fecha_promesa');
      this.MensajeAlert = this.MensajeAlert.replace(
        'ParamDate',
        JSON.stringify(this.resp?.DiasMaximo || this.resp?.DiasMaximoParam)
      );
      this.popupNro = 1;
      document.querySelector('#overlay-monto').classList.add('active');
    } else {
      // this.formatfecha(e);
      /*const auxFecha = new Date(e.target.value);
      auxFecha.setDate(auxFecha.getDate() + 1);*/
      this.fechaPromesa = fecha;
      this.button = false;
    }
  }

  generarPromesa(): void {
    if (this.periodo !== '' && this.fechaPromesa !== null) {
      const aux = new Date();
      aux.setDate(aux.getDate() + parseInt(this.periodo, 10));
      this.fechaPromesa = aux;
    }

    // console.log(this.fechaPromesa)
    if (
      (this.montoSeleccionado === 2 &&
        (this.pagoParcial < this.pagoMinimo ||
          this.pagoParcial > this.resp.DeudaTotal)) ||
      (this.montoSeleccionado === 1 && this.resp.DeudaTotal <= 0)
    ) {
      this.MensajeAlert = this.translate.instant('Traduct.error_monto_promesa');
      this.MensajeAlert = this.MensajeAlert.replace(
        '<PAGO_MINIMO>',
        JSON.stringify(this.resp.PagoMinimo)
      );
      this.MensajeAlert = this.MensajeAlert.replace(
        '<PAGO_MAXIMO>',
        JSON.stringify(this.resp.DeudaTotal)
      );
      this.popupNro = 1;
      document.querySelector('#overlay-monto').classList.add('active');
    } else if (this.fechaPromesa === null || this.fechaPromesa === undefined) {
      this.MensajeAlert = this.translate.instant(
        'Traduct.seleccionar_una_fecha'
      );
      this.popupNro = 1;
      document.querySelector('#overlay-monto').classList.add('active');
    } /*else if (this.periodo === '') {
      this.MensajeAlert = this.translate.instant(
        'Traduct.seleccionar_una_fecha'
      );
      this.popupNro = 1;
      document.querySelector('#overlay-monto').classList.add('active');
    }*/ else {
      const promesa = {
        totalPagar: 0,
        DeudaTotal: this.resp.DeudaTotal,
        cuentas: [],
        mensajes: { ...this.resp.Mensajes[0] },
        formaPromesa: 'PT',
        cliente: localStorage.getItem('version_core'),
        formaPago: 'IMPORTE',
        fechaPromesa: new Date().toLocaleDateString(),
        fechaPromesaVencimiento: new Date(),
        idTipoPromesa: this.resp.IdTipoPromesa,
      };

      promesa.fechaPromesaVencimiento = this.fechaPromesa;

      if (this.montoSeleccionado === 1) {
        promesa.totalPagar = this.resp.DeudaTotal;
      } else {
        promesa.totalPagar = this.pagoParcial;
        if (this.pagoParcial < this.resp.DeudaTotal) {
          promesa.formaPromesa = 'PP';
        }
      }
      // this.promesa = promesa;
      this.promesaStep = this.promesaStep + 2;
      this.siguiente.emit(this.promesaStep);
      this.promGen.emit(promesa);
      // console.log(this.promesa)
    }
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
