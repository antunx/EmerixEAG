import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { ComboBoxComponent } from './utilidades/combo-box.component';

@NgModule({
  declarations: [ComboBoxComponent],
  imports: [
    // BrowserModule,
    CommonModule
  ],
  exports: [
    ComboBoxComponent
  ],
})
export class StandardModule { }
