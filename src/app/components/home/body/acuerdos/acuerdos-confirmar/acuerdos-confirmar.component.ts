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
import { PostService } from '@app/services/post.service';

@Component({
  selector: 'app-acuerdos-confirmar',
  templateUrl: './acuerdos-confirmar.component.html',
  styles: [],
})
export class AcuerdosConfirmarComponent implements OnInit, OnChanges {
  @Input() acuerdoSeleccionado;
  @Input() stepAcuerdo;
  @Output() siguiente = new EventEmitter<number>();
  @Output() volver = new EventEmitter<number>();
  @Output() preAcuerdo = new EventEmitter<any>();

  constructor(private postService: PostService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.acuerdoSeleccionado?.currentValue !== undefined) {
      console.log(this.acuerdoSeleccionado);
    }
  }

  onVolver(): void {
    this.stepAcuerdo = this.stepAcuerdo - 1;
    this.volver.emit(this.stepAcuerdo);
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


  confirmarPlan() {
    const objeto = {
      IdPersona: localStorage.getItem('version_core'),
      IdTipoAcuerdo: this.acuerdoSeleccionado.Id,
      Quita: this.acuerdoSeleccionado.MontoQuita,
      Anticipo: this.acuerdoSeleccionado.MontoAnticipo,
      FechaVencAnticipo: this.acuerdoSeleccionado.PlazoAnticipo,
      MontoTotal: this.acuerdoSeleccionado.MontoFinanciar,
      CantCuotas: this.acuerdoSeleccionado.CantidadCuotas,
      TipoConfirmar: 'C',
      Cuentas: this.acuerdoSeleccionado.Productos,
      Cuotas: [],
    };
    const acuerdoAux = {
      IdAcuerdo: '0',
      IdTipoAcuerdo: this.acuerdoSeleccionado.Id,
      Importe: this.acuerdoSeleccionado.MontoFinanciar,
    };
    this.postService.PostObtenerCuotasAcuerdo(acuerdoAux).subscribe((data) => {
      objeto.Cuotas = data.Cuotas;
      this.postService.PostConfirmarAcuerdo(objeto).subscribe((data) => {
        if (data.ErrorCode === 0) {
          this.siguiente.emit(4);
        }
      });
    });
  }

  pagarAnticipo(){
    console.log(this.acuerdoSeleccionado)
    const obj = {
      Items: [],
      TotalPagar: this.acuerdoSeleccionado.MontoAnticipo,
      Cliente: localStorage.getItem('version_core'),
    }
    const cta = {
      id: this.acuerdoSeleccionado.Id,
      importe: this.acuerdoSeleccionado.MontoAnticipo,
      tipo: 'ANTICIPO',
      cuotas: []
    };

    obj.Items.push(cta);
    this.preAcuerdo.emit(obj);
    this.siguiente.emit(this.stepAcuerdo + 1);
  }
}
