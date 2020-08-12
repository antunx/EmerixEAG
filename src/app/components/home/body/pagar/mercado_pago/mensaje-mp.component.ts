import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mensaje-mp',
  templateUrl: './mensaje-mp.component.html',
  styles: [],
})
export class MensajeMpComponent implements OnInit {
  @Input() estadoPago: string;
  @Output() volviendo = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  cerrarPopup(): void {
    document.querySelector('.overlay').classList.remove('active');
    this.estadoPago = '';
    this.volver();
  }

  private volver(): void {
    this.volviendo.emit('');
  }
}
