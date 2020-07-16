import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetService } from '@app/services/get.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-producto-listado',
  templateUrl: './producto-listado.component.html',
  styles: [
  ]
})
export class ProductoListadoComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private getservices: GetService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) { }
  private subscription: Subscription = new Subscription();
  IdPersona = '';
  productos: any[] = [];

  ngOnInit(): void {
    this.IdPersona = localStorage.getItem('id_persona');
    this.ObtenerProductos();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  ObtenerProductos(): void{
    this.subscription.add(this.getservices.getProductPerson(this.IdPersona).subscribe((res) => {
      if (res.ErrorCode > 0){
        console.log(res.ErrorMessage);
      } else{
        this.productos = res.Products;
      // console.log(this.productos);
      }
    }, (err) => {
        console.log(err);
    }));
  }

  // navegamos al detalle de producto
  detalleProducto(id: number): void{
    this.router.navigate(['/producto', id]);
  }

  // descagamos el libre de deuda
  libreDeuda(id: string, producto: string): void{
    this.subscription.add(this.getservices.getDebtFree(id).subscribe((res) => {
      // console.log(res);
      pdfMake.createPdf(JSON.parse(res.ComprobanteJSON)).download( this.translate.instant('Traduct.libre_deuda')  + producto + '.pdf');
    }, (err) => {
        console.log(err);
      }
    ));
  }

  Volver(): void{
    this.router.navigateByUrl('/home');
  }

  removeCommas(numero: string): string {
    return numero.replace(',', '');
  }

  click_fila(): void{
    document.querySelectorAll('.table tr:not(.table-header)').forEach((tr) => {
      tr.addEventListener('click', () => {
        document.querySelector('#invoice-sidebar').classList.add('active');
      });
    });
  }

  CerrarPopup(): void{
    document.querySelector('.overlay .close-btn').addEventListener('click', () => {
      document.querySelector('.overlay').classList.remove('active');
    });
  }
}
