import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { GetService } from '@app/services/get.service';

@Component({
  selector: 'app-campania-especial',
  templateUrl: './campania-especial.component.html',
  styles: [
  ]
})
export class CampaniaEspecialComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  ExisteAcuerdo: boolean;
  Mensaje: string;
  IdTipoAcuerdo: number;
  IdPersona = '';

  constructor(private router: Router,
              private getservices: GetService) { }

  ngOnInit(): void {
    this.IdPersona = localStorage.getItem('version_core');
    this.obtenerCampania();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  obtenerCampania(): void{
    this.subscription.add(this.getservices.getMensajeCampaniaEspecial(this.IdPersona).subscribe((res) => {
      if (res.ErrorCode > 0){
        console.log(res.ErrorMessage);
      } else{
        this.ExisteAcuerdo = res.ExisteAcuerdo;
        if (res.ExisteAcuerdo){
          this.Mensaje = res.MensajeSiAcuerdo;
          this.IdTipoAcuerdo = res.IdTipoAcuerdo;
        }else{
          this.Mensaje = res.MensajeNoAcuerdo;
          this.IdTipoAcuerdo = 0;
        }
      }
    }, (err) => {
        console.log(err);
    }));
  }

  VerPlan(): void {
    this.router.navigate(['/home/acuerdos']);
  }
}