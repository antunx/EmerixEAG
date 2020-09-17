import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PostService } from '@app/services/post.service';
import { PropService } from '@app/services/prop.service';

@Component({
  selector: 'app-acuerdos-tipos',
  templateUrl: './acuerdos-tipos.component.html',
  styles: [],
})
export class AcuerdosTiposComponent implements OnInit, OnChanges {
  @Input() cuentas: any;
  @Input() productos: any;
  @Input() stepAcuerdo: number;
  @Output() acuerdoSeleccionado = new EventEmitter<any>();
  @Output() siguiente = new EventEmitter<number>();
  @Output() volver = new EventEmitter<number>();
  acuerdos: Array<any>;
  prodEstan: Array<any>;
  verCuotasAcuerdo: any;
  filas: Array<{ empezar: number; finalizar: number }>;

  constructor(
    private postService: PostService,
    private propService: PropService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.prodEstan = [];
    this.acuerdos = [];
    if (changes?.stepAcuerdo?.currentValue === 1) {
      if (this.propService.getCampaniaEspecial()) {
        this.postService
          .postObtenerAcuerdosEspeciales(this.cuentas)
          .subscribe((data: any) => {
            // console.log(JSON.stringify(data))
            /** ESTO ES PARA QUE COLOQUE 3 TIPOS DE ACUERDO POR FILA */
            this.filas = [];
            let empezar = 0;
            let finalizar = 3;
            for (let i = 0; i < Math.ceil(data.Acuerdos.length / 3); i++) {
              this.filas.push({ empezar, finalizar });
              empezar = empezar + 3;
              finalizar = finalizar + 3;
            }
            /** ACA TERMINA */
            this.acuerdos = data.Acuerdos;
            data.Acuerdos.forEach((acuerdo) => {
              acuerdo.Productos.forEach((producto) => {
                this.cuentas.Cuentas.forEach((prod) => {
                  if (prod.IdCuenta === producto.Id) {
                    if (this.prodEstan.indexOf(producto.Id) === -1) {
                      this.prodEstan.push(producto.Id);
                    }
                  }
                });
              });
            });
            this.productos.forEach((producto) => {
              if (this.prodEstan.indexOf(producto.IdCuenta) === -1) {
                document.getElementById(
                  'warnings'
                ).innerHTML += `<div class="warning-box">
              <img src="assets/images/ui/icono_info_2.svg" alt=""><strong>${producto.NombreProducto}</strong> no puede ser incluído en el <strong>Acuerdo verbal</strong>.
            </div>`;
              }
            });
          });
      } else {
        this.postService
          .postObtenerAcuerdos(this.cuentas)
          .subscribe((data: any) => {
            // console.log(JSON.stringify(data))
            /** ESTO ES PARA QUE COLOQUE 3 TIPOS DE ACUERDO POR FILA */
            this.filas = [];
            let empezar = 0;
            let finalizar = 3;
            for (let i = 0; i < Math.ceil(data.Acuerdos.length / 3); i++) {
              this.filas.push({ empezar, finalizar });
              empezar = empezar + 3;
              finalizar = finalizar + 3;
            }
            /** ACA TERMINA */
            this.acuerdos = data.Acuerdos;
            data.Acuerdos.forEach((acuerdo) => {
              acuerdo.Productos.forEach((producto) => {
                this.cuentas.Cuentas.forEach((prod) => {
                  if (prod.IdCuenta === producto.Id) {
                    if (this.prodEstan.indexOf(producto.Id) === -1) {
                      this.prodEstan.push(producto.Id);
                    }
                  }
                });
              });
            });
            this.productos.forEach((producto) => {
              if (this.prodEstan.indexOf(producto.IdCuenta) === -1) {
                document.getElementById(
                  'warnings'
                ).innerHTML += `<div class="warning-box">
              <img src="assets/images/ui/icono_info_2.svg" alt=""><strong>${producto.NombreProducto}</strong> no puede ser incluído en el <strong>Acuerdo verbal</strong>.
            </div>`;
              }
            });
          });
      }
    }
  }

  ngOnInit(): void {}

  onSiguiente(item): void {
    this.acuerdoSeleccionado.emit(item);
    this.stepAcuerdo = this.stepAcuerdo + 1;
    this.siguiente.emit(this.stepAcuerdo);
  }

  onVolver(): void {
    document.getElementById('warnings').innerHTML = '';
    this.stepAcuerdo = this.stepAcuerdo - 1;
    this.volver.emit(this.stepAcuerdo);
  }

  verCuotas(acuerdo): void {
    this.verCuotasAcuerdo = acuerdo;
    document.getElementById('billing-dialog').classList.add('active');
  }

  split(entero: boolean, numero: number): string {
    if (numero === null) {
      return;
    }
    if (entero) {
      return numero.toString().split('.')[0];
    } else {
      return numero.toString().split('.')[1];
    }
  }

  cerrarPopup(): void {
    document.querySelector('#billing-dialog').classList.remove('active');
  }
}
