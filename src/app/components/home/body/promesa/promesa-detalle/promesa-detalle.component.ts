import { Component, OnInit } from '@angular/core';
import { GetService } from '@app/services/get.service';

@Component({
  selector: 'app-promesa-detalle',
  templateUrl: './promesa-detalle.component.html',
  styles: [
  ]
})
export class PromesaDetalleComponent implements OnInit {

  detalle: any;
  cuentas: any;

  constructor(private getService: GetService) { }

  ngOnInit(): void {
    this.detalle = this.getService.getDetalle();
    this.cuentas = this.detalle.Detalle;
    console.log(this.cuentas);
  }

}
