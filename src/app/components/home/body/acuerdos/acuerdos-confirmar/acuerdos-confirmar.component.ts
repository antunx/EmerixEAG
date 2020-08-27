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

  constructor() {}

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


  confirmarPlan(){
    this.siguiente.emit(3);
  }
}
