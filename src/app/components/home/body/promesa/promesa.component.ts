import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetService } from '@services/get.service';
import { Promesa } from '@models/Promesa.model';
import { Subscription } from 'rxjs';
import { ComunicacionService } from '@app/services/comunicacion.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-promesa',
  templateUrl: './promesa.component.html',
  styles: [],
})
export class PromesaComponent implements OnInit, OnDestroy {
  montoAPagar: number;
  fechaPromesa: Date;
  tipoPago: string;
  RespPromesa: Promesa;
  button: boolean;
  promesaGenerada: boolean;
  periodo: string;
  private sub: Subscription;
  promesa: any;
  MensajeAlert = '';

  constructor(
    private getService: GetService,
    private servicioComunicacion: ComunicacionService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.cambioTexto(this.translate.instant('Traduct.promesa_pago'));
    this.promesaGenerada = false;
    this.periodo = '1';
    this.tipoPago = 'PRODUCTO';
    this.sub = this.getService
      .getProductProm(localStorage.getItem('version_core'))
      .subscribe((data: Promesa) => {
        // console.log(data);
        this.button = false;
        data.ActivoMonto = true;
        data.ActivoParcial = true;
        data.ActivoProducto = true;
        this.RespPromesa = data;
        this.montoAPagar = data.DeudaTotal;
        if (!data.ActivoProducto && data.ActivoMonto) {
          this.tipoPago = 'IMPORTE';
        }
      });
  }

