import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { GetService } from '@services/get.service';
import { Promesa } from '@models/Promesa.model';
import { PromGen } from '@models/promesaGenerada.model';
import { Subscription } from 'rxjs';
import { ComunicacionService } from '@app/services/comunicacion.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promesa',
  templateUrl: './promesa.component.html',
  styles: [],
})
export class PromesaComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'pages-container flex-grow';
  tipoSeleccionado: number = 0;
  promesaStep: number = 0;
  resp: Promesa;
  promGen: PromGen;
  volverHome: boolean = false;
  // Boton chatbot -- metodo mostrar y ocultar
  hideElement: boolean;
  ocultar: boolean = true;
  constructor(private router: Router, private getService: GetService) {}

  ngOnInit() {
    this.hideElement = false;
    this.getService
      .getProductProm(localStorage.getItem('version_core'))
      .subscribe((data) => {
        // data.ActivoParcial = true;
        // data.ActivoMonto = true;
        // data.ActivoProducto = true;
        this.resp = data;
        this.ocultar = data.IdTipoPromesa === 0 ? true : false;
        console.log(this.resp);
        if (data.ActivoMonto && !data.ActivoProducto) {
          this.promesaStep = 1;
          this.volverHome = true;
        }
        if (!data.ActivoMonto && data.ActivoProducto) {
          this.promesaStep = 2;
          this.volverHome = true;
        }
      });
  }

  ngOnDestroy() {}

  seleccionarTipoPromesa(e: number): void {
    this.tipoSeleccionado = e;
    if (e === 1) {
      (document.getElementById('porMonto') as HTMLInputElement).classList.add(
        'active'
      );
      (document.getElementById(
        'porProducto'
      ) as HTMLInputElement).classList.remove('active');
    } else {
      (document.getElementById(
        'porMonto'
      ) as HTMLInputElement).classList.remove('active');
      (document.getElementById(
        'porProducto'
      ) as HTMLInputElement).classList.add('active');
    }
  }

  continuarStep(): void {
    if (this.tipoSeleccionado === 0) {
      return;
    }
    this.tipoSeleccionado === 1
      ? (this.promesaStep = 1)
      : (this.promesaStep = 2);
  }

  onVolviendo(e: number): void {
    // console.log(e)
    this.promesaStep = e;
  }

  onSiguiente(e: number): void {
    this.promesaStep = e;
  }

  onPromGen(e: PromGen): void {
    this.promGen = e;
  }

  toggleElement(): void {
    if (this.hideElement) {
      this.hideElement = false;
    } else {
      this.hideElement = true;
    }
  }
}

// promesaStep
// 0: Seleccionar tipo promesa
// 1: Grilla Monto
// 2: Grilla Productos
// 3: Promesa mensaje
// 4: promesa resultado
