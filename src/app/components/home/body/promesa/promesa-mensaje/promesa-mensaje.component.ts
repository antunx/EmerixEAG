import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ChildActivationStart } from '@angular/router';
import { GetService } from '@app/services/get.service';
import { PostService } from '@app/services/post.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ComunicacionService } from '@app/services/comunicacion.service';

@Component({
  selector: 'app-promesa-mensaje',
  templateUrl: './promesa-mensaje.component.html',
  styles: [],
})
export class PromesaMensajeComponent implements OnInit {
  @Input() promesaGenerada: boolean;
  @Input() promesa: any;
  @Output() volviendo = new EventEmitter<boolean>();
  respuesta: any;
  productos = [];
  tipoPromesa: string;
  promesaPago = 0;
  promesaCreada = false;
  promesaError = false;

  constructor(
    private router: Router,
    private getService: GetService,
    private postService: PostService,
    private translate: TranslateService,
    private servicioComunicacion: ComunicacionService
  ) {}

  ngOnInit(): void {
    // (this.promesaGenerada);
    // this.respuesta = this.getService.getPromesa();
    this.cambioTexto(this.translate.instant('Traduct.promesa_pago'));
    this.respuesta = this.promesa;
    // console.log(this.respuesta);
    if (this.respuesta.formaPago === 'IMPORTE') {
      const cliente = this.respuesta.cliente;
      const importe = this.respuesta.totalPagar;
      this.getService
        .getProductPromImporte(cliente, importe)
        .subscribe((res) => {
          // console.log(res);
          this.productos = res.Cuentas;
        });
    } else {
      this.productos = this.respuesta.cuentas;
    }
    // console.log(this.respuesta.mensajes);
    // this.respuesta.mensajes.mensaje = this.respuesta.mensajes.mensaje.replace('promesaPago', JSON.stringify(this.respuesta.totalPagar));
    // this.respuesta.mensajes.mensaje = this.respuesta.mensajes.mensaje.replace('fechaPromesa', this.respuesta.fechaPromesaVencimiento);
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
    const obj = {
      IdPersona: JSON.parse(this.respuesta.cliente),
      IdTipoPromesa: this.respuesta.idTipoPromesa,
      PromesaFecha: new Date(this.respuesta.fechaPromesaVencimiento),
      PromesaMonto: this.respuesta.totalPagar,
      DeudaTotal: this.respuesta.deudaTotal,
      Cuentas: cuentas,
      FormaPromesa: this.respuesta.formaPromesa,
      FormaPago: this.respuesta.formaPago,
    };
    // console.log(obj);
    this.promesaCreada = true;
    const element = document.getElementById('deals-sidebar');
    element.classList.add('active');
    return;

    this.postService.postPromesaPago(obj).subscribe((res: any) => {
      // console.log(res);
      if (res.ErrorCode === 0) {
        this.promesaCreada = true;
        const element = document.getElementById('deals-sidebar');
        element.classList.add('active');
      } else {
        this.promesaError = true;
        /*setTimeout(() => {
          this.router.navigateByUrl('promesa-pago');
        }, 3000);*/
      }
    });
  }

  volver(): void {
    this.promesaGenerada = !this.promesaGenerada;
    this.volviendo.emit(this.promesaGenerada);
  }

  removeCommas(numero: string): string {
    if (numero === '' || numero === null) { return numero; }
    return numero.replace(',', '');
  }
}
