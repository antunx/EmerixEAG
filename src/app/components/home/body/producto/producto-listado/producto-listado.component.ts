import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetService } from '@app/services/get.service';
import { Subscription } from 'rxjs';
import { RtagetProductPersonModel, Product } from '@app/models/rtagetproductperson.model';

@Component({
  selector: 'app-producto-listado',
  templateUrl: './producto-listado.component.html',
  styles: [
  ]
})
export class ProductoListadoComponent implements OnInit, OnDestroy {

  constructor(
    private getservices: GetService
  ) { }
  private subscription: Subscription = new Subscription();
  MostrarPopup: boolean;
  IdPersona = '';
  producto: Product;
  productos: Product[] = [];

  ngOnInit(): void {
    this.MostrarPopup = false;
    this.IdPersona = localStorage.getItem('version_core');
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
  detalleProducto(producto: Product): void{
    if (producto !== null){
      // console.log('id: ' + id);
      this.producto  = producto;
      document.querySelectorAll('.table tr:not(.table-header)').forEach((tr) => {
        tr.addEventListener('click', () => {
          this.MostrarPopup = true;
          document.querySelector('#invoice-sidebar').classList.add('active');
        });
      });
    }
  }

  removerComas(numero: string): string {
    if (numero === '' || numero === null) { return numero; }
    return numero.replace(',', '');
  }

  CerrarPopup(): void{
    this.MostrarPopup = false;
    document.querySelector('.overlay .close-btn').addEventListener('click', () => {
      document.querySelector('.overlay').classList.remove('active');
    });
  }
}
