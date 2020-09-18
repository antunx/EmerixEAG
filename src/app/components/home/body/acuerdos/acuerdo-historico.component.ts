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
  Mostrarcuotas: boolean;
  Acuerdo: Acuerdo;
  Acuerdos: Acuerdo[];
  acuerdosFiltrados: Acuerdo[];
  acuerdoSeleccionado: Acuerdo;
  preAcuerdo;
  banderaInput: number = 1;

  ngOnInit(): void {
    this.MostrarDetalle = false;
    this.Mostrarcuotas = false;
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
              console.log(this.Acuerdos);
              this.seleccionarFiltroFecha(12);
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

  VerCuotas(acuerdo: Acuerdo): void {
    this.acuerdoSeleccionado = acuerdo;
    const overlay = document.querySelector('#plans-dialog');
    overlay.classList.add('active');
  }

  cerrarPopupCuotas(): void {
    const overlay = document.querySelector('#plans-dialog');
    overlay.classList.remove('active');
  }

  PagarAnticipo(acuerdo: Acuerdo): void {
    alert('PagarAnticipo(): en desarrollo |_(-.-)_T ');
  }

  onVolver(e: number) {
    this.stepAcuerdo = e;
  }

  pagarAcuerdo(acuerdo: Acuerdo) {
    // console.log(Id);
    // console.log(importe)
    const obj = {
      Items: [],
      TotalPagar: acuerdo.ImportePromesa,
      Cliente: localStorage.getItem('version_core'),
    };
    const cta = {
      id: acuerdo.IdAcuerdo,
      importe: acuerdo.ImportePromesa,
      tipo: 'ANTICIPO',
      cuotas: [],
    };

    obj.Items.push(cta);
    this.preAcuerdo = obj;
    this.stepAcuerdo = this.stepAcuerdo + 1;
  }

  abrirDetalle(idAcuerdo: string): void {
    this.MostrarDetalle = !this.MostrarDetalle;
    this.acuerdosFiltrados.forEach((acu) => {
      if (parseInt(idAcuerdo, 10) !== acu.IdAcuerdo) {
        document
          .getElementById(`acuerdo-${acu.IdAcuerdo}`)
          .classList.remove('active');
      }
    });
    document.getElementById(`acuerdo-${idAcuerdo}`).classList.toggle('active');
  }

  abrirFiltroFecha(): void {
    document.getElementById('select-7420924462').classList.toggle('active');
  }

  seleccionarFiltroFecha(meses: number): void {
    meses === 12
      ? (this.banderaInput = 1)
      : meses === 6
      ? (this.banderaInput = 2)
      : (this.banderaInput = 3);
    const fecha = new Date();
    const setMeses = fecha.getMonth() - meses;
    fecha.setMonth(setMeses);
    this.acuerdosFiltrados = this.Acuerdos.filter((acuerdo) => {
      // acuerdo.FechaGenerada = new Date('2020-01-15T11:40:51.56-03:00');
      const fechaAcuerdo = new Date(acuerdo.FechaGenerada);
      if (fechaAcuerdo > fecha) {
        return acuerdo;
      }
    });
  }
}
