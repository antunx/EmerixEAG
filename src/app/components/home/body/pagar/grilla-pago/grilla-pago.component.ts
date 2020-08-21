import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { Mensajes, prePago, Item } from '@models/objetoprepago.model';
import {
  porductosPromesas,
  Promesa,
  Producto,
} from '@app/models/productosypromesas.model';

@Component({
  selector: 'app-grilla-pago',
  templateUrl: './grilla-pago.component.html',
  styleUrls: [],
})
export class GrillaPagoComponent implements OnInit, OnChanges {
  @Input() resp: porductosPromesas;
  @Input() pagoStep: number;
  @Output() volviendo = new EventEmitter<number>();
  @Output() siguiente = new EventEmitter<number>();
  @Output() prePagoGen = new EventEmitter<any>();
  promesas: Array<Promesa>;
  productos: Array<Producto>;
  mensajes: Mensajes;
  prestamos = [];
  cuotasId: Array<any>;
  deudaTotal: number;
  montoAPagar: number;
  button: boolean;
  checkedProd: boolean;
  checkedProm: boolean;
  pago: object;
  popupNro: number;

  constructor() {}

  ngOnInit(): void {
    this.cuotasId = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.button = false;
    // this.cuotasId = [];
    this.popupNro = 0;
    if (changes?.resp?.currentValue !== undefined) {
      // console.log(this.resp);
      this.promesas = this.resp.Promesas;
      this.productos = this.resp.Productos;
      this.mensajes = this.resp.Mensajes[0];
      this.deudaTotal = this.resp.DeudaTotal;
      this.montoAPagar = this.resp.DeudaTotal;
      this.resp.Productos.forEach((prod) => {
        if (prod.CodigoProducto === 'PRESTAMO') {
          this.prestamos.push(prod);
          this.guardarCuotas(prod);
        }
      });
      this.allCheckedProd();
      this.allCheckedProm();
    }
  }

  /** UTILIDADES */
  volver(): void {
    this.volviendo.emit(this.pagoStep - this.pagoStep);
  }

  private guardarCuotas(producto: any): void {
    const id = producto.IdCuenta;
    const cuotas = [];
    producto.CuotasPrestamo.forEach((cuota) => {
      cuotas.push(cuota.id_prestamo_cuota);
    });
    this.cuotasId.push({ id, cuotas });
  }

  activarBox(id: number): void {
    const container = document.querySelector('#box-9269257937');
    const boxes = container.querySelectorAll('.box');

    boxes.forEach((box) => {
      box.classList.remove('active');
    });
    document.getElementById(`box-${id}`).classList.add('active');
  }

  // activarBoxProm(id: number): void {
  //   const container = document.querySelector('#box-9269257938');
  //   const boxes = container.querySelectorAll('.box');

  //   boxes.forEach((box) => {
  //     box.classList.remove('active');
  //   });
  //   document.getElementById(`box-${id}`).classList.add('active');
  // }

  removerComas(numero: string): string {
    if (numero === '' || numero === null) {
      return numero;
    }
    return numero.replace(',', '');
  }

  deshabilitarBoton(): void {
    this.button = true;
  }

  abrirPopup(id): void {
    // console.log(id);
    (document.getElementById(
      `overlay-${id}`
    ) as HTMLInputElement).classList.add('active');
    // document.querySelector('.overlay').classList.add('active');
  }

  cerrarPopup(): void {
    document.querySelector('#overlay-error').classList.remove('active');
    this.popupNro = 0;
  }

  /** METODOS PRODUCTOS */
  checkAllProductos(e): void {
    if (e.target.checked) {
      this.productos.forEach((producto) => {
        producto.Check = true;
        /*document.getElementById(
          `monto-cancelar-${producto.IdCuenta}`
        ).innerHTML = producto.Deuda.toString();*/
        (document.getElementById(
          `monto-cancelar-${producto.IdCuenta}`
        ) as HTMLInputElement).value = (document.getElementById(
          `monto-cancelar-${producto.IdCuenta}`
        ) as HTMLInputElement).dataset.valor;
        this.montoAPagar += parseFloat(
          (document.getElementById(
            `monto-cancelar-${producto.IdCuenta}`
          ) as HTMLInputElement).value
        );
      });
    } else {
      // this.montoAPagar = 0;
      this.productos.forEach((producto) => {
        this.montoAPagar -= parseFloat(
          (document.getElementById(
            `monto-cancelar-${producto.IdCuenta}`
          ) as HTMLInputElement).value
        );
        producto.Check = false;
        /*document.getElementById(
              `monto-cancelar-${producto.IdCuenta}`
              ).innerHTML = '0';*/
        // console.log('monto a pagar', this.montoAPagar);
        (document.getElementById(
          `monto-cancelar-${producto.IdCuenta}`
        ) as HTMLInputElement).value = '0';
      });
    }
  }

