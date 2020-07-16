import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GetService } from '@services/get.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-deuda',
  templateUrl: './deuda.component.html'
})
export class DeudaComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private getservices: GetService,
    private translate: TranslateService) { }

  private subscription: Subscription = new Subscription();
  IdPersona = '0';
  Persona = '';
  Monto = 0;
  CantDiasMora = 0;
  CantProductos = 0;

  ngOnInit(): void {
    this.IdPersona = localStorage.getItem('id_persona');
    // console.log(this.IdPersona);
    this.getEstadoDeuda();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  InformarPago(): void {
    this.router.navigateByUrl('/home/informar_comprobante');
  }

  getEstadoDeuda(): void{
    this.subscription.add(this.getservices.getDebtPerson(this.IdPersona).subscribe((res) => {
      if (res.ErrorCode > 0){
        console.log(res.ErrorMessage);
      } else{
      // console.log(res);
      this.Persona = res.FullName;
      this.Monto = res.TotalDebt;
      this.CantDiasMora = res.DaysDebt;
      this.CantProductos = res.CountProductDebt;
      }
    }, (err) => {
        console.log(err);
    }));
  }

  removeCommas(numero: string): string {
    return numero.replace(',', '');
  }
}
