import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { GetService } from '@services/get.service';
import { PostService } from '@services/post.service';
import { UsuarioAutenticarModel } from '@models/usuarioautenticar.model';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-login-body',
  templateUrl: './login-body.component.html'
})

export class LoginBodyComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private postservices: PostService,
    private getservices: GetService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private authService: AuthService
  ) { }
  private subscription: Subscription = new Subscription();
  get numero(): any {
    return this.loginForm.get('numero');
  }
  get tipoDoc(): any {
    return this.loginForm.get('tipoDoc');
  }
  /*get genero(): any {
    return this.loginForm.get('genero');
  }*/
  get sms(): any {
    return this.loginForm.get('sms');
  }
  get mail(): any {
    return this.loginForm.get('mail');
  }

  get codigo(): any {
    return this.loginFormIngreso.get('codigo');
  }

  tiposDocumento = [];
  loginForm: FormGroup;
  loginFormIngreso: FormGroup;
  usuario = new UsuarioAutenticarModel();
  telefonos = [];
  mails = [];

  loginValido = false;
  tieneInfo = false;
  tieneTelefonos = true;
  tieneMails = true;
  mostrarTelefonos = false;
  mostrarMails = false;
  SeleccionoCanal = false;
  CanalSeleccionado = '';
  IdCanalSeleccionado = '';
  tipoEnvio = '';
  AceptaTerminos = false;
  loadingGenerar = false;
  codigoEnviado = false;

  popupNro: number;
  MensajeAlert: string;
  loginAction: number;
  SeleccionoMedioEnvio: boolean;

  ngOnInit(): void {
    localStorage.clear();
    this.loginAction = 1;
    this.popupNro = 0;
    this.SeleccionoMedioEnvio = false;
    this.configurarFormLogin();
    this.llenarTiposDni();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  configurarFormLogin(): void{
    this.loginForm = new FormGroup({
      tipoDoc: new FormControl('', [Validators.required]), // 1
      numero: new FormControl('', [Validators.required]), // 0803288836
      // genero: new FormControl('', [Validators.required]),
      medioEnvio: new FormControl({value: false, disabled: false}),
    });

    this.loginFormIngreso = new FormGroup({
      codigo: new FormControl('', [Validators.required])
    });
  }

  llenarTiposDni(): void{
    this.subscription.add(this.getservices.getDocumentType().subscribe( (res) => {
      // console.log(res.TypeDoc);
      this.tiposDocumento = res.TypeDoc;
    }, (err) => {
        // console.log(err);
      }
    ));
  }

  TildarMedioEnvio(medio: string): void{
    this.loginForm.controls.medioEnvio.setValue(medio);
    this.SeleccionoMedioEnvio = true;
  }

  Volver(valor: number): void{
    if (valor === 1){
      this.SeleccionoCanal = false;
    }
    if (valor === 2){
      this.SeleccionoCanal = false;
    }
    this.loginAction = valor;
  }

  Login(ownerFormValue: any): void{
    let tipo: string;
    tipo = this.loginForm.controls.medioEnvio.value;
    // console.log("Login: " + tipo);

    this.tieneInfo = false;
    this.usuario.dni = ownerFormValue.numero;
    this.usuario.tipoDoc = ownerFormValue.tipoDoc;
    this.telefonos = [];
    this.mails = [];

    this.subscription.add(this.getservices.getValidateUser( this.usuario.dni, this.usuario.tipoDoc).subscribe( (res) => {
      // console.log(res);

      if (res.ErrorCode === 0){
          this.loginValido = true;
          localStorage.setItem('version_core', res.Person);
          if (res.IsExistsPhone){
            this.tieneInfo = true;
            // LLENAR TELEFONOS
            this.telefonos = res.Phones;
            // console.log('this.telefonos: ' + this.telefonos);
            // console.log('this.telefonos.length: ' + this.telefonos.length);
            this.tieneTelefonos = true;
            if (tipo === 'T'){
              this.MostrarCboTelefonos();
            }
          }
          else{
            this.tieneTelefonos = false;
            this.MostrarCboMails();
          }
          if (res.IsExistsMail){
            this.tieneInfo = true;
            // LLENAR MAIL
            this.mails = res.Mails;
            // console.log('this.mails: ' + this.mails);
            // console.log('this.mails.length: ' + this.mails.length);
            this.tieneMails = true;
            if (tipo === 'M'){
              this.MostrarCboMails();
            }
          }else{
            this.MostrarCboTelefonos();
            this.tieneMails = false;
          }
          this.loginAction = 2;
      }else{
          this.loginValido = false;
          localStorage.setItem('version_core', '' );
          this.MensajeAlert = res.ErrorMessage;
          this.mostrarPopu(3);
      }
      }, (err) => {
        // console.log(err);
      }
    ));
    // console.log(tipo);
    // console.log('tieneMails: ' + this.tieneMails);
    // console.log('tieneTelefonos: ' + this.tieneTelefonos);
  }

  EnviarCodigo(): void{
    // this.loginForm.patchValue({aceptaTerminos: false});
    // this.loginForm.controls.aceptaTerminos.disable();

    this.codigoEnviado = false;
    this.loadingGenerar = true;
    this.usuario.persona = localStorage.getItem('version_core');
    this.subscription.add(this.postservices.postGenerateToken
      (
        this.usuario.persona,
        this.tipoEnvio,
        this.IdCanalSeleccionado
      ).subscribe((res) => {
         // console.log(res);
         // console.log(this.usuario.persona);
         // console.log(this.tipoEnvio);
         // console.log(this.IdCanalSeleccionado);
         // return false;

         if (!res.IsSent){
              this.loadingGenerar = false;
              this.MensajeAlert = res.ErrorMessage;
              this.mostrarPopu(3);
          }else {
            this.codigoEnviado = true;
            // this.loginForm.controls.aceptaTerminos.enable();
            this.loadingGenerar = false;
            this.loginAction = 3;
          }
      }, (err) => {
        this.loadingGenerar = false;
        this.MensajeAlert = err.error.Message;
        this.mostrarPopu(3);
      }));
  }

  IngresarPortal(): void{
    if (this.loginFormIngreso.invalid) {
      console.log('Form loginFormIngreso invalid!!!');
      return;
    }

    const codigoValor = this.loginFormIngreso.controls.codigo.value;

    this.subscription.add(this.postservices.postValidateToken
      (
        this.usuario.dni,
        this.usuario.persona,
        codigoValor
      ).subscribe((res) => {
        // console.log(res);
        // console.log(this.usuario.dni);
        // console.log(this.usuario.persona);
        // console.log(codigoValor);
        // return ;

        if (!res.IsValid){
          this.authService.logout();
          this.MensajeAlert = res.ErrorMessage;
          this.mostrarPopu(3);
        }else {
          this.authService.login(res.Jwt);
          localStorage.setItem('Cliente', res.Name);
          this.router.navigateByUrl('/home/default');
        }
      }, (err) => {
        this.MensajeAlert = err.error.Message;
        this.mostrarPopu(3);
      }));
  }

  MostrarCboTelefonos(): void{
    this.mostrarTelefonos = true;
    this.mostrarMails = false;
    // this.PantallaDefault();
  }

  MostrarCboMails(): void{
    this.mostrarMails = true;
    this.mostrarTelefonos = false;
    // this.PantallaDefault();
  }

  SeleccionMedio(tipo: string, medioEnvio: any): void {
    this.SeleccionoCanal = true;
    this.tipoEnvio = tipo;

    if (tipo === 'T'){
      this.IdCanalSeleccionado = medioEnvio.PhoneValue;
      this.CanalSeleccionado = medioEnvio.Phone;

      // uso para combo de telefonos
      // this.CanalSeleccionado = this.loginForm.controls.telefonos.value.Phone;
      // this.IdCanalSeleccionado = this.loginForm.controls.telefonos.value.PhoneValue;
    }
    if (tipo === 'M'){
      this.IdCanalSeleccionado = medioEnvio.MailValue;
      this.CanalSeleccionado = medioEnvio.Mail;

      // uso para combo de mails
      // this.CanalSeleccionado = this.loginForm.controls.mails.value.Mail;
      // this.IdCanalSeleccionado = this.loginForm.controls.mails.value.MailValue;
    }
    // console.log(this.CanalSeleccionado);
    // console.log(this.IdCanalSeleccionado);
  }

  AceptoTerminos(): void{
    this.AceptaTerminos = !this.AceptaTerminos;
  }

  SoloNumeros(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  InconvenienteCodigo(): void {
    this.mostrarPopu(1);
  }

  TerminosCondiciones(): void{
    this.mostrarPopu(2);
  }

  mostrarPopu(popup: number): void{
    this.popupNro = popup;
    document.querySelector('.overlay').classList.add('active');
  }

  cerrarPopup(): void{
    document.querySelector('.overlay').classList.remove('active');
    this.popupNro = 0;
    this.MensajeAlert = '';
  }

  // ineficiente, se ejecuta 4 veces, se puede usar como ultima instancia.
  ToolTipMensajeError(control: FormControl): string {
    const controlErrors: ValidationErrors = control.errors;
    let Tipoerror: string;
    let Return: string;
    let Largorequerido: number;
    let Largorequerido2: number;

    let keepGoing = true;
    if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          // console.log('Key control: ' + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          Tipoerror = keyError;
          Largorequerido = controlErrors[keyError].requiredLength;
          Largorequerido2 = 2;
          if (keepGoing) {
              keepGoing = false;
          }
        });
        // console.log (error);
        if (Tipoerror === 'minlength'){
        Return = this.translate.instant('Traduct.minimo')  + ' ' + Largorequerido + ' ' +  this.translate.instant('Traduct.caracteres');
        }
        if (Tipoerror === 'maxlength'){
        Return = this.translate.instant('Traduct.no_superar')  + ' ' + Largorequerido + ' ' +  this.translate.instant('Traduct.caracteres');
        }
        if (Tipoerror === 'required'){
        Return = this.translate.instant('Traduct.numero_requerido');
        }
      }
    return Return;
  }
}
