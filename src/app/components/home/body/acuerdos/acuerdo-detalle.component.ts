import { Component, OnInit, Input } from '@angular/core';
import { Acuerdo } from '@app/models/acuerdo.models';

@Component({
  selector: 'app-acuerdo-detalle',
  templateUrl: './acuerdo-detalle.component.html',
  styles: [
  ]
})
export class AcuerdoDetalleComponent implements OnInit {
  constructor() { }
  @Input() Acuerdo: Acuerdo;

  ngOnInit(): void {
  }
}
