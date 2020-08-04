import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GetService } from '@app/services/get.service';
import { Cuota } from '@models/detallePrestamo.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-detalle-planpago',
  templateUrl: './detalle-planpago.component.html',
  styles: [],
})
export class DetallePlanpagoComponent implements OnInit {
  prestamo: Cuota[];
  cuotasSeleccionadas = [];
  cuotasDefault = [];
  cuotasPagar = [];
  montoPago = 0;
  error = false;
  @Input() idCuenta: string;
  @Output() TotalPago = new EventEmitter<object>();

  constructor(
    private getService: GetService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // console.log(this.idCuenta)
    this.getService.getDetallePrestamo(this.idCuenta).subscribe((res) => {
      // console.log(res);
      let pendiente = false;
      res.Cuotas.map((cuota) => {
        if (cuota.Check) {
          this.montoPago += cuota.ImporteTotal;
          this.cuotasSeleccionadas.push(cuota.IdPrestamoCuota);
        }
        if (
          cuota.CodigoEstado === 'VENCIDA' ||
          (cuota.CodigoEstado === 'PENDIENTE' && !pendiente)
        ) {
          this.cuotasPagar.push(cuota.IdPrestamoCuota);
          if (cuota.CodigoEstado === 'PENDIENTE' && !pendiente) {
            pendiente = true;
          }
        }
      });
      this.cuotasDefault = res.Cuotas;
      this.prestamo = res.Cuotas;
      // console.log(this.montoPago);
    });
  }

  cerrarPopup(): void {
    this.error = false;
    (document.getElementById(
      `overlay-error-detalle`
    ) as HTMLInputElement).classList.remove('active');
    let pendiente = false;
    this.cuotasDefault.forEach((cuota) => {
      if (
        cuota.CodigoEstado === 'VENCIDA' ||
        (cuota.CodigoEstado === 'PENDIENTE' && !pendiente)
      ) {
        (document.getElementById(
          `table-select-${cuota.IdPrestamoCuota}`
        ) as HTMLInputElement).checked = true;
        if (cuota.CodigoEstado === 'PENDIENTE' && !pendiente) {
          pendiente = true;
        }
      }
    });
  }

  cambiarCheck(id: number, e): void {
    // console.log(e);
    this.prestamo.forEach((cuota) => {
      if (cuota.IdPrestamoCuota === id) {
        if (e.target.checked === true) {
          this.montoPago += cuota.ImporteTotal;
          this.cuotasSeleccionadas.push(cuota.IdPrestamoCuota);
        } else {
          this.montoPago -= cuota.ImporteTotal;
          const i = this.cuotasSeleccionadas.indexOf(cuota.IdPrestamoCuota);
          if (id !== -1) {
            this.cuotasSeleccionadas.splice(i, 1);
          }
        }
        // console.log(this.montoPago);
        // console.log(this.cuotasSeleccionadas);
      }
    });
  }

  confirmarCuotas(e): void {
    e.preventDefault();
    // console.log(this.montoPago);

    if (this.montoPago <= 0 || isNaN(this.montoPago)) {
      this.error = true;
      (document.getElementById(
        'overlay-error-detalle'
      ) as HTMLInputElement).classList.add('active');
      return;
    }
    this.cuotasPagar = [];
    this.cuotasPagar = [...this.cuotasSeleccionadas];
    const obj = {
      cuotas: { ...this.cuotasSeleccionadas },
      monto: parseFloat(this.montoPago.toFixed(2)),
    };

    this.TotalPago.emit(obj);
    (document.getElementById(
      `overlay-${this.idCuenta}`
    ) as HTMLInputElement).classList.remove('active');
  }

  volver(): void {
    this.cuotasSeleccionadas = [];
    this.cuotasSeleccionadas = [...this.cuotasPagar];
    this.prestamo.forEach((cuota) => {
      if (this.cuotasPagar.indexOf(cuota.IdPrestamoCuota) !== -1) {
        (document.getElementById(
          `table-select-${cuota.IdPrestamoCuota}`
        ) as HTMLInputElement).checked = true;
        cuota.Check = true;
      } else {
        (document.getElementById(
          `table-select-${cuota.IdPrestamoCuota}`
        ) as HTMLInputElement).checked = false;
        cuota.Check = false;
      }
    });

    (document.getElementById(
      `overlay-${this.idCuenta}`
    ) as HTMLInputElement).classList.remove('active');
  }
}
