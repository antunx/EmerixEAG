import { Component, OnInit, HostBinding } from '@angular/core';
import { GetService } from '../../../../services/get.service';
import { Router } from '@angular/router';
import { productosPromesas } from '@app/models/productosypromesas.model';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styles: [],
})
export class PagarComponent implements OnInit {
  @HostBinding('class') class = 'pages-container flex-grow';
  tipoSeleccionado: number;
  pagoStep: number;
  resp: productosPromesas;
  prePagoGen: any;
  pagoGen: any;

  constructor(
    private getService: GetService,
    private router: Router // private propService: PropService
  ) {}

  ngOnInit(): void {
    this.pagoStep = 0;
    this.tipoSeleccionado = 0;
    this.getService
      .getProductosYPromesas(localStorage.getItem('version_core'))
      .subscribe((data) => {
        this.resp = data;
      });
  }

  seleccionarTipoPago(e: number): void {
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
    this.tipoSeleccionado === 1 ? (this.pagoStep = 1) : (this.pagoStep = 2);
  }

  onVolviendo(e: number): void {
    this.pagoStep = e;
  }

  onSiguiente(e: number): void {
    this.pagoStep = e;
  }

  onPrePagoGen(e: any): void {
    this.prePagoGen = e;
  }

  onPagoGen(e: any): void{
    this.pagoGen = e;
  }
}



