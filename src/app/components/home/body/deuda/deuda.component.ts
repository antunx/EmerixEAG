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
  IdPersona = '';
  Persona = '';
  Monto = 0;
  Entero = 0;
  Decimal = '';
  CantDiasMora = 0;
  CantProductos = 0;

  ngOnInit(): void {
    this.IdPersona = localStorage.getItem('version_core');
    // console.log(this.IdPersona);
    this.getEstadoDeuda();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  Redireccionar(destino: string): void {
    if (destino === 'PAG'){
      this.router.navigateByUrl('/home/pagar');
    }else{
      this.router.navigateByUrl('/home/producto');
    }
  }

  getEstadoDeuda(): void{
    this.subscription.add(this.getservices.getDebtPerson(this.IdPersona).subscribe((res) => {
      if (res.ErrorCode > 0){
        console.log(res.ErrorMessage);
      } else{
      // console.log(res);
      this.Persona = res.FullName;
      this.Monto = res.TotalDebt;
      this.Entero = Math.trunc(this.Monto);
      this.Decimal = Number((this.Monto-this.Entero).toFixed(2)).toString().replace('0.','');
      this.CantDiasMora = res.DaysDebt;
      this.CantProductos = res.CountProductDebt;      
      }
    }, (err) => {
        console.log(err);
    }));
  }

  removerComas(numero: string): string {
    if (numero === '' || numero === null) { return numero; }
    return numero.replace(',', '');
  }
}
