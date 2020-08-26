import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetService } from '@app/services/get.service';
import { Acuerdo } from '@app/models/acuerdo.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ultimos-acuerdos',
  templateUrl: './ultimos-acuerdos.component.html',
  styles: [
  ]
})
export class UltimosAcuerdosComponent implements OnInit, OnDestroy {

  constructor(
    private getservices: GetService,
    private router: Router,
  ) { }

  private subscription: Subscription = new Subscription();
  Acuerdos: Acuerdo[];
  ngOnInit(): void {
    this.getUltimosAcuerdos();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  getUltimosAcuerdos(): void{
    this.subscription.add(this.getservices.getAcuerdos(localStorage.getItem('version_core'), 'true').subscribe((res) => {
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

  VerAcuerdos(): void{
    this.router.navigateByUrl('/home/acuerdo-historico');
  }

  OtroEstado(acuerdo: Acuerdo): boolean{
    if (acuerdo.EstadoCodigo === 'PENDIANT' || acuerdo.EstadoCodigo === 'VIGENTE'
     || acuerdo.EstadoCodigo === 'CUMPLIDO' || acuerdo.EstadoCodigo === 'CAIDO'
     || acuerdo.EstadoCodigo === 'ANTVENCI'){
      return false;
    }else {
      return true;
    }
  }
}