  cambioTexto(mensaje: string): void {
    this.servicioComunicacion.enviarMensaje(mensaje);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  cerrarPopup(): void {
    document.querySelector('.overlay').classList.remove('active');
    this.MensajeAlert = '';
  }

  cambiarCheck(id: number, e): void {
    this.RespPromesa.Cuentas.forEach((producto) => {
      if (producto.IdCuenta === id) {
        const montoACancelar = parseFloat(
          (document.getElementById(
            `monto-cancelar-${producto.IdCuenta}`
          ) as HTMLInputElement).value
        );
        producto.Check = e.target.checked;
        if (producto.Check === false) {
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
  }

  checkAll(e): void {
    if (e.target.checked) {
      this.montoAPagar = this.RespPromesa.DeudaTotal;
      this.RespPromesa.Cuentas.forEach((producto) => {
        producto.Check = true;
      });
    } else {
      this.montoAPagar = 0;
      this.RespPromesa.Cuentas.forEach((producto) => {
        producto.Check = false;
      });
    }
  }

  cambiarMonto(e): void {
    const max = parseFloat(e.target.max);
    const valorAnterior = parseFloat(e.target.dataset.valor);
    const monto = parseFloat(e.target.value);
    if (
      (e.target.value > max || e.target.value <= 0) &&
      this.tipoPago === 'PRODUCTO'
    ) {
      e.target.value = max;
      this.button = false;
      return;
    }
    if (
      max >= e.target.value &&
      e.target.value >= 0 &&
      this.tipoPago === 'PRODUCTO' &&
      valorAnterior !== monto
    ) {
      // console.log('entre');
      this.montoAPagar -= max - monto + valorAnterior - max;
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

  deshabilitarBoton(): void {
    this.button = true;
  }

  setearFecha(e): void {
    const aux = new Date();
    if (this.RespPromesa.DiasMaximo === 0) {
      aux.setDate(aux.getDate() + this.RespPromesa.DiasMaximoParam);
    } else {
      aux.setDate(aux.getDate() + this.RespPromesa.DiasMaximo);
    }
    if (
      new Date(e.target.value) < new Date(Date.now()) ||
      new Date(e.target.value) > aux
    ) {
      this.fechaPromesa = null;
      this.button = true;
      this.MensajeAlert = this.translate.instant('Traduct.error_fecha_promesa');
      this.MensajeAlert = this.MensajeAlert.replace(
        'ParamDate',
        JSON.stringify(
          this.RespPromesa?.DiasMaximo || this.RespPromesa?.DiasMaximoParam
        )
      );
      document.querySelector('.overlay').classList.add('active');
    } else {
      const auxFecha = new Date(e.target.value);
      auxFecha.setDate(auxFecha.getDate() + 1);
      this.fechaPromesa = auxFecha;
      this.button = false;
    }
  }

  seleccionarPago(e): void {
    this.tipoPago = e.target.value;
    if (this.tipoPago === 'IMPORTE') {
      this.RespPromesa.Cuentas.forEach((producto) => {
        producto.Check = false;
        (document.getElementById(
          'select-all'
        ) as HTMLInputElement).checked = false;
        this.montoAPagar = 0;
      });
    } else {
      this.RespPromesa.Cuentas.forEach((producto) => {
        producto.Check = true;
        (document.getElementById(
          'select-all'
        ) as HTMLInputElement).checked = true;
        this.montoAPagar = this.RespPromesa.DeudaTotal;
      });
    }
  }

  cambiarPeriodo(e): void {
    this.periodo = e.target.value;
  }

  generarPromesa(e): void {
    e.preventDefault();
    if (this.periodo !== 'fecha') {
      const aux = new Date();
      aux.setDate(aux.getDate() + parseInt(this.periodo, 10));
      this.fechaPromesa = aux;
    }
    const pagoPorMonto =
      parseFloat(
        (document.getElementById('monto-monto') as HTMLInputElement).value
      ) ||
      parseFloat(
        (document.getElementById('monto-monto') as HTMLInputElement).innerHTML
      );
    // ESTOS IF CREO QUE YA NO SIRVEN PORQUE EL BOTON SE BLOQUEA SI NO ESTAN LAS CONDICIONES DADAS PARA CREAR LA PROMESA
    if (!this.fechaPromesa) {
      alert('No se puede generar una promesa ya que la fecha es invalida');
    } else if (
      (this.montoAPagar < 1 && this.tipoPago === 'PRODUCTO') ||
      (pagoPorMonto < 1 && this.tipoPago === 'IMPORTE') ||
      (pagoPorMonto > this.RespPromesa.DeudaTotal &&
        this.tipoPago === 'IMPORTE') ||
      isNaN(pagoPorMonto)
    ) {
      alert(
        'No se puede generar una promesa ya que el monto debe ser mayor a 0 y menor a la deuda total (' +
          this.RespPromesa.DeudaTotal +
          ')'
      );
    } else {
      const promesa = {
        totalPagar: this.montoAPagar,
        deudaTotal: 0.0,
        cuentas: [],
        mensajes: { ...this.RespPromesa.Mensajes[0] },
        formaPromesa: 'PT',
        cliente: localStorage.getItem('version_core'),
        formaPago: this.tipoPago,
        fechaPromesa: new Date().toLocaleDateString(),
        fechaPromesaVencimiento: new Date(),
        idTipoPromesa: this.RespPromesa.IdTipoPromesa,
      };

      promesa.fechaPromesaVencimiento = this.fechaPromesa;

      if (
        (this.montoAPagar < this.RespPromesa.DeudaTotal &&
          this.tipoPago === 'PRODUCTO') ||
        (pagoPorMonto < this.RespPromesa.DeudaTotal &&
          this.tipoPago === 'IMPORTE')
      ) {
        promesa.formaPromesa = 'PP';
      }

      if (promesa.formaPago === 'PRODUCTO') {
        this.RespPromesa.Cuentas.forEach((producto) => {
          if (producto.Check) {
            const objeto = { ...producto, ImportePago: 0 };
            if (this.RespPromesa.ActivoParcial) {
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
      } else {
        promesa.totalPagar = pagoPorMonto;
      }

      this.promesa = promesa;
      this.promesaGenerada = true;
    }
  }

  removeCommas(numero: string): string {
    if (numero === '' || numero === null) { return numero; }
    return numero.replace(',', '');
  }

  onVolviendo(e): void {
    this.promesaGenerada = e;
  }
}
