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

  constructor(private postService: PostService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.prodEstan = [];
    this.acuerdos = [];
    if (changes?.stepAcuerdo?.currentValue === 1) {
      // console.log(JSON.stringify(this.cuentas));
      this.postService
        .postObtenerAcuerdos(this.cuentas)
        .subscribe((data: any) => {
          // console.log(JSON.stringify(data))
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


