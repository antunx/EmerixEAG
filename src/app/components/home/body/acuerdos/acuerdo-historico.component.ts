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
  styles: [],
})
export class AcuerdoHistoricoComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private translate: TranslateService,
    private servicioComunicacion: ComunicacionService,
    private getservices: GetService
  ) {}
  @HostBinding('class') class = 'pages-container flex-grow';

  private subscription: Subscription = new Subscription();
  stepAcuerdo: number;
  MostrarDetalle: boolean;
  Acuerdo: Acuerdo;
  Acuerdos: Acuerdo[];
  acuerdoSeleccionado: Acuerdo;
  preAcuerdo;

  ngOnInit(): void {
    this.MostrarDetalle = false;
    this.cambioTexto(this.translate.instant('Traduct.planes_pedidos'));
    this.getAcuerdos();
    this.stepAcuerdo = 0;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cambioTexto(mensaje: string): void {
    this.servicioComunicacion.enviarMensaje(mensaje);
  }

  getAcuerdos(): void {
    this.subscription.add(
      this.getservices
        .getAcuerdos(localStorage.getItem('version_core'), 'false')
        .subscribe(
          (res) => {
            if (res.ErrorCode > 0) {
              console.log(res.ErrorMessage);
            } else {
              console.log(res);
              this.Acuerdos = res.Acuerdos;
              // console.log(this.Acuerdos);
            }
          },
          (err) => {
            console.log(err);
          }
        )
    );
  }

  OtroEstado(EstadoCodigo: string): boolean {
    if (
      EstadoCodigo === 'PENDIANT' ||
      EstadoCodigo === 'VIGENTE' ||
      EstadoCodigo === 'CUMPLIDO' ||
      EstadoCodigo === 'CAIDO' ||
      EstadoCodigo === 'ANTVENCI'
    ) {
      return false;
    } else {
      return true;
    }
  }

  EstadoNoVencidoRechazado(EstadoCodigo: string): boolean {
    if (EstadoCodigo === 'CAIDO' || EstadoCodigo === 'ANTVENCI') {
      return false;
    } else {
      return true;
    }
  }

  filaClick(tipo: string, acuerdo: Acuerdo): void {
    if (acuerdo !== null) {
      if (tipo === 'D') {
        this.VerDetalle(acuerdo);
      }
      if (tipo === 'P') {
        this.PagarAnticipo(acuerdo);
      }
      if (tipo === 'C') {
        this.VerCuotas(acuerdo);
      }
    }
  }

  VerCuotas(acuerdo: Acuerdo): void {
    this.MostrarDetalle = false;
    this.acuerdoSeleccionado = acuerdo;
    const overlay = document.querySelector('#billing-dialog');
    overlay.classList.add('active');
  }

  cerrarPopupCuotas(): void {
    const overlay = document.querySelector('#billing-dialog');
    overlay.classList.remove('active');
  }

  VerDetalle(acuerdo: Acuerdo): void {
    this.Acuerdo = acuerdo;
    const overlay = document.querySelector('#home-sidebar');
    this.MostrarDetalle = true;
    overlay.classList.add('active');
  }

  CerrarPopupDetalle(): void {
    this.MostrarDetalle = false;
    const overlay = document.querySelector('#home-sidebar');
    overlay.querySelector('.close-btn').addEventListener('click', () => {
      overlay.classList.remove('active');
    });
  }

  PagarAnticipo(acuerdo: Acuerdo): void {
    alert('PagarAnticipo(): en desarrollo |_(-.-)_T ');
  }

  onVolver(e: number): void {
    this.stepAcuerdo = e;
  }

  pagarAcuerdo(Id: number, importe: number): void {
    // console.log(Id);
    // console.log(importe)
    const obj = {
      Items: [],
      TotalPagar: importe,
      Cliente: localStorage.getItem('version_core'),
    };
    const cta = {
      id: Id,
      importe: { importe },
      tipo: 'ANTICIPO',
      cuotas: [],
    };

    obj.Items.push(cta);
    this.preAcuerdo = obj;
    this.stepAcuerdo = this.stepAcuerdo + 1;
  }
}
