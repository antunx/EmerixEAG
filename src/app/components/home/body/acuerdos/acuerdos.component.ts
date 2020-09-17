import { Component, OnInit, HostBinding } from '@angular/core';
import { GetService } from '@app/services/get.service';
import { Acuerdo } from '@app/models/getAcuerdo.model';
import { ActivatedRoute } from '@angular/router';
import { PropService } from '@app/services/prop.service';

@Component({
  selector: 'app-acuerdos',
  templateUrl: './acuerdos.component.html',
})
export class AcuerdosComponent implements OnInit {
  @HostBinding('class') class = 'pages-container flex-grow';
  acuerdoSeleccionado: any;
  acuerdo: Acuerdo;
  checked: boolean;
  popupNro: number;
  MensajeAlert: string;
  stepAcuerdo: number;
  cuentasSeleccionadas: any;
  montoAPagar: number;
  TodosProductos: Array<any>;
  preAcuerdo: any;
  constructor(
    private getService: GetService,
    private router: ActivatedRoute,
    private propService: PropService
  ) {}

  ngOnInit(): void {
    this.popupNro = 0;
    this.stepAcuerdo = 0;
    this.montoAPagar = 0;
    this.TodosProductos = [];
    if (this.propService.getCampaniaEspecial()) {
      this.getService
        .getProductosCampaniaEspecial(localStorage.getItem('version_core'))
        .subscribe((data: Acuerdo) => {
          console.log('acuerdo especial');
          if (data.ErrorCode === 0) {
            // console.log(data);
            this.acuerdo = data;
            data.Cuentas.forEach((cuenta) => {
              this.montoAPagar += cuenta.Deuda;
            });
            this.allChecked();
          }
        });
      /** Campania Especial */
    } else {
      this.getService
        .getProductosAcuerdos(localStorage.getItem('version_core'))
        .subscribe((data: Acuerdo) => {
          console.log('acuerdo comun');
          if (data.ErrorCode === 0) {
            // console.log(data);
            this.acuerdo = data;
            data.Cuentas.forEach((cuenta) => {
              this.montoAPagar += cuenta.Deuda;
            });
            this.allChecked();
          }
        });
    }
  }

  allChecked(): void {
    this.checked = true;
    this.acuerdo.Cuentas.forEach((cuenta) => {
      if (!cuenta.Check) {
        this.checked = false;
      }
    });
  }

  checkAll(e): void {
    if (e.target.checked) {
      this.acuerdo.Cuentas.forEach((producto) => {
        if (!producto.Check) {
          producto.Check = true;
          this.montoAPagar += producto.Deuda;
        }
      });
    } else {
      this.montoAPagar = 0;
      this.acuerdo.Cuentas.forEach((producto) => {
        producto.Check = false;
      });
    }
    this.allChecked();
  }

  cambiarCheck(id: number, e): void {
    this.acuerdo.Cuentas.forEach((producto) => {
      if (producto.IdCuenta === id) {
        producto.Check = e.target.checked;
        if (producto.Check === false) {
          this.montoAPagar -= producto.Deuda;
        } else {
          this.montoAPagar += producto.Deuda;
        }
      }
    });
    this.allChecked();
  }

  generarAcuerdo(): void {
    this.TodosProductos = [];
    if (!this.acuerdo.ExisteAcuerdo) {
      this.MensajeAlert = this.acuerdo.Mensajes[0].Mensaje;
      this.popupNro = 1;
      document.querySelector('#overlay-error').classList.add('active');
      return;
    }
    const acuerdo = {
      DeudaTotal: this.acuerdo.DeudaTotal,
      DiasMora: this.acuerdo.DiasMora,
      Cuentas: [],
      IdPersona: localStorage.getItem('version_core'),
    };
    this.acuerdo.Cuentas.forEach((cuenta) => {
      if (cuenta.Check) {
        acuerdo.Cuentas.push({ IdCuenta: cuenta.IdCuenta });
        this.TodosProductos.push(cuenta);
      }
    });

    // console.log(acuerdo);
    this.cuentasSeleccionadas = acuerdo;
    this.stepAcuerdo = this.stepAcuerdo + 1;
  }

  cerrarPopup(): void {
    document.querySelector('#overlay-error').classList.remove('active');
    this.MensajeAlert = '';
    this.popupNro = 0;
  }

  activarBox(id: number): void {
    const container = document.querySelector('#box-4261620203');
    const boxes = container.querySelectorAll('.box');

    boxes.forEach((box) => {
      box.classList.remove('active');
    });
    document.getElementById(`box-${id}`).classList.add('active');
  }

  onSiguiente(e: number): void {
    this.stepAcuerdo = e;
  }

  onVolver(e: number): void {
    this.stepAcuerdo = e;
  }

  onAcuerdoSeleccionado(e: any): void {
    this.acuerdoSeleccionado = e;
  }

  sig(): void {
    // console.log(this.cuentasSeleccionadas)
    this.stepAcuerdo = 1;
  }

  removerComas(numero: string): string {
    if (numero === '' || numero === null) {
      return numero;
    }
    return numero.replace(',', '');
  }

  onpreAcuerdo(e: any): void {
    this.preAcuerdo = e;
  }
}
