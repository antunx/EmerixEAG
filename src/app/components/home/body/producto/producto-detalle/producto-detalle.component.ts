import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetService } from '../../../../../services/get.service';
import { RtagetDetailProductModel } from '../../../../../models/rtagetdetailproduct.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html'
})
export class ProductoDetalleComponent implements OnInit, OnDestroy {

  constructor(private router: Router,
              private getservices: GetService,
              private route: ActivatedRoute) { }
  private subscription: Subscription = new Subscription();
  cargando: boolean;
  listaCompleta: RtagetDetailProductModel;
  listaColumnas = [];
  listaFilas = [];

  ngOnInit(): void {
    this.ObtenerProducto(this.route.snapshot.paramMap.get('id'));
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

  Volver(): void{
    this.router.navigateByUrl('/producto');
  }
}
