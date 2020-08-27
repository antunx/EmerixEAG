import { PostService } from '../../../../../services/post.service';
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
  @Output() acuerdoSeleccionado = new EventEmitter<any>();
  cuotas: Array<any>;
  constructor(private postService: PostService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.cuotas = [];
    console.log(changes);
    if (changes.acuerdo.currentValue !== undefined) {
      const acuerdoAux = {
        IdAcuerdo: '0',
        IdTipoAcuerdo: changes.acuerdo.currentValue.Id,
        Importe: changes.acuerdo.currentValue.MontoFinanciar,
      };
      this.postService
        .PostObtenerCuotasAcuerdo(acuerdoAux)
        .subscribe((data) => {
          console.log(JSON.stringify(data));
          this.cuotas = data.Cuotas;
        });
    }
  }

  ngOnInit(): void {}

  cerrarPopup(): void {
    document.querySelector('#billing-dialog').classList.remove('active');
  }

  seleccionar(): void {
    this.acuerdoSeleccionado.emit(this.acuerdo);
  }
}



