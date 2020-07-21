import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GetService } from '@services/get.service';
import { Subscription } from 'rxjs';
import { Comprobante } from '@app/models/comprobante.models';
import { ComunicacionService } from '@app/services/comunicacion.service';

@Component({
  selector: 'app-ultimos-comprobantes',
  templateUrl: './ultimos-comprobantes.component.html',
  styles: [
  ]
})
export class UltimosComprobantesComponent implements OnInit, OnDestroy {

  constructor(
    private translate: TranslateService,
    private router: Router,
    private getservices: GetService) {}

  private subscription: Subscription = new Subscription();
  Comprobantes: Comprobante[];
  ngOnInit(): void{
    this.getComprobantesDetalle();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  getComprobantesDetalle(): void{
    this.subscription.add(this.getservices.getComprobantesDetail(localStorage.getItem('version_core'), 'true').subscribe((res) => {
      if (res.ErrorCode > 0){
        console.log(res.ErrorMessage);
      } else{
        this.Comprobantes = res.Comprobantes;
        // console.log(this.Comprobantes);
      }
    }, (err) => {
        console.log(err);
    }));
  }

  RegistrarPago(): void {
    this.router.navigateByUrl('/home/informar_comprobante');
  }

  VerComprobantes(): void {
    this.router.navigateByUrl('/home/comprobante');
  }
}
