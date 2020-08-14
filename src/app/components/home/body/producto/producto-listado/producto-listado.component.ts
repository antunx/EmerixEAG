import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetService } from '@app/services/get.service';
import { Subscription } from 'rxjs';
import { Product } from '@app/models/rtagetproductperson.model';

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

  // Navegamos al detalle de producto
   detalleProducto(producto: Product): void{
    if (producto !== null){
      // console.log('id: ' + producto.IdProd);
      this.producto  = producto;
      const overlay = document.querySelector('#home-sidebar');

      document.querySelectorAll('#products-table tr').forEach((tr) => {
        tr.addEventListener('click', () => {
          this.MostrarPopup = true;
          overlay.classList.add('active');
        });
      });
    }
  }
  // Cerramos el popup detalle de producto
  CerrarPopup(): void{
    this.MostrarPopup = false;
    const overlay = document.querySelector('#home-sidebar');
    overlay.querySelector('.close-btn').addEventListener('click', () => {
        overlay.classList.remove('active');
      });
  }

  CargarImagen(imagen: string): string{
    return 'assets/images/ui/tables/' + imagen.toLowerCase( ) + '.svg';
  }

  removerComas(numero: string): string {
    if (numero === '' || numero === null) { return numero; }
    return numero.replace(',', '');
  }
}
