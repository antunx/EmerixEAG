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
  value: string;
  isDisabled: boolean;
  onChange = (_: any) => { };
  onTouch = () => { };

  constructor() { }

  ngOnInit(): void {
  }

  onInput(value: string): void {
    this.value = value;
    this.onTouch();
    this.onChange(this.value);
  }

  writeValue(value: any): void {
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

  formatfecha(e): void{
    const nfecha = (document.getElementById('nfecha') as HTMLInputElement).value = this.formato(e.target.value);
    document.getElementById('nfecha').hidden = false;
    document.getElementById('fecha').hidden = true;
  }

  cambiarInputFecha(): void {
    document.getElementById('fecha').hidden = false;
    document.getElementById('nfecha').hidden = true;
    document.getElementById('fecha').focus();
  }
}
