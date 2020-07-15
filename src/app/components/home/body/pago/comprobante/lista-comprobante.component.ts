import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GetService } from '@services/get.service';
import { Comprobante } from '@app/models/comprobante.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-comprobante',
  templateUrl: './lista-comprobante.component.html',
  styles: [
  ]
})
export class ListaComprobanteComponent implements OnInit, OnDestroy {
  constructor(
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
    this.subscription.add(this.getservices.getComprobantesDetail(localStorage.getItem('id_persona')).subscribe((res) => {
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

  Volver(): void{
    this.router.navigateByUrl('/home/informar_comprobante');
  }
}
