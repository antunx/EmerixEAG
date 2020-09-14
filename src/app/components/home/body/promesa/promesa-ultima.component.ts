import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetService } from '@app/services/get.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { PromesaDetalle } from '@app/models/promesdetalle.model';
import { PropService } from '@app/services/prop.service';
import { pagoGen } from '@app/models/pagogen.models';
import { Promesa } from '@app/models/getPromesaPago.model';

@Component({
  selector: 'app-promesa-ultima',
  templateUrl: './promesa-ultima.component.html',
  styles: [],
})
export class PromesaUltimaComponent implements OnInit, OnDestroy {
  persona: string;
  promesas: Promesa[];
  private subs: Subscription;
  @Output() pagoGen = new EventEmitter<pagoGen>();
  @Output() stepPago = new EventEmitter<number>();

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
        /*console.log(
          new Date(data.Promesas[0].PromesaFecha)
            .toLocaleString('default', {
              month: 'short',
            })
            .toUpperCase()
            .slice(0, 3)
        );
        console.log(new Date(data.Promesas[0].PromesaFecha).getDate());*/
        // data.Promesas[0].Estado = 'Quebrada';
        data.Promesas.forEach((promesa) => {
          promesa.mes = new Date(promesa.PromesaFecha)
            .toLocaleString('default', {
              month: 'short',
            })
            .toUpperCase()
            .slice(0, 3);
          promesa.dia = new Date(promesa.PromesaFecha).getDate();
        });
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

  removerComas(numero: string): string {
    if (numero === '' || numero === null) {
      return numero;
    }
    return numero.replace(',', '');
  }

  pagarPromesa(Id: string, Importe: string): void{
    // console.log(Id, Importe);

    const cuentas = [];
    const cta = {
      id: Id,
      importe: Importe,
      tipo: 'PROMESA',
      cuotas: [],
    };

    cuentas.push(cta);

    const obj = {
      Items: cuentas,
      TotalPagar: JSON.parse(Importe),
      Cliente: localStorage.getItem('version_core')
    };

    // console.log(JSON.stringify(obj));
    this.stepPago.emit(1);
    this.pagoGen.emit(obj);

  }
}
