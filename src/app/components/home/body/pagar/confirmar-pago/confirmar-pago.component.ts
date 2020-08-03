import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropService } from '@app/services/prop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmar-pago',
  templateUrl: './confirmar-pago.component.html',
  styles: [
  ]
})
export class ConfirmarPagoComponent implements OnInit {
  @Input() pago;
  @Input() pagoGenerado: boolean;
  @Output() volviendo = new EventEmitter<boolean>();
  productos = [];
  promesas = [];
  importeDeuda:number;
  importeApagar:number;

  constructor(private propService:PropService, private router:Router) { }

  ngOnInit(): void {
    this.importeApagar = this.pago.TotalPagar;
    this.importeDeuda = this.pago.DeudaTotal;
    this.pago.Items.map(item=>{
      item.Tipo === 'PROMESA' ? this.promesas.push(item) : this.productos.push(item);
    });
    // console.log(this.productos)
    // console.log(this.promesas)
  }

  removerComas(numero: string): string {
    if (numero === '' || numero === null) {
      return numero;
    }
    return numero.replace(',', '');
  }

  postPromesa(){
    let cuentas = [];
    this.pago.Items.map(prod=>{
      let cta = {
        id: prod.Id,
        importe: prod.ImportePagar,
        tipo: prod.Tipo,
        cuotas: prod.Cuotas
      };

      cuentas.push(cta);

    });

    let obj={
      Items: cuentas,
      TotalPagar: this.pago.TotalPagar,
      Cliente: this.pago.Cliente,
    };

    this.propService.setPago(obj);
    this.router.navigateByUrl('home/metodos-pago');
  }

  volver(): void {
    this.pagoGenerado = !this.pagoGenerado;
    this.volviendo.emit(this.pagoGenerado);
  }

}
