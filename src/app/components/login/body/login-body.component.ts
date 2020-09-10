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
import { DtDispositivo } from '@app/models/rtapostvalidatetoken.model';

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
  get numero(): AbstractControl {
    return this.loginForm.get('numero');
  }

  get tipoDoc(): AbstractControl {
    return this.loginForm.get('tipoDoc');
  }

  get codigo(): AbstractControl {
    return this.loginFormIngreso.get('codigo');
  }

  private subscription: Subscription = new Subscription();

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
      numero: new FormControl('0803288836', [Validators.required]), // 0803288836
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

    const dtCliente: DtDispositivo = {
      Dispositivo: this.DispositivoTipo(),
      Browser: this.getBrowserInfo(),
      BrowserIdioma: this.getBrowserLanguage(),
      SistemaOperativo: this.SO()
    };
    const codigoValor = this.loginFormIngreso.controls.codigo.value;
    this.loadingTrabajando = true;

    this.subscription.add(this.postservices.postValidateToken
      (
        this.usuario.dni,
        this.usuario.persona,
        codigoValor,
        dtCliente
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

  SeleccionMedio(tipo: string, Id: string, Canal: string): void {
    this.SeleccionoCanal = true;
    this.tipoEnvio = tipo;
    this.IdCanalSeleccionado = Id;
    this.CanalSeleccionado = Canal;
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

  // ----------------------------------------------------
  // DATA QUE SE LEVANTA DEL DISPOSITIVO DEL CLIENTE
  // ----------------------------------------------------

  getBrowserInfo(): string {
    // tslint:disable-next-line: one-variable-per-declaration
    const ua = navigator.userAgent;
    // tslint:disable-next-line: one-variable-per-declaration
    let tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])){
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome'){
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem !== null){
          return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    // tslint:disable-next-line: no-conditional-assignment
    if ((tem = ua.match(/version\/(\d+)/i)) !== null) {
      M.splice(1, 1, tem[1]);
    }
    return M.join(' ');
  }

  getBrowserLanguage(): string {
    return navigator.language;
  }

  DispositivoTipo(): string{
    return this.isMobile() ? 'Mobile' : 'Desktop';
  }

  isMobile(): any{
    return (
        (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i)) ||
        (navigator.userAgent.match(/BlackBerry/i)) ||
        (navigator.userAgent.match(/Opera Mini/i)) ||
        (navigator.userAgent.match(/IEMobile/i))
    );
  }

  SO(): string{
    let OSName = 'Desconocido';
    if (navigator.appVersion.indexOf('Win') !== -1){
      OSName = 'Windows';
    }
    if (navigator.appVersion.indexOf('Mac') !== -1) {
      OSName = 'MacOS';
    }
    if (navigator.appVersion.indexOf('X11') !== -1) {
      OSName = 'UNIX';
    }
    if (navigator.appVersion.indexOf('Linux') !== -1) {
      OSName = 'Linux';
    }
    if (navigator.appVersion.indexOf('Android') !== -1) {
      OSName = 'Android';
    }

    return OSName + ' - ' + navigator.appVersion;
  }

  /*showInfo(): string {
    let result = '';

    result += 'CodeName del navegador (appCodeName): ' + navigator.appCodeName;
    result += ' Nombre del navegador (appName): ' + navigator.appName;
    result += ' Versión del navegador (appVersion): ' + navigator.appVersion;
    result += ' Motor del navegador (product): ' + navigator.product;
    result += ' Plataforma del navegador (platform): ' + navigator.platform;
    result += ' OnLine (onLine): ' + navigator.onLine;
    result += ' Idioma del navegador (language): ' + navigator.language;
    result += ' Cookies activadas (cookieEnabled): ' + navigator.cookieEnabled;
    result += '<br>Geoposición (geoposition): ' + navigator.geoposition;
    result += ' UserAgent (userAgent): ' + navigator.userAgent;*/
    /*
    let newVariable: any;

    newVariable = window.navigator;

    if (newVariable && newVariable.share) {
      newVariable.share({
        title: 'title',
        text: 'description',
        url: 'https://soch.in//',
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      alert('share not supported');
    }
    */
    /*return result;
  }*/

  /*
  getLocation(): string
  {
    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }
    else
    {
      return 'Geolocation is not supported by this browser.';
    }
  }

  showPosition(position): string
  {
    return 'Latitude: ' + position.coords.latitude + 'Longitude: ' + position.coords.longitude;
  }
  */
  /*info = {

    timeOpened: new Date(),
    timezone: (new Date()).getTimezoneOffset() / 60,

    pageon(): string {return window.location.pathname; },
    referrer(): string {return document.referrer; },
    previousSites(): number {return history.length; },

    browserName(): string {return navigator.appName; },
    browserEngine(): string {return navigator.product; },
    browserVersion1a(): string {return navigator.appVersion; },
    browserVersion1b(): string {return navigator.userAgent; },
    browserLanguage(): string {return navigator.language; },
    browserOnline(): boolean {return navigator.onLine; },
    browserPlatform(): string {return navigator.platform; },
    javaEnabled(): boolean {return navigator.javaEnabled(); },
    dataCookiesEnabled(): boolean {return navigator.cookieEnabled; },
    dataCookies1(): string {return document.cookie; },*/

    /*     dataCookies2(){return decodeURIComponent(document.cookie.split(";"))}, */
    /*dataStorage(): Storage {return localStorage; },
    sizeScreenW(): number {return screen.width; },
    sizeScreenH(): number {return screen.height; },*/
    /*     sizeDocW(){return document.width},
    sizeDocH(){return document.height}, */
    /*sizeInW(): number {return innerWidth; },
    sizeInH(): number {return innerHeight; },
    sizeAvailW(): number {return screen.availWidth; },
    sizeAvailH(): number {return screen.availHeight; },
    scrColorDepth(): number {return screen.colorDepth; },
    scrPixelDepth(): number {return screen.pixelDepth; },*/


  /*   latitude(){return position.coords.latitude},
    longitude(){return position.coords.longitude},
    accuracy(){return position.coords.accuracy},
    altitude(){return position.coords.altitude},
    altitudeAccuracy(){return position.coords.altitudeAccuracy},
    heading(){return position.coords.heading},
    speed(){return position.coords.speed},
    timestamp(){return position.timestamp}, */
  // };

  // ----------------------------------------------------
  // DATA QUE SE LEVANTA DEL DISPOSITIVO DEL CLIENTE
  // ----------------------------------------------------
}
