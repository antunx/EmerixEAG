import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetService } from '@app/services/get.service';
import { Acuerdo } from '@app/models/acuerdo.models';

@Component({
  selector: 'app-ultimos-acuerdos',
  templateUrl: './ultimos-acuerdos.component.html',
  styles: [
  ]
})
export class UltimosAcuerdosComponent implements OnInit, OnDestroy {

  constructor(
    private translate: TranslateService,
    private router: Router,
    private getservices: GetService
  ) { }

  private subscription: Subscription = new Subscription();
  Acuerdos: Acuerdo[];
  ngOnInit(): void {
    // this.getUltimosAcuerdos();
    const dateobj =  new Date('October 13, 2020 05:35:32');
    this.Acuerdos = [{
      IdPersona: '1',
      IdCuenta: '1',
      NumeroAcuerdo: '1',
      Tipo: 'TC VISA 5400',
      Descripcion: 'Refinanciación 12',
      Estado: 'ESPERA',
      IdMoneda: 1,
      Importe: 1,
      Fecha: dateobj,
      IdMedioPago: 1,
      Comentario: '1',
      IdAcuerdo: 1,
      MedioPago: '1',
      Moneda: '1',
    },
    {
      IdPersona: '1',
      IdCuenta: '2',
      NumeroAcuerdo: '2',
      Tipo: 'Préstamo personal',
      Descripcion: 'Acuerdo verbal',
      Estado: 'APROBADO',
      IdMoneda: 1,
      Importe: 1,
      Fecha: dateobj,
      IdMedioPago: 1,
      Comentario: '1',
      IdAcuerdo: 1,
      MedioPago: '1',
      Moneda: '1',
    },
    {
      IdPersona: '1',
      IdCuenta: '3',
      NumeroAcuerdo: '3',
      Tipo: 'TC MASTER 2431',
      Descripcion: 'Plan 12 cuotas',
      Estado: 'RECHAZADO',
      IdMoneda: 1,
      Importe: 1,
      Fecha: dateobj,
      IdMedioPago: 1,
      Comentario: '1',
      IdAcuerdo: 1,
      MedioPago: '1',
      Moneda: '1',
    }];
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  getUltimosAcuerdos(): void{
    this.subscription.add(this.getservices.getUltimosAcuerdos(localStorage.getItem('version_core'), 'true').subscribe((res) => {
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

  GenerarPlan(): void{
    // this.router.navigateByUrl('/home/acuerdos');
    alert('GenerarPlan(): en desarrollo |_(-.-)_T ');
  }
}
