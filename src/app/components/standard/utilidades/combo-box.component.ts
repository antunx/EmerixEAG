import { Component, OnInit, Input } from '@angular/core';
import { forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styles: [
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboBoxComponent),
      multi: true
    }
  ]
})
export class ComboBoxComponent implements OnInit, ControlValueAccessor {
  // ---------------------------------------------------------------------------------------
  // Desarrollado por Tony: Uso del Custom Form Control
  // NgModel:
  // <app-combo-box Texto="Code ó Name" ItemDefault="valor_primer_item" [(ngModel)]="Lista"></app-combo-box>
  // Reactive Forms
  // <app-combo-box formControlName="nombre_control" Texto="Code ó Name" ItemDefault="valor_primer_item" [Lista]="lista"></app-combo-box>
  // FALTA IMPLEMENTAR: invalid, dirty, touched, disabled.

  // NOTA: TOCAR CON CUIDADO YA QUE SE USA EN VARIOS LADOS
  // ---------------------------------------------------------------------------------------
  @Input() Texto: string;
  @Input() ItemDefault: string;
  @Input() Lista = [];
  @Input() Disabled = false;

  value: string;
  id: string;

  onChange = (_: any) => { };
  onTouch = () => { };

  constructor() {}

  ngOnInit(): void {
    // console.log('cargando control ComboBoxComponent');
  }

  onInput(value: string): void {
    this.value = value;
    this.id = value;
    this.onTouch();
    this.onChange(this.value);
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
    this.Disabled = isDisabled;
  }

  clickCombo(event): void{
    const select = document.getElementById('CBO_');
    const placeholder = select.querySelector('.placeholder div') as HTMLDivElement;
    const target = event.target;
    // tslint:disable-next-line: no-unused-expression
    !select.classList.contains('date-selected') && select.classList.toggle('active');
    if (target.classList.contains('selectable')) {
        placeholder.innerText = target.innerText;
        this.onInput(target.parentElement.getAttribute('value'));
    }
  }
}