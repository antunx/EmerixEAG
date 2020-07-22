import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetService } from '@app/services/get.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { PromesaDetalle } from '@app/models/promesdetalle.model';
import { PropService } from '@app/services/prop.service';

@Component({
  selector: 'app-promesa-ultima',
  templateUrl: './promesa-ultima.component.html',
  styles: [],
})
export class PromesaUltimaComponent implements OnInit, OnDestroy {
  persona: string;
  promesas: any;
  private subs: Subscription;

  constructor(
    private router: Router,
    private getService: GetService,
    private Traduct: TranslateService,
    private propServices: PropService
  ) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.persona = localStorage.getItem('version_core');
    this.subs = this.getService
      .getPromesaPago(this.persona, 'true')
      .subscribe((data) => {
        // console.log(data['Promesas']);
        this.promesas = data.Promesas;
      });
  }

  IrPromesa(): void {
    this.router.navigateByUrl('/home/promesa');
  }

  IrPromesaHistorica(): void {
    this.router.navigateByUrl('/home/promesa-historica');
  }

  iradetalle(item: PromesaDetalle): void {
    // console.log(item);
    this.propServices.setDetalle(item, true);
    this.router.navigateByUrl('home/promesa-detalle');
  }

  removeCommas(numero: string): string {
    if (numero === '' || numero === null) {
      return numero;
    }
    return numero.replace(',', '');
  }
}
