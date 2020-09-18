import { PostService } from '@app/services/post.service';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-ver-cuotas',
  templateUrl: './ver-cuotas.component.html',
  styleUrls: [],
})
export class VerCuotasComponent implements OnInit, OnChanges {
  @Input() acuerdo: any;
  @Input() historico: boolean;
  @Output() acuerdoSeleccionado = new EventEmitter<any>();
  cuotas: Array<any>;
  EsAcuerdo: boolean;
  tieneCuotas: boolean;

  constructor(private postService: PostService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.cuotas = [];
    // console.log(changes);
    if (changes.acuerdo.currentValue !== undefined) {
      // console.log(changes.acuerdo.currentValue)
      const acuerdoAux = {
        IdAcuerdo: '0',
        IdTipoAcuerdo: changes.acuerdo.currentValue.Id,
        Importe: changes.acuerdo.currentValue.MontoFinanciar,
        Anticipo: changes.acuerdo.currentValue.MontoAnticipo,
        Quita: changes.acuerdo.currentValue.MontoQuita,
      };
      if (this.historico) {
        acuerdoAux.IdAcuerdo = changes.acuerdo.currentValue.IdAcuerdo;
        acuerdoAux.IdTipoAcuerdo = '0';
        acuerdoAux.Importe = '0';
        acuerdoAux.Anticipo = '0';
        acuerdoAux.Quita = '0';
      }
      // console.log(acuerdoAux);
      this.postService
        .PostObtenerCuotasAcuerdo(acuerdoAux)
        .subscribe((data) => {
          console.log(data);
          this.cuotas = data.Cuotas;
          this.tieneCuotas = data.Cuotas[0].Estado !== '' ? true : false;
          this.EsAcuerdo = data.EsAcuerdoVerbal;
        });
    }
  }

  ngOnInit(): void {}

  cerrarPopup(): void {
    document.querySelector('#plans-dialog').classList.remove('active');
  }

  seleccionar(): void {
    this.acuerdoSeleccionado.emit(this.acuerdo);
  }
}
