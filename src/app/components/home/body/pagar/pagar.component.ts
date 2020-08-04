import { Component, OnInit } from '@angular/core';
import { GetService } from '../../../../services/get.service';
import { Router } from '@angular/router';
import { PropService } from '@app/services/prop.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styles: [],
})
export class PagarComponent implements OnInit {
  promesas;
  productos;
  prestamos = [];
  deudaTotal: number;
  montoAPagar: number;
  tipoPago: string;
  pagoGeneradoStep: number;
  checkedProd: boolean;
  checkedProm: boolean;
  button: boolean;
  cuotasId: Array<any>;
  mensajes: any;
  pago: object;
  popupNro = 0;

  constructor(
    private getService: GetService,
    private router: Router,
    private propService: PropService
  ) {}

  ngOnInit(): void {
    this.tipoPago = 'PRODUCTO';
    this.pagoGeneradoStep = 0;
    this.cuotasId = [];
    this.getService
      .getProductosYPromesas(localStorage.getItem('version_core'))
      .subscribe((data: any) => {
        console.log(data);
        this.button = false;
        this.mensajes = data.Mensajes[0];
        // data.DeudaTotal = 45064.78;
        data.Productos.map((prod) => {
          if (prod.CodigoProducto === 'PRESTAMO') {
            // prod.Deuda = 82041.67;
            this.prestamos.push(prod);
          }
        });
        this.deudaTotal = data.DeudaTotal;
        this.montoAPagar = data.DeudaTotal;
        this.productos = data.Productos;
        this.promesas = data.Promesas;
        this.allCheckedProd();
        this.allCheckedProm();
      });
  }

  abrirPopup(id): void {
    // console.log(id);
    (document.getElementById(
      `overlay-${id}`
    ) as HTMLInputElement).classList.add('active');
    // document.querySelector('.overlay').classList.add('active');
  }

  cambiarMontoPrestamo(e, id): void {
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
    this.cuotasId.push({ id: { id }, cuotas: e.cuotas });
    // console.log(this.cuotasId);
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
    this.allCheckedProd();
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

  allCheckedProd(): void {
    this.checkedProd = true;
    this.productos.forEach((producto) => {
      if (!producto.Check) {
        this.checkedProd = false;
      }
    });
  }

  allCheckedProm(): void {
    this.checkedProm = true;
    this.promesas.forEach((promesa) => {
      if (!promesa.Check) {
        this.checkedProm = false;
      }
    });
  }

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

  deshabilitarBoton(): void {
    this.button = true;
  }

  removerComas(numero: string): string {
    if (numero === '' || numero === null) {
      return numero;
    }
    return numero.replace(',', '');
  }

  cambiarMontoProd(e): void {
    const max = parseFloat(e.target.max);
    const valorAnterior = parseFloat(e.target.dataset.valor);
    const monto = parseFloat(e.target.value);
    if (
      (e.target.value > max || e.target.value <= 0) &&
      this.tipoPago === 'PRODUCTO'
    ) {
      e.target.value = max;
      e.target.dataset.valor = max;
      this.montoAPagar += max - valorAnterior;
      this.button = false;
      return;
    }
    if (
      max >= e.target.value &&
      e.target.value > 0 &&
      this.tipoPago === 'PRODUCTO' &&
      valorAnterior !== monto
    ) {
      // console.log('entre');
      // this.montoAPagar -= max - monto + valorAnterior - max;
      this.montoAPagar -= valorAnterior - monto;
      e.target.dataset.valor = monto;
    }
    if (
      (e.target.value > max || e.target.value <= 0) &&
      this.tipoPago === 'IMPORTE'
    ) {
      e.target.value = max;
      this.button = false;
      return;
    }
    this.button = false;
  }

  cambiarMontoProm(e): void {
    const max = parseFloat(e.target.max);
    const min = parseFloat(e.target.min);
    const valorAnterior = parseFloat(e.target.dataset.valor);
    const monto = parseFloat(e.target.value);
    if (
      (e.target.value > max || e.target.value <= min) &&
      this.tipoPago === 'PRODUCTO'
    ) {
      e.target.value = max;
      e.target.dataset.valor = max;
      this.montoAPagar += max - valorAnterior;
      this.button = false;
      return;
    }
    if (
      max >= e.target.value &&
      e.target.value > min &&
      this.tipoPago === 'PRODUCTO' &&
      valorAnterior !== monto
    ) {
      // console.log('entre');
      // this.montoAPagar -= max - monto + valorAnterior - max;
      this.montoAPagar -= valorAnterior - monto;
      e.target.dataset.valor = monto;
    }
    if (
      (e.target.value > max || e.target.value <= min) &&
      this.tipoPago === 'IMPORTE'
    ) {
      e.target.value = max;
      this.button = false;
      return;
    }
    this.button = false;
  }

  generarPago(e): void {
    const pagoPorMonto = parseFloat(
      (document.getElementById('monto-monto') as HTMLInputElement).value
    );
    if (
      (this.montoAPagar <= 0 && this.tipoPago === 'PRODUCTO') ||
      (pagoPorMonto <= 0 && this.tipoPago === 'IMPORTE')
    ) {
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
    };
    if (this.tipoPago === 'PRODUCTO') {
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

      this.pagoGeneradoStep = this.pagoGeneradoStep + 1;
      this.pago = pago;
    } else {
      pago.TotalPagar = pagoPorMonto;
      this.propService.setPago(pago);
      this.pagoGeneradoStep = this.pagoGeneradoStep + 2;
      // this.router.navigateByUrl('home/metodos-pago');
    }
    console.log(pago);
  }

  seleccionarPago(e): void {
    if (e.target.value === 'IMPORTE') {
      this.productos.forEach((producto) => {
        producto.Check = false;
        (document.getElementById(
          'select-all-prod'
        ) as HTMLInputElement).checked = false;
        (document.getElementById(
          'select-all-prom'
        ) as HTMLInputElement).checked = false;
        this.montoAPagar = 0;
      });
    } else if (this.tipoPago !== e.target.value) {
      this.productos.forEach((producto) => {
        producto.Check = true;
        (document.getElementById(
          'select-all-prod'
        ) as HTMLInputElement).checked = true;
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
      this.promesas.forEach((promesa) => {
        promesa.Check = true;
        (document.getElementById(
          'select-all-prom'
        ) as HTMLInputElement).checked = true;
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
    }
    this.tipoPago = e.target.value;
  }

  onVolviendo(e): void {
    this.pagoGeneradoStep = e;
  }

  onContinuar(e): void {
    console.log(e);
    this.pagoGeneradoStep = e;
  }

  cerrarPopup(): void {
    (document.getElementById(
      `overlay-error`
    ) as HTMLInputElement).classList.remove('active');
    this.popupNro = 0;
  }

  cerrarCuotas(id): void {
    (document.getElementById(
      `overlay-${id}`
    ) as HTMLInputElement).classList.remove('active');
  }
}
