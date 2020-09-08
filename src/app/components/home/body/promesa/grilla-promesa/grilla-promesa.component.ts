import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Promesa } from '@app/models/Promesa.model';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { PostService } from '../../../../../services/post.service';

@Component({
  selector: 'app-grilla-promesa',
  templateUrl: './grilla-promesa.component.html',
  styleUrls: [],
})
export class GrillaPromesaComponent implements OnInit, OnChanges {
  @Input() resp: Promesa;
  @Input() promesaStep: number;
  @Input() volverHome: boolean;
  @Output() volviendo = new EventEmitter<number>();
  @Output() siguiente = new EventEmitter<number>();
  @Output() promGen = new EventEmitter<any>();
  cuentas: Promesa;
  montoAPagar: number;
  fechaPromesa: Date;
  button: boolean;
  // promesaGenerada: boolean;
  periodo: string;
  // promesa: any;
  popupNro: number;
  MensajeAlert = '';
  checked: boolean;
  pagoMinimo: number;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.resp?.currentValue !== undefined) {
      this.cuentas = this.resp;
      this.pagoMinimo = this.resp.PagoMinimo;
      this.montoAPagar = this.resp.DeudaTotal;
      this.allChecked();
    }
  }

  ngOnInit(): void {
    // this.promesaGenerada = false;
    this.periodo = '';
    this.button = false;
    // this.fechaPromesa = null;
  }

  volver(): void {
    this.volviendo.emit(this.promesaStep - this.promesaStep);
  }

  allChecked(): void {
    this.checked = true;
    this.resp.Cuentas.forEach((cuenta) => {
      if (!cuenta.Check) {
        this.checked = false;
      }
    });
  }

  activarBox(id: number): void {
    const container = document.querySelector('#box-4261620203');
    const boxes = container.querySelectorAll('.box');

    boxes.forEach((box) => {
      box.classList.remove('active');
    });
    document.getElementById(`box-${id}`).classList.add('active');
  }

  cerrarPopup(): void {
    document.querySelector('#overlay-error').classList.remove('active');
    this.MensajeAlert = '';
    this.popupNro = 0;
  }

  cambiarCheck(id: number, e): void {
    this.cuentas.Cuentas.forEach((producto) => {
      if (producto.IdCuenta === id) {
        // CARGO VALORES EN EL IMPORTE A PAGAR
        document.getElementById(
          `monto-cancelar-${producto.IdCuenta}`
        ).innerHTML = producto.Deuda.toString();
        (document.getElementById(
          `monto-cancelar-${producto.IdCuenta}`
        ) as HTMLInputElement).value = (document.getElementById(
          `monto-cancelar-${producto.IdCuenta}`
        ) as HTMLInputElement).dataset.valor;

        const montoACancelar = parseFloat(
          (document.getElementById(
            `monto-cancelar-${producto.IdCuenta}`
          ) as HTMLInputElement).value
        );
        producto.Check = e.target.checked;
        if (producto.Check === false) {
          // CAMBIO A 0 AL DESCHECKEAR
          document.getElementById(
            `monto-cancelar-${producto.IdCuenta}`
          ).innerHTML = '0';
          (document.getElementById(
            `monto-cancelar-${producto.IdCuenta}`
          ) as HTMLInputElement).value = '0';

          if (montoACancelar <= producto.Deuda) {
            this.montoAPagar -= montoACancelar;
          } else {
            this.montoAPagar -= producto.Deuda;
          }
        } else {
          if (montoACancelar <= producto.Deuda) {
            this.montoAPagar += montoACancelar;
          } else {
            this.montoAPagar += producto.Deuda;
          }
        }
      }
    });
    this.allChecked();
  }

  checkAll(e): void {
    if (e.target.checked) {
      this.cuentas.Cuentas.forEach((producto) => {
        if (!producto.Check) {
          producto.Check = true;
          document.getElementById(
            `monto-cancelar-${producto.IdCuenta}`
          ).innerHTML = producto.Deuda.toString();
          (document.getElementById(
            `monto-cancelar-${producto.IdCuenta}`
          ) as HTMLInputElement).value = (document.getElementById(
            `monto-cancelar-${producto.IdCuenta}`
          ) as HTMLInputElement).dataset.valor;
          this.montoAPagar += parseFloat(
            (document.getElementById(
              `monto-cancelar-${producto.IdCuenta}`
            ) as HTMLInputElement).value ||
              document.getElementById(`monto-cancelar-${producto.IdCuenta}`)
                .innerHTML
          );
        }
      });
    } else {
      this.montoAPagar = 0;
      this.cuentas.Cuentas.forEach((producto) => {
        producto.Check = false;
        document.getElementById(
          `monto-cancelar-${producto.IdCuenta}`
        ).innerHTML = '0';
        (document.getElementById(
          `monto-cancelar-${producto.IdCuenta}`
        ) as HTMLInputElement).value = '0';
      });
    }
    this.allChecked();
  }

  cambiarMonto(e): void {
    const max = parseFloat(e.target.max);
    const valorAnterior = parseFloat(e.target.dataset.valor);
    const monto = parseFloat(e.target.value);
    if (e.target.value > max || e.target.value <= 0) {
      e.target.value = max;
      e.target.dataset.valor = max;
      this.montoAPagar += max - valorAnterior;
      this.button = false;
      return;
    }
    if (
      max >= e.target.value &&
      e.target.value > 0 &&
      valorAnterior !== monto
    ) {
      // console.log('entre');
      // this.montoAPagar -= max - monto + valorAnterior - max;
      this.montoAPagar -= valorAnterior - monto;
      e.target.dataset.valor = monto;
    }
    if (e.target.value > max || e.target.value <= 0) {
      e.target.value = max;
      this.button = false;
      return;
    }
    this.button = false;
  }

  deshabilitarBoton(): void {
    this.button = true;
  }

  /*formatfecha(e): void {
    e = new Date(e.target.value);
    let dt = e.getDate();
    dt++;
    let mn = e.getMonth();
    mn++;
    const yy = e.getFullYear();
    const nfecha = ((document.getElementById(
      'fecha'
    ) as HTMLInputElement).value = dt + '/' + mn + '/' + yy);
    document.getElementById('nfecha').hidden = false;
    document.getElementById('fecha').hidden = true;
  }*/

  /*cambiarInputFecha(): void {
    document.getElementById('fecha').hidden = false;
    document.getElementById('nfecha').hidden = true;
    document.getElementById('fecha').focus();
  }*/

  // setearFecha(e): void {
  //   // console.log(e.target.value);
  //   const aux = new Date();
  //   const fecha = new Date(e.target.value);
  //   fecha.setDate(fecha.getDate() + 1);
  //   if (this.cuentas.DiasMaximo === 0) {
  //     aux.setDate(aux.getDate() + this.cuentas.DiasMaximoParam);
  //   } else {
  //     aux.setDate(aux.getDate() + this.cuentas.DiasMaximo);
  //   }
  //   if (
  //     /*new Date(e.target.value)*/ fecha < new Date(Date.now()) ||
  //     /*new Date(e.target.value)*/ fecha > aux
  //   ) {
  //     this.fechaPromesa = null;
  //     this.button = true;
  //     this.MensajeAlert = this.translate.instant('Traduct.error_fecha_promesa');
  //     this.MensajeAlert = this.MensajeAlert.replace(
  //       'ParamDate',
  //       JSON.stringify(
  //         this.cuentas?.DiasMaximo || this.cuentas?.DiasMaximoParam
  //       )
  //     );
  //     this.popupNro = 1;
  //     document.querySelector('#overlay-error').classList.add('active');
  //     const intencion = {
  //       TipoObjeto: 'PROMESA',
  //       IdPersona: localStorage.getItem('version_core'),
  //       FechaObjeto: '',
  //       Importe: this.montoAPagar,
  //       MensajeValidacion: this.MensajeAlert,
  //       Cuentas: '',
  //     };
  //     this.postService.PostIntencion(intencion).subscribe((data) => {
  //       console.log(data);
  //     });
  //   } else {
  //     // this.formatfecha(e);
  //     /*const auxFecha = new Date(e.target.value);
  //     auxFecha.setDate(auxFecha.getDate() + 1);*/
  //     this.fechaPromesa = fecha;
  //     this.button = false;
  //   }
  // }

  setearFecha(e): void {
    const aux = new Date();
    const fecha = new Date(e.target.value);
    fecha.setDate(fecha.getDate() + 1);
    if (this.resp.DiasMaximo === 0) {
      aux.setDate(aux.getDate() + this.resp.DiasMaximoParam);
    } else {
      aux.setDate(aux.getDate() + this.resp.DiasMaximo);
    }
    if (fecha < new Date(Date.now()) || fecha > aux) {
      this.fechaPromesa = fecha;
      this.button = false;
      this.MensajeAlert = this.translate.instant('Traduct.error_fecha_promesa');
      this.MensajeAlert = this.MensajeAlert.replace(
        'ParamDate',
        JSON.stringify(this.resp?.DiasMaximo || this.resp?.DiasMaximoParam)
      );
      this.popupNro = 1;
      document.querySelector('#overlay-error').classList.add('active');
      const intencion = {
        TipoObjeto: 'PROMESA',
        IdPersona: localStorage.getItem('version_core'),
        FechaObjeto: this.fechaPromesa,
        Importe: this.montoAPagar,
        MensajeValidacion: this.MensajeAlert,
        Cuentas: '',
      };
      this.postService.PostIntencion(intencion).subscribe((data) => {
        console.log(data);
      });
    } else {
      this.fechaPromesa = fecha;
      this.button = false;
    }
  }

  cambiarPeriodo(e): void {
    const select = document.querySelector('.select2');
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

  generarPromesa(e): void {
    e.preventDefault();
    const aux = new Date();
    if (this.periodo !== '') {
      aux.setDate(aux.getDate() + parseInt(this.periodo, 10));
      this.fechaPromesa = aux;
    } else {
      if (this.resp.DiasMaximo === 0) {
        aux.setDate(aux.getDate() + this.resp.DiasMaximoParam);
      } else {
        aux.setDate(aux.getDate() + this.resp.DiasMaximo);
      }
    }

    // ESTOS IF CREO QUE YA NO SIRVEN PORQUE EL BOTON SE BLOQUEA SI NO ESTAN LAS CONDICIONES DADAS PARA CREAR LA PROMESA
    if (this.fechaPromesa < new Date(Date.now()) || this.fechaPromesa > aux) {
      this.button = false;
      this.MensajeAlert = this.translate.instant('Traduct.error_fecha_promesa');
      this.MensajeAlert = this.MensajeAlert.replace(
        'ParamDate',
        JSON.stringify(this.resp?.DiasMaximo || this.resp?.DiasMaximoParam)
      );
      this.popupNro = 1;
      document.querySelector('#overlay-error').classList.add('active');
      const intencion = {
        TipoObjeto: 'PROMESA',
        IdPersona: localStorage.getItem('version_core'),
        FechaObjeto: this.fechaPromesa,
        Importe: this.montoAPagar,
        MensajeValidacion: this.MensajeAlert,
        Cuentas: '',
      };
      this.postService.PostIntencion(intencion).subscribe((data) => {
        console.log(data);
      });
    } else if (this.montoAPagar < this.pagoMinimo || this.montoAPagar <= 0) {
      this.MensajeAlert = this.translate.instant('Traduct.error_monto_promesa');
      this.MensajeAlert = this.MensajeAlert.replace(
        '<PAGO_MINIMO>',
        JSON.stringify(this.cuentas.PagoMinimo)
      );
      this.MensajeAlert = this.MensajeAlert.replace(
        '<PAGO_MAXIMO>',
        JSON.stringify(this.cuentas.DeudaTotal)
      );
      this.popupNro = 1;
      document.querySelector('#overlay-error').classList.add('active');
      const intencion = {
        TipoObjeto: 'PROMESA',
        IdPersona: localStorage.getItem('version_core'),
        FechaObjeto: this.fechaPromesa || new Date(),
        Importe: this.montoAPagar,
        MensajeValidacion: this.MensajeAlert,
        Cuentas: '',
      };
      this.cuentas.Cuentas.forEach((promesa) => {
        if (promesa.Check) {
          intencion.Cuentas += promesa.IdCuenta + ',';
        }
      });
      this.postService.PostIntencion(intencion).subscribe((data) => {
        console.log(data);
      });
    } else if (
      this.fechaPromesa === null ||
      this.fechaPromesa === undefined ||
      isNaN(this.fechaPromesa.getDate())
    ) {
      this.MensajeAlert = this.translate.instant(
        'Traduct.seleccionar_una_fecha'
      );
      this.popupNro = 1;
      document.querySelector('#overlay-error').classList.add('active');
    } else {
      const promesa = {
        totalPagar: this.montoAPagar,
        deudaTotal: 0.0,
        cuentas: [],
        mensajes: { ...this.cuentas.Mensajes[0] },
        formaPromesa: 'PT',
        cliente: localStorage.getItem('version_core'),
        formaPago: 'PRODUCTO',
        fechaPromesa: new Date().toLocaleDateString(),
        fechaPromesaVencimiento: new Date(),
        idTipoPromesa: this.cuentas.IdTipoPromesa,
      };

      promesa.fechaPromesaVencimiento = this.fechaPromesa;

      if (this.montoAPagar < this.cuentas.DeudaTotal) {
        promesa.formaPromesa = 'PP';
      }

      this.cuentas.Cuentas.forEach((producto) => {
        if (producto.Check) {
          const objeto = { ...producto, ImportePago: 0 };
          if (this.cuentas.ActivoParcial) {
            promesa.deudaTotal += parseFloat(
              (document.getElementById(
                `monto-cancelar-${producto.IdCuenta}`
              ) as HTMLInputElement).max
            );
            objeto.ImportePago = parseFloat(
              (document.getElementById(
                `monto-cancelar-${producto.IdCuenta}`
              ) as HTMLInputElement).value
            );
          } else {
            promesa.deudaTotal += parseFloat(
              (document.getElementById(
                `monto-cancelar-${producto.IdCuenta}`
              ) as HTMLInputElement).innerText
            );
            objeto.ImportePago = parseFloat(
              (document.getElementById(
                `monto-cancelar-${producto.IdCuenta}`
              ) as HTMLInputElement).innerText
            );
          }
          promesa.cuentas.push(objeto);
        }
      });

      // this.promesa = promesa;
      // this.promesaGenerada = true;
      this.promesaStep = this.promesaStep + 1;
      this.siguiente.emit(this.promesaStep);
      this.promGen.emit(promesa);
      // console.log(this.promesa);
    }
  }

  removerComas(numero: string): string {
    if (numero === '' || numero === null) {
      return numero;
    }
    return numero.replace(',', '');
  }

  volveraHome(): void {
    this.router.navigateByUrl('/home/default');
  }
}
