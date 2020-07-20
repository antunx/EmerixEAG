import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetService } from '@app/services/get.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-promesa-historica',
  templateUrl: './promesa-historica.component.html',
  styles: [],
})
export class PromesaHistoricaComponent implements OnInit, OnDestroy {
  promesas = [];
  p = 1;
  private sub: Subscription;

  constructor(private getServices: GetService, private router: Router) {}

  sortData(): any {
    return this.promesas.sort((a, b) => {
      return (new Date(b.date) as any) - (new Date(a.date) as any);
    });
  }

  ngOnInit(): void {
    this.sub = this.getServices
      .getPromesaPago(localStorage.getItem('version_core'), false)
      .subscribe((res) => {
        this.promesas = res.Promesas;
        this.promesas = this.sortData();
        console.log(this.promesas);
      });
  }

  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }

  iradetalle(item: any): void{
    console.log(item);
    this.getServices.setDetalle(item);
    this.router.navigateByUrl('home/promesa-detalle');
  }
}
