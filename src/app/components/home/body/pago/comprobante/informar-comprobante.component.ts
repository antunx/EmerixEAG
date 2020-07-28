
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PostService } from '@app/services/post.service';
import { MetodosEstandarService } from '@app/services/metodos-estandar.service';
import { Item } from '@app/models/rtagetobjetocombo.model';
import Swal from 'sweetalert2';
import { Comprobante } from '@app/models/comprobante.models';
import { Subscription } from 'rxjs';
import { ComunicacionService } from '@app/services/comunicacion.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-informar-comprobante',
  templateUrl: './informar-comprobante.component.html',
  styles: [
  ]
})
export class InformarComprobanteComponent implements OnInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private postservices: PostService,
    private metodosEstandarService: MetodosEstandarService,
    private servicioComunicacion: ComunicacionService,
    private translate: TranslateService,
    private datePipe: DatePipe
    ) {
      this.metodosEstandarService.Entidad = ''; // SOLO SE USA PARA CRUD
    }
  private fechaDate: Date;
  private subscription: Subscription = new Subscription();
  MensajePago: string;
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  get IdMedioPago(): AbstractControl {
    return this.pagoForm.get('IdMedioPago');
  }

  get IdMoneda(): AbstractControl {
    return this.pagoForm.get('IdMoneda');
  }

  get Importe(): AbstractControl {
    return this.pagoForm.get('Importe');
  }

  get FechaPago(): AbstractControl {
    return this.pagoForm.get('FechaPago');
  }

  get NumeroComprobante(): AbstractControl {
    return this.pagoForm.get('NumeroComprobante');
  }

  get Comentario(): AbstractControl {
    return this.pagoForm.get('Comentario');
  }
  // Combos
  mediosPago: Item[];
  monedas: Item[];
  FechaActual = new Date();

  pagoForm = this.formBuilder.group({
    IdMedioPago: ['0', Validators.required],
    IdMoneda: ['0', Validators.required],
    Importe: ['', [Validators.required, Validators.min(0.01), Validators.max(999999999)]],
    FechaPago: [this.datePipe.transform(this.FechaActual, 'yyyy-MM-dd'), Validators.required],
    NumeroComprobante: ['', Validators.required],
    Comentario: ['']
  });

  ngOnInit(): void{
    this.cambioTexto(this.translate.instant('Traduct.registrar_pago'));
    this.LlenarMediosPago();
    this.LlenarMonedas();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  cambioTexto(mensaje: string): void {
    this.servicioComunicacion.enviarMensaje(mensaje);
  }
  LlenarMediosPago(): void{
    this.subscription.add(this.metodosEstandarService.getObjectCombo('getmediospago').subscribe(
      (res) => {
        if (res.ErrorCode > 0){
          console.log(res.ErrorMessage);
        } else{
          this.mediosPago = res.Items;
        }
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  LlenarMonedas(): void{
    this.subscription.add(this.metodosEstandarService.getObjectCombo('getmoneda').subscribe(
      (res) => {
        if (res.ErrorCode > 0){
          console.log(res.ErrorMessage);
        } else{
          this.monedas = res.Items;
        }
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  Validate(): string{
    const hoy = new Date();
    const FechaPago = new Date(this.pagoForm.controls.FechaPago.value);
    if (FechaPago > hoy) {
      return this.translate.instant('Traduct.fecha_error');
    }

    if (this.pagoForm.controls.IdMoneda.value === '0') {
      return this.translate.instant('Traduct.seleccione_moneda');
    }

    if (this.pagoForm.controls.IdMedioPago.value === '0') {
     return this.translate.instant('Traduct.seleccione_medio_pago');
    }

    return '';
  }

  IngresarPago(): void{
    let Mensaje = '';
    Mensaje = this.Validate();

    if (Mensaje === ''){
      // console.log(this.pagoForm.value);
      this.swalWithBootstrapButtons.fire({
        title: this.translate.instant('Traduct.registrar_el_pago'),
        text: this.translate.instant('Traduct.confirme_accion'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.translate.instant('Traduct.si'),
        cancelButtonText: this.translate.instant('Traduct.no'),
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          const entidad: Comprobante = this.pagoForm.value;
          const FechaPago = new Date(this.pagoForm.controls.FechaPago.value + 'T00:00:00');
          entidad.Fecha = FechaPago;
          entidad.IdCuenta = '0';
          entidad.IdPersona = localStorage.getItem('version_core');
          // console.log(entidad);
          // return;
          this.subscription.add(this.postservices.postComprobante(entidad).subscribe(
            (res) => {
              if (res.ErrorCode > 0){
                // console.log(res.ErrorMessage);
                this.swalWithBootstrapButtons.fire({
                  icon: 'error',
                  title: this.translate.instant('Traduct.validacion'),
                  text: res.ErrorMessage
                });
              } else{
                this.ResetForm();
                this.MensajePago = res.Mensaje;
                document.querySelector('#pay-sidebar').classList.add('active');
                document.querySelector('html').classList.add('no-scroll');
              }
            },
            (err) => {
              console.log(err);
            }
          ));
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              /*this.swalWithBootstrapButtons.fire(
                'Acción Cancelada',
                'Su pago no fue registrado.',
                'error'
              );*/
            }
          });
    }else{
      this.swalWithBootstrapButtons.fire({
        icon: 'error',
        title: this.translate.instant('Traduct.validacion'),
        text: Mensaje
      });
    }
  }

  ResetForm(): void{
    this.pagoForm = this.formBuilder.group({
      IdMedioPago: ['0'],
      IdMoneda: ['0'],
      Importe: [''],
      FechaPago: [this.datePipe.transform(this.FechaActual, 'dd-MM-yyyy')],
      NumeroComprobante: [''],
      Comentario: ['']
    });
  }

  SoloNumerosLetras(event: string): boolean {
    const reg = new RegExp('[a-z0-9]');
    let ret: boolean;
    ret = reg.test(event);
    return ret;
  }

  CerrarPopup(): void{
    document.querySelector('.overlay').classList.remove('active');
    document.querySelector('html').classList.remove('no-scroll');
  }
}
