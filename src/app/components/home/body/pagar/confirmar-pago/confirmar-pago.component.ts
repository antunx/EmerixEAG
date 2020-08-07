import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
/*import { PropService } from '@app/services/prop.service';
import { Router } from '@angular/router';*/

@Component({
  selector: 'app-confirmar-pago',
  templateUrl: './confirmar-pago.component.html',
  styles: [],
})
export class ConfirmarPagoComponent implements OnInit, OnChanges {
  @Input() pago;
  @Input() pagoGeneradoStep: number;
  @Output() volviendo = new EventEmitter<number>();
  @Output() continuar = new EventEmitter<number>();
  @Output() pagando = new EventEmitter<any>();
  productos = [];
  promesas = [];
  importeDeuda: number;
  importeApagar: number;

  constructor(/*private propService: PropService, private router: Router*/) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.importeApagar = 0;
    this.importeDeuda = 0;
    this.promesas = [];
    this.productos = [];

    this.importeApagar = this.pago?.TotalPagar;
    this.importeDeuda = this.pago?.DeudaTotal;
    this.pago?.Items.map((item) => {
      item.Tipo === 'PROMESA'
        ? this.promesas.push(item)
        : this.productos.push(item);
    });
  }

  ngOnInit(): void {
    /*this.importeApagar = this.pago?.TotalPagar;
    this.importeDeuda = this.pago?.DeudaTotal;
    this.pago?.Items.map((item) => {
      item.Tipo === 'PROMESA'
        ? this.promesas.push(item)
        : this.productos.push(item);
    });*/
    // console.log(this.productos)
    // console.log(this.promesas)
  }

  removerComas(numero: string): string {
    if (numero === '' || numero === null) {
      return numero;
    }
    return numero.replace(',', '');
  }

  postPromesa(): void {
    const cuentas = [];
    this.pago.Items.map((prod) => {
      const cta = {
        id: prod.Id,
        importe: prod.ImportePagar,
        tipo: prod.Tipo,
        cuotas: prod.Cuotas,
      };

      cuentas.push(cta);
    });

    const obj = {
      Items: cuentas,
      TotalPagar: this.pago.TotalPagar,
      Cliente: this.pago.Cliente,
    };

    // this.propService.setPago(obj);
    this.pagoGeneradoStep = this.pagoGeneradoStep + 1;
    this.continuar.emit(this.pagoGeneradoStep);
    this.pagando.emit(obj);
    // this.router.navigateByUrl('home/metodos-pago');
  }

  volver(): void {
    this.pagoGeneradoStep = this.pagoGeneradoStep - 1;
    this.volviendo.emit(this.pagoGeneradoStep);
  }
}
