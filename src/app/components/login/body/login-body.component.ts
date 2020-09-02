import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GetService } from '@services/get.service';
import { PostService } from '@services/post.service';
import { UsuarioAutenticarModel } from '@models/usuarioautenticar.model';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '@app/services/auth.service';
import { MetodosEstandarService } from '@app/services/metodos-estandar.service';
import { ItemDefault } from '@app/models/rtagetobjetocombo.model';
import { Phone, Mail } from '@app/models/rtagetvalidateuser.model';

@Component({
  selector: 'app-login-body',
  templateUrl: './login-body.component.html'
})

export class LoginBodyComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private postservices: PostService,
    private getservices: GetService,
    private translate: TranslateService,
    private authService: AuthService,
    private metodosEstandarService: MetodosEstandarService,
  ) { this.metodosEstandarService.Entidad = ''; }

  private subscription: Subscription = new Subscription();
  get numero(): AbstractControl {
    return this.loginForm.get('numero');
  }

  get tipoDoc(): AbstractControl {
    return this.loginForm.get('tipoDoc');
  }

  get codigo(): AbstractControl {
    return this.loginFormIngreso.get('codigo');
  }

  tiposDocumento: Array<ItemDefault> = [];

  loginForm: FormGroup;
  loginFormIngreso: FormGroup;
  usuario = new UsuarioAutenticarModel();
  telefonos: Array<Phone> = [];
  mails: Array<Mail> = [];

  MedioEnvioSeleccionado: string;
  loginValido = false;
  tieneInfo = false;
  tieneTelefonos = true;
  tieneMails = true;
  SeleccionoCanal = false;
  CanalSeleccionado = '';
  IdCanalSeleccionado = '';
  tipoEnvio = '';
  AceptaTerminos = false;
  loadingTrabajando = false;
  codigoEnviado = false;

  popupNro: number;
  MensajeAlert: string;
  MensajeTituloAlert: string;
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

  resolved(captchaResponse: string): void {
    // console.log(`Resolved response token: ${captchaResponse}`);
  }

  configurarFormLogin(): void {
    this.loginForm = new FormGroup({
      tipoDoc: new FormControl(''), // , [Validators.required]
      numero: new FormControl('', [Validators.required]), // 0803288836
      recaptcha: new FormControl('ERR', [Validators.required]),
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
        // this.tiposDocumento = res.TypeDoc;
        res.TypeDoc.forEach(
          item =>
           this.tiposDocumento.push({ Id: item.IdTypeDoc, Code: item.CodeTypeDoc, Name: item.NameTypeDoc })
        );
      }, (err) => {
        console.log(err);
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
      this.loginForm.controls.tipoDoc.setValue('');
      this.loginForm.controls.recaptcha.setValue('ERR');
    }
    if (valor === 2){
      this.SeleccionoCanal = false;
    }
    this.loginAction = valor;
  }

  Validar(paso: number): boolean{
    let ret: boolean;
    ret = true;

    switch (paso) {
      case 1:
        if (this.loginForm.controls.tipoDoc.value === ''){
          this.MensajeTituloAlert = 'Error';
          this.MensajeAlert = this.translate.instant('Traduct.seleccione') + ' ' + this.translate.instant('Traduct.document');
          this.mostrarPopu(4);
          ret = false;
          break;
        }

        if (this.loginForm.controls.numero.value === ''){
          this.MensajeTituloAlert = 'Error';
          this.MensajeAlert = this.translate.instant('Traduct.complete') + ' ' + this.translate.instant('Traduct.numero');
          this.mostrarPopu(4);
          ret = false;
          break;
        }

        if (this.SeleccionoMedioEnvio === false){
          this.MensajeTituloAlert = 'Error';
          this.MensajeAlert = this.translate.instant('Traduct.seleccione') + ' ' + this.translate.instant('Traduct.canal_sms_mail');
          this.mostrarPopu(4);
          ret = false;
          break;
        }

        if (this.loginForm.controls.recaptcha.value === 'ERR'){
          this.MensajeTituloAlert = 'Error';
          this.MensajeAlert = this.translate.instant('Traduct.complete') + ' Captcha';
          this.mostrarPopu(4);
          ret = false;
          break;
        }
        break;
      case 2:
        if (this.IdCanalSeleccionado === ''){
          this.MensajeTituloAlert = 'Error';
          this.MensajeAlert = this.translate.instant('Traduct.seleccione_clave_destino');
          this.mostrarPopu(4);
          ret = false;
          break;
        }
        break;
      case 3:
        if (this.loginFormIngreso.controls.codigo.value === ''){
          this.MensajeTituloAlert = 'Error';
          this.MensajeAlert = this.translate.instant('Traduct.ingrese_token');
          this.mostrarPopu(4);
          ret = false;
          break;
        }

        if (!this.AceptaTerminos){
          this.MensajeTituloAlert = 'Error';
          this.MensajeAlert = this.translate.instant('Traduct.acepte_terminos_condiciones');
          this.mostrarPopu(4);
          ret = false;
          break;
        }
        break;
      default:
        ret = false;
        break;
    }

    return ret;
  }

  Login(): void{
    if (!this.Validar(1)){
      return;
    }

    this.loadingTrabajando = true;
    this.MedioEnvioSeleccionado = this.loginForm.controls.medioEnvio.value;
    this.tieneInfo = false;
    this.usuario.dni = this.loginForm.controls.numero.value;
    this.usuario.tipoDoc = this.loginForm.controls.tipoDoc.value;

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
          }
          else{
            this.tieneTelefonos = false;
          }
          if (res.IsExistsMail){
            this.tieneInfo = true;
            // LLENAR MAIL
            this.mails = res.Mails;
            // console.log('this.mails: ' + this.mails);
            // console.log('this.mails.length: ' + this.mails.length);
            this.tieneMails = true;
          }else{
            this.tieneMails = false;
          }

          if (this.MedioEnvioSeleccionado === 'T' && !this.tieneTelefonos){
            this.MensajeTituloAlert = this.translate.instant('Traduct.msgTelefonoTitulo');
            this.MensajeAlert = this.translate.instant('Traduct.msgTelefono');
            this.mostrarPopu(4);
            return;
          }
          if (this.MedioEnvioSeleccionado === 'M' && !this.tieneMails){
            this.MensajeTituloAlert = this.translate.instant('Traduct.msgMailTitulo');
            this.MensajeAlert = this.translate.instant('Traduct.msgMail');
            this.mostrarPopu(4);
            return;
          }
          this.loginAction = 2;
          this.loadingTrabajando = false;
      }else{
          this.loginValido = false;
          this.loadingTrabajando = false;
          localStorage.setItem('version_core', '' );
          this.MensajeAlert = res.ErrorMessage;
          this.mostrarPopu(3);
      }
      }, (err) => {
        this.loadingTrabajando = false;
        // console.log(err);
      }
    ));
    // console.log(tipo);
    // console.log('tieneMails: ' + this.tieneMails);
    // console.log('tieneTelefonos: ' + this.tieneTelefonos);
  }

  EnviarCodigo(): void{
    if (!this.Validar(2)){
      return;
    }
    // this.loginForm.patchValue({aceptaTerminos: false});
    // this.loginForm.controls.aceptaTerminos.disable();

    this.codigoEnviado = false;
    this.loadingTrabajando = true;
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
              this.loadingTrabajando = false;
              this.MensajeAlert = res.ErrorMessage;
              this.mostrarPopu(3);
          }else {
            this.codigoEnviado = true;
            // this.loginForm.controls.aceptaTerminos.enable();
            this.loadingTrabajando = false;
            this.loginAction = 3;
          }
      }, (err) => {
        this.loadingTrabajando = false;
        this.MensajeAlert = err.error.Message;
        this.mostrarPopu(3);
      }));
  }

  IngresarPortal(): void{
    if (!this.Validar(3)){
      return;
    }
    const codigoValor = this.loginFormIngreso.controls.codigo.value;
    this.loadingTrabajando = true;
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
          this.MensajeAlert = res.ErrorMessage;
          this.loadingTrabajando = false;
          this.mostrarPopu(3);
        }else {
          this.authService.login(res.Jwt);
          localStorage.setItem('Cliente', res.Name);
          this.loadingTrabajando = false;
          this.router.navigateByUrl('/home/default');
        }
      }, (err) => {
        this.loadingTrabajando = false;
        this.MensajeAlert = err.error.Message;
        this.mostrarPopu(3);
      }));
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

  SoloNumeros(event: string): boolean {
    const reg = new RegExp('[0-9]');
    let ret: boolean;
    ret = reg.test(event);
    return ret;
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