  cambiarCheckProductos(id: number, e): void {
    this.productos.forEach((producto) => {
      if (producto.IdCuenta === id) {
        // CARGO VALORES EN EL IMPORTE A PAGAR
        /*document.getElementById(
          `monto-cancelar-${producto.IdCuenta}`
        ).innerHTML = producto.Deuda.toString();*/
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
          /*document.getElementById(
            `monto-cancelar-${producto.IdCuenta}`
          ).innerHTML = '0';*/
          /*console.log(
            (document.getElementById(
              `monto-cancelar-${producto.IdCuenta}`
            ) as HTMLInputElement).value
          );*/
          (document.getElementById(
            `monto-cancelar-${producto.IdCuenta}`
          ) as HTMLInputElement).value = '0';
          /*console.log(
            (document.getElementById(
              `monto-cancelar-${producto.IdCuenta}`
            ) as HTMLInputElement).value
          );*/
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
    this.allCheckedProd();
  }

  cambiarMontoProd(e): void {
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
    // if (
    //   (e.target.value > max || e.target.value <= 0) &&
    //   this.tipoPago === 'IMPORTE'
    // ) {
    //   e.target.value = max;
    //   this.button = false;
    //   return;
    // }
    this.button = false;
  }

  allCheckedProd(): void {
    this.checkedProd = true;
    this.productos?.forEach((producto) => {
      if (!producto.Check) {
        this.checkedProd = false;
      }
    });
  }

  cambiarMontoPrestamo(e, id): void {
    // console.log(e);
    const cuotas = [];
    const montoAnterior = (document.getElementById(
      `monto-cancelar-${id}`
    ) as HTMLInputElement).dataset.valor;
    (document.getElementById(
      `monto-cancelar-${id}`
    ) as HTMLInputElement).value = JSON.stringify(e.monto);
    this.montoAPagar -= parseFloat(montoAnterior) - e.monto;
    (document.getElementById(
      `monto-cancelar-${id}`
    ) as HTMLInputElement).dataset.valor = e.monto;
    // console.log((document.getElementById(`monto-cancelar-${ id }`) as HTMLInputElement))
    // console.log(e.cuotas);
    e.cuotas.array.forEach(element => {
      cuotas.push(e.cuotas[element]);
    });

    this.cuotasId.forEach((prestamo) => {
      if (prestamo.id === id) {
        prestamo.cuotas = cuotas;
      } else {
        this.cuotasId.push({ id, cuotas });
      }
    });
    // console.log(this.cuotasId);
  }

  /** METODOS PROMESAS */
  checkAllPromesas(e): void {
    if (e.target.checked) {
      this.promesas.forEach((promesa) => {
        promesa.Check = true;
        /*document.getElementById(
        `monto-cancelar-${promesa.IdPromesa}`
      ).innerHTML = promesa.ImporteComprometido.toString();*/
        (document.getElementById(
          `monto-cancelar-${promesa.IdPromesa}`
        ) as HTMLInputElement).value = (document.getElementById(
          `monto-cancelar-${promesa.IdPromesa}`
        ) as HTMLInputElement).dataset.valor;
        this.montoAPagar += parseFloat(
          (document.getElementById(
            `monto-cancelar-${promesa.IdPromesa}`
          ) as HTMLInputElement).value
        );
      });
    } else {
      // this.montoAPagar = 0;
      this.promesas.forEach((promesa) => {
        this.montoAPagar -= parseFloat(
          (document.getElementById(
            `monto-cancelar-${promesa.IdPromesa}`
          ) as HTMLInputElement).value
        );
        promesa.Check = false;
        /*document.getElementById(
        `monto-cancelar-${promesa.IdPromesa}`
      ).innerHTML = '0';*/
        (document.getElementById(
          `monto-cancelar-${promesa.IdPromesa}`
        ) as HTMLInputElement).value = '0';
      });
    }
  }

  cambiarCheckPromesas(id: number, e): void {
    this.promesas.forEach((promesa) => {
      if (promesa.IdPromesa === id) {
        // CARGO VALORES EN EL IMPORTE A PAGAR
        /*document.getElementById(
          `monto-cancelar-${promesa.IdPromesa}`
        ).innerHTML = producto.Deuda.toString();*/
        (document.getElementById(
          `monto-cancelar-${promesa.IdPromesa}`
        ) as HTMLInputElement).value = (document.getElementById(
          `monto-cancelar-${promesa.IdPromesa}`
        ) as HTMLInputElement).dataset.valor;

        const montoACancelar = parseFloat(
          (document.getElementById(
            `monto-cancelar-${promesa.IdPromesa}`
          ) as HTMLInputElement).value
        );
        promesa.Check = e.target.checked;
        if (promesa.Check === false) {
          // CAMBIO A 0 AL DESCHECKEAR
          /*document.getElementById(
            `monto-cancelar-${producto.IdCuenta}`
          ).innerHTML = '0';*/
          (document.getElementById(
            `monto-cancelar-${promesa.IdPromesa}`
          ) as HTMLInputElement).value = '0';

          if (montoACancelar <= promesa.ImporteComprometido) {
            this.montoAPagar -= montoACancelar;
          } else {
            this.montoAPagar -= promesa.ImporteComprometido;
          }
        } else {
          if (montoACancelar <= promesa.ImporteComprometido) {
            this.montoAPagar += montoACancelar;
          } else {
            this.montoAPagar += promesa.ImporteComprometido;
          }
        }
      }
    });
    this.allCheckedProm();
  }

  cambiarMontoProm(e): void {
    const max = parseFloat(e.target.max);
    const min = parseFloat(e.target.min);
    const valorAnterior = parseFloat(e.target.dataset.valor);
    const monto = parseFloat(e.target.value);
    if (e.target.value > max || e.target.value <= min) {
      e.target.value = max;
      e.target.dataset.valor = max;
      this.montoAPagar += max - valorAnterior;
      this.button = false;
      return;
    }
    if (
      max >= e.target.value &&
      e.target.value > min &&
      valorAnterior !== monto
    ) {
      // console.log('entre');
      // this.montoAPagar -= max - monto + valorAnterior - max;
      this.montoAPagar -= valorAnterior - monto;
      e.target.dataset.valor = monto;
    }
    // if (
    //   (e.target.value > max || e.target.value <= min) &&
    //   this.tipoPago === 'IMPORTE'
    // ) {
    //   e.target.value = max;
    //   this.button = false;
    //   return;
    // }
    this.button = false;
  }

  allCheckedProm(): void {
    this.checkedProm = true;
    this.promesas.forEach((promesa) => {
      if (!promesa.Check) {
        this.checkedProm = false;
      }
    });
  }

  /** PAGAR */
  generarPago(e): void {
    if (this.montoAPagar <= 0) {
      this.popupNro = 1;
      (document.getElementById(
        `overlay-error`
      ) as HTMLInputElement).classList.add('active');
      return;
    }
    const pago = {
      TotalPagar: 0,
      DeudaTotal: this.deudaTotal,
      Mensajes: { ...this.mensajes },
      Cliente: localStorage.getItem('version_core'),
      Items: [],
      TipoPago: 'PRODUCTOS',
    };
    // if (this.tipoPago === 'PRODUCTO') {
    pago.TotalPagar = this.montoAPagar;
    this.productos.forEach((producto) => {
      if (producto.Check) {
        const objeto = {
          Id: producto.IdCuenta,
          Nombre: producto.NombreProducto,
          Deuda: producto.Deuda,
          CodigoMoneda: producto.CodigoMoneda,
          Tipo: producto.CodigoProducto,
          ImportePagar: 0,
          Cuotas: [],
          DiasMora: producto.DiasMora,
        };
        objeto.ImportePagar = parseFloat(
          (document.getElementById(
            `monto-cancelar-${producto.IdCuenta}`
          ) as HTMLInputElement).value
        );
        if (objeto.Tipo === 'PRESTAMO') {
          // console.log(this.cuotasId);
          this.cuotasId.forEach((cuota) => {
            // console.log(cuota);
            if (cuota.id === producto.IdCuenta) {
              objeto.Cuotas = cuota.cuotas;
            }
          });
        }
        pago.Items.push(objeto);
      }
    });
    this.promesas.forEach((promesa) => {
      if (promesa.Check) {
        const objeto = {
          Id: promesa.IdPromesa,
          Nombre: '',
          Deuda: promesa.ImporteComprometido,
          CodigoMoneda: promesa.CodigoMoneda,
          Tipo: 'PROMESA',
          ImportePagar: 0,
          FechaPromesa: promesa.FechaGenerada,
          FechaComprometida: promesa.FechaComprometida,
        };
        objeto.ImportePagar = parseFloat(
          (document.getElementById(
            `monto-cancelar-${promesa.IdPromesa}`
          ) as HTMLInputElement).value
        );
        pago.Items.push(objeto);
      }
    });
    this.pagoStep = this.pagoStep + 1;
    // this.pago = pago;
    // console.log(JSON.stringify(pago))
    this.prePagoGen.emit(pago);
    this.siguiente.emit(this.pagoStep);
    // } else {
    //   pago.TotalPagar = pagoPorMonto;
    //   // this.propService.setPago(pago);
    //   this.pago = pago;
    //   this.pagoGeneradoStep = this.pagoGeneradoStep + 2;
    //   // this.router.navigateByUrl('home/metodos-pago');
    // }
  }
}