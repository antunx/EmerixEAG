
import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PostService } from '@app/services/post.service';
import { MetodosEstandarService } from '@app/services/metodos-estandar.service';
import { Item, ItemDefault } from '@app/models/rtagetobjetocombo.model';
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
  @HostBinding('class') class = 'pages-container flex-grow';
  private subscription: Subscription = new Subscription();
  MensajePago: string;

  get Importe(): AbstractControl {
    return this.pagoForm.get('Importe');
  }

  get FechaPago(): AbstractControl {
    return this.pagoForm.get('FechaPago');
  }

  get NumeroComprobante(): AbstractControl {
    return this.pagoForm.get('NumeroComprobante');
  }

  // Combos
  mediosPago: Item[];
  monedas: Array<ItemDefault> = [];
  FechaActual = new Date();
  IdMedioPago: number;
  MostrarAlert: boolean;
  MensajeAlert: string;
  stepPago: number;
  MedioSeleccionado: string;

  pagoForm = this.formBuilder.group({
    IdMoneda: ['0', Validators.required],
    Importe: ['', [Validators.required, Validators.min(0.01), Validators.max(999999999)]],
    FechaPago: [this.datePipe.transform(this.FechaActual, 'yyyy-MM-dd')], // , Validators.required
    NumeroComprobante: ['', Validators.required],
    Comentario: ['']
  });

  ngOnInit(): void{
    this.IdMedioPago = 0;
    this.MedioSeleccionado = 'generic.svg';
    this.stepPago = 1;
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
          // console.log(res.Items);
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
          // console.log( res.Items);
          res.Items.forEach(
            item =>
            this.monedas.push({ Id: item.Id, Code: item.Codigo, Name: item.Codigo })
          );
        }
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  MedioPago(medio: Item): void{
    this.mediosPago.forEach(element =>
            (document.getElementById(`${element.Id}`) as HTMLInputElement).classList.remove('active')
    );
    (document.getElementById(`${medio.Id}`) as HTMLInputElement).classList.add('active');
    this.IdMedioPago = medio.Id;
    this.MedioSeleccionado =  medio.Imagen;
  }

  MedioPagoDefault(): void{
    this.mediosPago.forEach(element =>
      (document.getElementById(`${element.Id}`) as HTMLInputElement).classList.remove('active')
    );
    this.IdMedioPago = 0;
  }

  Validate(): string{
    const hoy = new Date();
    const FechaPago = new Date(this.pagoForm.controls.FechaPago.value);
    let FechaValida = false;
    FechaValida = FechaPago instanceof Date && !isNaN(FechaPago.valueOf());
    if (!FechaValida){
      return this.translate.instant('Traduct.fecha_erronea');
    }

    if (FechaPago > hoy) {
      return this.translate.instant('Traduct.fecha_error');
    }

    if (this.pagoForm.controls.IdMoneda.value === '0') {
      return this.translate.instant('Traduct.seleccione_moneda');
    }

    if (this.IdMedioPago === 0) {
     return this.translate.instant('Traduct.seleccione_medio_pago');
    }

    return '';
  }

  CorroborarPago(): void{
    let Mensaje = '';
    Mensaje = this.Validate();

    if (Mensaje === ''){
      this.stepPago = 2;
    } else {
      this.MensajeAlert = Mensaje;
      this.mostrarAlert();
    }
  }

  IngresarPago(): void{
    const entidad: Comprobante = this.pagoForm.value;
    const FechaPago = new Date(this.pagoForm.controls.FechaPago.value + 'T00:00:00');
    entidad.Fecha = FechaPago;
    entidad.IdCuenta = '0';
    entidad.IdPersona = localStorage.getItem('version_core');
    entidad.IdMedioPago = this.IdMedioPago;

    /*
    console.log(entidad);
    return;
    */
    this.subscription.add(this.postservices.postComprobante(entidad).subscribe(
      (res) => {
        if (res.ErrorCode > 0){
          this.MensajeAlert = res.ErrorMessage;
          this.mostrarAlert();
        } else{
          this.ResetForm();
        }
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  ResetForm(): void{
    this.stepPago = 3;
    this.pagoForm = this.formBuilder.group({
      IdMoneda: ['0', Validators.required],
      Importe: ['', [Validators.required, Validators.min(0.01), Validators.max(999999999)]],
      FechaPago: [this.datePipe.transform(this.FechaActual, 'yyyy-MM-dd'), Validators.required],
      NumeroComprobante: ['', Validators.required],
      Comentario: ['']
    });
    this.MedioPagoDefault();
  }

  SoloNumerosLetras(event: string): boolean {
    const reg = new RegExp('[a-z0-9]');
    let ret: boolean;
    ret = reg.test(event);
    return ret;
  }

  mostrarAlert(): void{
    this.MostrarAlert = true;
    document.querySelector('#dialog_alert').classList.add('active');
  }

  cerrarAlert(): void{
    document.querySelector('#dialog_alert').classList.remove('active');
    this.MostrarAlert = false;
    this.MensajeAlert = '';
  }

  GetImporteSplit(Entero: boolean): string{
    const entidad: Comprobante = this.pagoForm.value;
    let monto = [];
    monto = parseFloat(JSON.stringify(entidad.Importe)).toFixed(2).split('.');
    if (Entero){
      return monto[0];
    } else {
      return monto[1];
    }
  }

  GetNombreMoneda(Id: string): string{
    if (this.monedas){
      let item: ItemDefault[];
      let ret: string;
      item = this.monedas.filter(mon => mon.Id.toString() === Id);
      if (item){
        item.forEach((i) => {
          ret = i.Code;
        });
        return ret;
      }else{
        return '-';
      }
    }
    else{
      return '-';
    }
  }

  // Inicio(): void{
    /* const myForm = document.getElementById(`pagoForm`) as HTMLFormElement;
    myForm.submit(); */
  // this.monedas = [];
    // this.monedas = [{ Id: 0, Code: 'Moneda', Name: 'Moneda' }];

  //  this.stepPago = 1;
  // }
}
