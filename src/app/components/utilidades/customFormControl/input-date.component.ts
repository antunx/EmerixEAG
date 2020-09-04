import { Component, OnInit } from '@angular/core';
import { forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styles: [
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true
    }
  ]
})
export class InputDateComponent implements OnInit, ControlValueAccessor   {
  // ---------------------------------------------------------------------------------------
  // Desarrollado por Tony: Uso del Custom Form Control
  // injectar dependencia: import { DatePipe } from '@angular/common';
  // constructor: private datePipe: DatePipe

  // NgModel:
  // FechaHoy = new Date();
  // valorFecha: string;
  // this.valorFecha = this.datePipe.transform(this.FechaHoy, 'yyyy-MM-dd'); // ngOnInit()
  // <app-input-date [(ngModel)]="valorFecha"></app-input-date>

  // Reactive Forms
  // <app-input-date formControlName="NombreControl"></app-input-date>
  // tambien soporta invalid, dirty, touched, disabled.

  // NOTA: POR CUALQUIER MODIFICACION, TOCAR CON CUIDADO YA QUE SE USA EN VARIOS LADOS
  // ---------------------------------------------------------------------------------------
  value: string;
  isDisabled: boolean;
  onChange = (_: any) => { };
  onTouch = () => { };
  escribiendo: boolean;
  constructor() { }

  ngOnInit(): void {
    // console.log('cargando control InputDateComponent');
  }

  onInput(value: string): void {
    // console.log(this.formato(this.value));
    this.value = value;

    (document.getElementById('txt_fecha') as HTMLInputElement).value = this.formato(value);
    if(!this.escribiendo){
      document.getElementById('txt_fecha').hidden = false;
      document.getElementById('dt_fecha').hidden = true;
    }
    this.onTouch();
    this.onChange(this.value);
  }

  onWrite(event: string, control: string): void {
    // console.log('control: ' + control + ' texto: ' + event);
    this.escribiendo = true;
  }

  writeValue(value: string): void {
    if (value) {
      this.value = value || '';
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  formato(texto: string): string{
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
  }

  cambiarInputFecha(): void {
    // console.log("soy date");
    this.escribiendo == false;
    document.getElementById('dt_fecha').hidden = false;
    document.getElementById('txt_fecha').hidden = true;
    document.getElementById('dt_fecha').focus();
  }

  cambiarFechaInput(): void {
    // console.log("soy txt");
    this.escribiendo == false;
    document.getElementById('dt_fecha').hidden = true;
    document.getElementById('txt_fecha').hidden = false;
  }
}
