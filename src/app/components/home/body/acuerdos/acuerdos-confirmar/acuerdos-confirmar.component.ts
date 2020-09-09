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
import { TranslateService } from '@ngx-translate/core';

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
  AceptaTerminos = false;
  MensajeAlert: string;
  popUpNro: number;

  constructor(
    private postService: PostService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.MensajeAlert = '';
  }

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

  confirmarPlan(tipo: string): void {
    if (!this.AceptaTerminos) {
      this.popUpNro = 2;
      this.MensajeAlert = this.translate.instant(
        'Traduct.acepte_terminos_condiciones'
      );
      document.querySelector('#overlay-termino').classList.add('active');
      return;
    }
    const objeto = {
      IdPersona: localStorage.getItem('version_core'),
      IdTipoAcuerdo: this.acuerdoSeleccionado.Id,
      Quita: this.acuerdoSeleccionado.MontoQuita,
      Anticipo: this.acuerdoSeleccionado.MontoAnticipo,
      FechaVencAnticipo: this.acuerdoSeleccionado.PlazoAnticipo,
      MontoTotal: this.acuerdoSeleccionado.MontoFinanciar,
      CantCuotas: this.acuerdoSeleccionado.CantidadCuotas,
      TipoConfirmar: tipo,
      Cuentas: this.acuerdoSeleccionado.Productos,
      Cuotas: [],
    };
    const acuerdoAux = {
      IdAcuerdo: '0',
      IdTipoAcuerdo: this.acuerdoSeleccionado.Id,
      Importe: this.acuerdoSeleccionado.MontoFinanciar,
      Anticipo: this.acuerdoSeleccionado.MontoAnticipo,
      Quita: this.acuerdoSeleccionado.MontoQuita,
    };
    this.postService.PostObtenerCuotasAcuerdo(acuerdoAux).subscribe((data) => {
      objeto.Cuotas = data.Cuotas;
      this.postService.PostConfirmarAcuerdo(objeto).subscribe((data) => {
        if (data.ErrorCode === 0) {
          if (tipo === 'C') {
            this.siguiente.emit(4);
          } else {
            console.log(data);
            const obj = {
              Items: [],
              TotalPagar: data.ImportePromesa,
              Cliente: localStorage.getItem('version_core'),
            };
            const cta = {
              id: data.IdPromesa,
              importe: data.ImportePromesa,
              tipo: 'ANTICIPO',
              cuotas: [],
            };

            obj.Items.push(cta);
            this.preAcuerdo.emit(obj);
            this.siguiente.emit(this.stepAcuerdo + 1);
          }
        }
      });
    });
  }

  AceptoTerminos(): void {
    this.AceptaTerminos = !this.AceptaTerminos;
  }

  TerminosCondiciones(): void {
    this.popUpNro = 1;
    document.querySelector('#overlay-termino').classList.add('active');
  }

  cerrarPopup(): void {
    document.querySelector('#overlay-termino').classList.remove('active');
    setTimeout(() => {
      this.MensajeAlert = '';
      this.popUpNro = 0;
    }, 500);
  }
}
