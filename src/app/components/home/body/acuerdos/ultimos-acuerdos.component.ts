import { Component, OnInit, OnDestroy } from '@angular/core';
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
    private getservices: GetService
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

  GenerarPlan(): void{
    // this.router.navigateByUrl('/home/acuerdos');
    alert('GenerarPlan(): en desarrollo |_(-.-)_T ');
  }
}
