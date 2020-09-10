import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetService } from '../../../../../services/get.service';
import { RtagetDetailProductModel } from '../../../../../models/rtagetdetailproduct.model';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { RtagetProductPersonModel, Product } from '@app/models/rtagetproductperson.model';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html'
})
export class ProductoDetalleComponent implements OnInit, OnDestroy {

  constructor(private getservices: GetService,
              private translate: TranslateService) {}

  @Input() producto: Product;
  private subscription: Subscription = new Subscription();
  cargando: boolean;
  listaCompleta: RtagetDetailProductModel;
  listaColumnas = [];
  listaFilas = [];

  ngOnInit(): void {
    // console.log('IdProd: ' + this.producto.IdProd);
    this.ObtenerProducto(this.producto.IdProd);
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  ObtenerProducto(id: string): void{
    this.cargando = true;
    this.subscription.add(this.getservices.getProductDetail(id).subscribe((res) => {
      if (res.ErrorCode > 0){
        console.log(res.ErrorMessage);
      } else{
        this.listaCompleta = res;
        this.listaFilas = res.Rows;
        this.listaColumnas = res.Headers;
        this.cargando = false;
        // console.log(res);
      }
    }, (err) => {
      console.log(err);
    }));
  }
  // tiene que tener su propio routing: imports: [RouterModule.forChild(routes)],
  /*this.route.paramMap.subscribe(params => {
    if (params.has('id')) {
      this.getservices.getProductDetail(params.get('id')).subscribe(posts => this.productos2 = posts);
    }
  }, (err) => {
    console.log(err);
  });*/

  // descagamos el libre de deuda
  libreDeuda(id: string, producto: string): void{
    this.subscription.add(this.getservices.getDebtFree(id, 'false').subscribe((res) => {
      pdfMake.createPdf(JSON.parse(res.ComprobanteJSON)).download( this.translate.instant('Traduct.libre_deuda')  + producto + '.pdf');
    }, (err) => {
        console.log(err);
      }
    ));
  }
}
