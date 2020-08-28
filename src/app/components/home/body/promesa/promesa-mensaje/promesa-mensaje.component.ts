import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ChildActivationStart } from '@angular/router';
import { GetService } from '@app/services/get.service';
import { PostService } from '@app/services/post.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ComunicacionService } from '@app/services/comunicacion.service';
// import { Promesa } from '@app/models/Promesa.model';
import { Promesa } from '@app/models/PostPromesa.model';

@Component({
  selector: 'app-promesa-mensaje',
  templateUrl: './promesa-mensaje.component.html',
  styles: [],
})
export class PromesaMensajeComponent implements OnInit, OnChanges {
  @Input() promGen: any;
  @Input() promesaStep: number;
  @Output() siguiente = new EventEmitter<number>();
  @Output() volviendo = new EventEmitter<number>();
  productos = [];
  tipoPromesa: string;
  promesaPago = 0;
  importeAcordadoImprimir = [];
  promesaCreada = false;
  promesaError = false;

  constructor(
    private router: Router,
    private getService: GetService,
    private postService: PostService,
    private translate: TranslateService,
    private servicioComunicacion: ComunicacionService
  ) {}

  ngOnInit(): void{
  }

  ngOnChanges(changes: SimpleChanges): void {
    // (this.promesaGenerada);
    // this.respuesta = this.getService.getPromesa();
    if (changes?.promGen?.currentValue !== undefined){
      this.cambioTexto(this.translate.instant('Traduct.promesa_pago'));
      // console.log(this.promGen);
      this.importeAcordadoImprimir = JSON.stringify(this.promGen.totalPagar).split('.');
      // console.log(this.importeAcordadoImprimir)
      if (this.promGen.formaPago === 'IMPORTE') {
        const cliente = this.promGen.cliente;
        const importe = this.promGen.totalPagar;
        this.getService
          .getProductPromImporte(cliente, importe)
          .subscribe((res) => {
            // console.log(res);
            this.productos = res.Cuentas;
          });
      } else {
        this.productos = this.promGen.cuentas;
      }
    }
  }

  cambioTexto(mensaje: string): void {
    this.servicioComunicacion.enviarMensaje(mensaje);
  }

  postPromesa(): void {
    const cuentas = [];
    this.productos.map((prod) => {
      const cuenta = {
        idCuenta: prod.IdCuenta,
        idMoneda: prod.IdMoneda,
        Deuda: prod.Deuda,
        ImportePago: prod.ImportePago,
      };
      cuentas.push(cuenta);
    });
    // console.log(cuentas);
    const obj: Promesa = { // Sacamos el Any
      IdPersona: this.promGen.cliente,
      IdTipoPromesa: this.promGen.idTipoPromesa,
      PromesaFecha: new Date(this.promGen.fechaPromesaVencimiento),
      PromesaMonto: this.promGen.totalPagar,
      DeudaTotal: this.promGen.deudaTotal,
      Cuentas: cuentas,
      FormaPromesa: this.promGen.formaPromesa,
      FormaPago: this.promGen.formaPago,
    };
    // console.log(obj);

    this.postService.postPromesaPago(obj).subscribe((res: any) => {
      // console.log(res);
      if (res.ErrorCode === 0) {
        this.promesaCreada = true;
        this.promesaStep += 1;
        this.volviendo.emit(this.promesaStep);
      } else {
        this.promesaError = true;
        document.querySelector('#mensaje-error').classList.add('active');
        /*setTimeout(() => {
          this.router.navigateByUrl('promesa-pago');
        }, 3000);*/
      }
    });
  }

  cerrarPopup(): void {
    document.querySelector('#mensaje-error').classList.remove('active');
  }

  volver(): void {
    if (this.promGen.formaPago === 'IMPORTE'){
      this.volviendo.emit(1);
    }else{
      this.volviendo.emit(2);
    }
  }

  removerComas(numero: string): string {
    if (numero === '' || numero === null) {
      return numero;
    }
    return numero.replace(',', '');
  }
}
