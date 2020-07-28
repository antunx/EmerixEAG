import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styles: [
  ]
})
export class InputDateComponent implements OnInit  {

  // Hay que llamar a la variable @Output() fechaSeleccionada en el componente para poder obtener la fecha.
  // Ejemplo:
  // -En HTML-
  // // <app-input-date (fechaseleccionada)="Fecha($event)"></app-input-date>
  // -En TS-
  // setearFecha(e): void {
  //   console.log(e)
  // }

  @Output() fechaSeleccionada = new EventEmitter<Date>();
  private fechaDate: Date;

  constructor() { }

  ngOnInit(): void {
  }

  formatfecha(e): void{
    e = new Date(e.target.value);
    this.fechaDate = e;
    let dt = e.getDate();
    dt++;
    let mn = e.getMonth();
    mn++;
    const yy = e.getFullYear();
    const nfecha = (document.getElementById('nfecha') as HTMLInputElement).value = dt + '/' + mn + '/' + yy
    this.fecha();
    document.getElementById('nfecha').hidden = false;
    document.getElementById('fecha').hidden = true;
  }

  fecha(): void{
    console.log(this.fechaDate);
    this.fechaSeleccionada.emit(this.fechaDate);
  }

  cambiarInputFecha(): void {
    document.getElementById('fecha').hidden = false;
    document.getElementById('nfecha').hidden = true;
    document.getElementById('fecha').focus();
  }
}
