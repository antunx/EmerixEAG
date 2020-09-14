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
import { PostService } from '@app/services/post.service';

@Component({
  selector: 'app-confirmar-pago',
  templateUrl: './confirmar-pago.component.html',
  styles: [],
})
export class ConfirmarPagoComponent implements OnInit, OnChanges {
  @Input() pago: any;
  @Input() pagoStep: number;
  @Output() volviendo = new EventEmitter<number>();
  @Output() siguiente = new EventEmitter<number>();
  @Output() pagoGen = new EventEmitter<any>();
  productos = [];
  promesas = [];
  importeDeuda = [];
  importeApagar = [];
  porProducto: boolean;

  constructor(
    /*private propService: PropService, private router: Router*/ private postService: PostService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    // this.ok = false;
    if (changes?.pagoStep?.previousValue === 2) {
      this.promesas = [];
      this.productos = [];
    }
    if (changes?.pago?.currentValue !== undefined) {
      this.importeApagar = parseFloat(JSON.stringify(this.pago?.TotalPagar))
        .toFixed(2)
        .split('.');
      this.importeDeuda = parseFloat(JSON.stringify(this.pago?.DeudaTotal))
        .toFixed(2)
        .split('.');
      if (this.pago.TipoPago === 'PRODUCTOS') {
        this.porProducto = true;
        // console.log('PRO');
        this.pago?.Items.map((item) => {
          item.Tipo === 'PROMESA'
            ? this.promesas.push(item)
            : this.productos.push(item);
        });
      } else {
        this.porProducto = false;
        // console.log('MONT');
      }
      // console.log(this.pago);
    }
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
    const intencion = {
      TipoObjeto: 'PAGO',
      IdPersona: localStorage.getItem('version_core'),
      FechaObjeto: new Date(),
      Importe: this.pago.TotalPagar,
      MensajeValidacion: '',
      Cuentas: '',
    };
    this.postService.PostIntencion(intencion).subscribe((data) => {
      console.log(data);
      if (data.ErrorCode === 0) {
        this.pagoStep = this.pagoStep + 1;
        this.siguiente.emit(this.pagoStep);
        this.pagoGen.emit(obj);
      }
    });
    // this.router.navigateByUrl('home/metodos-pago');
  }

  volver(): void {
    if (this.porProducto) {
      this.pagoStep = this.pagoStep - 1;
    } else {
      this.pagoStep = this.pagoStep - 2;
    }
    this.volviendo.emit(this.pagoStep);
  }
}
