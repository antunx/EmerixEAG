import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { GetService } from '@services/get.service';
import { Subscription } from 'rxjs';
import { ComunicacionService } from '@app/services/comunicacion.service';
import { TranslateService } from '@ngx-translate/core';
import { Acuerdo } from '@app/models/acuerdo.models';

@Component({
  selector: 'app-acuerdo-historico',
  templateUrl: './acuerdo-historico.component.html',
  styles: [
  ]
})
export class AcuerdoHistoricoComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private translate: TranslateService,
    private servicioComunicacion: ComunicacionService,
    private getservices: GetService) {}
  @HostBinding('class') class = 'pages-container flex-grow';

  private subscription: Subscription = new Subscription();
  MostrarPopup: boolean;
  Acuerdo: Acuerdo;
  Acuerdos: Acuerdo[];

  ngOnInit(): void{
    this.MostrarPopup = false;
    this.cambioTexto(this.translate.instant('Traduct.planes_pedidos'));
    this.getAcuerdos();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  cambioTexto(mensaje: string): void {
    this.servicioComunicacion.enviarMensaje(mensaje);
  }

  getAcuerdos(): void{
    this.subscription.add(this.getservices.getAcuerdos(localStorage.getItem('version_core'), 'false').subscribe((res) => {
      if (res.ErrorCode > 0){
        console.log(res.ErrorMessage);
      } else{
        this.Acuerdos = res.Acuerdos;
        // console.log(this.Acuerdos);
      }
    }, (err) => {
        console.log(err);
    }));
  }

  // Navegamos al detalle del acuerdo
  clickDetalle(tipo: string, acuerdo: Acuerdo): void{
    if (acuerdo !== null){
      if (tipo === 'D'){
        this.Acuerdo  = acuerdo;
        const overlay = document.querySelector('#home-sidebar');
        document.querySelectorAll('#agreement-table tr').forEach((tr) => {
          tr.addEventListener('click', () => {
            this.MostrarPopup = true;
            overlay.classList.add('active');
          });
        });
      }
      if (tipo === 'P'){
        this.PagarAnticipo(acuerdo.IdAcuerdo);
      }
      if (tipo === 'C'){
        this.VerCuotas(acuerdo.IdAcuerdo);
      }
    }
  }

  PagarAnticipo(IdAcuerdo: number): void{
    alert('PagarAnticipo(): en desarrollo |_(-.-)_T ');
  }

  VerCuotas(IdAcuerdo: number): void{
    alert('VerCuotas(): en desarrollo |_(-.-)_T ');
  }

  // Cerramos el popup detalle del acuerdo
  CerrarPopup(): void{
    this.MostrarPopup = false;
    const overlay = document.querySelector('#home-sidebar');
    overlay.querySelector('.close-btn').addEventListener('click', () => {
        overlay.classList.remove('active');
      });
  }

  OtroEstado(EstadoCodigo: string): boolean{
    if (EstadoCodigo === 'PENDIANT' || EstadoCodigo === 'VIGENTE'
     || EstadoCodigo === 'CUMPLIDO' || EstadoCodigo === 'CAIDO'
     || EstadoCodigo === 'ANTVENCI'){
      return false;
    }else {
      return true;
    }
  }

  EstadoNoVencidoRechazado(EstadoCodigo: string): boolean{
    if (EstadoCodigo === 'CAIDO'
     || EstadoCodigo === 'ANTVENCI'){
      return false;
    }else {
      return true;
    }
  }
}
