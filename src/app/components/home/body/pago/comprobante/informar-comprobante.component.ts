
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '@app/services/post.service';
import { MetodosEstandarService } from '@app/services/metodos-estandar.service';
import { Item } from '@app/models/rtagetobjetocombo.model';
import Swal from 'sweetalert2';
import { Comprobante } from '@app/models/comprobante.models';
import { Subscription } from 'rxjs';
import { ComunicacionService } from '@app/services/comunicacion.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-informar-comprobante',
  templateUrl: './informar-comprobante.component.html',
  styles: [
  ]
})
export class InformarComprobanteComponent implements OnInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private postservices: PostService,
    private metodosEstandarService: MetodosEstandarService,
    private servicioComunicacion: ComunicacionService,
    private translate: TranslateService
    ) {
      this.metodosEstandarService.Entidad = ''; // SOLO SE USA PARA CRUD
    }
  private subscription: Subscription = new Subscription();
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

  get Fecha(): AbstractControl {
    return this.pagoForm.get('Fecha');
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

  pagoForm = this.formBuilder.group({
    IdMedioPago: ['1', Validators.required],
    IdMoneda: ['1', Validators.required],
    Importe: ['', [Validators.required, Validators.min(0.01), Validators.max(999999999)]],
    Fecha: ['', Validators.required],
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
    const fechaSeleccionada = new Date(this.pagoForm.controls.Fecha.value);
    let sReturn = '';

    if (fechaSeleccionada < hoy) {
      sReturn = '';
    } else {
      sReturn = 'La fecha debe ser anterior o igual a la fecha actual.';
    }

    return sReturn;
  }

  IngresarPago(): void{
    let Mensaje = '';
    Mensaje = this.Validate();
    if (Mensaje === ''){
      // console.log(this.pagoForm.value);
      /*Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Su pago ha sido registrado',
        showConfirmButton: false,
        timer: 1500
      });
      */
      this.swalWithBootstrapButtons.fire({
        title: '¿Registra el pago?',
        text: 'Confirme la acción.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {

          const entidad: Comprobante = this.pagoForm.value;
          entidad.IdCuenta = '0';
          entidad.IdPersona = localStorage.getItem('version_core');
          // console.log(entidad);
          // return;
          this.subscription.add(this.postservices.postComprobante(entidad).subscribe(
            (res) => {
              if (res.ErrorCode > 0){
                console.log(res.ErrorMessage);
                this.swalWithBootstrapButtons.fire({
                  icon: 'error',
                  title: 'Validación',
                  text: res.ErrorMessage
                });
              } else{
                this.ResetForm();
                this.swalWithBootstrapButtons.fire(
                  'Confirmado!',
                  res.Mensaje === '' ? 'Su pago ha sido ingresado' : res.Mensaje,
                  'success'
                );
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
        title: 'Validación',
        text: Mensaje
      });
    }
  }

  ResetForm(): void{
    this.pagoForm = this.formBuilder.group({
      IdMedioPago: ['1'],
      IdMoneda: ['1'],
      Importe: [''],
      Fecha: [''],
      NumeroComprobante: ['', Validators.maxLength(50)],
      Comentario: ['', Validators.maxLength(255)]
    });
  }

  SoloNumerosLetras(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode === 45) || (charCode >= 48 && charCode <= 57) || (charCode >= 97 && charCode <= 122)) {
      return true;
    }
    return false;
  }
}
