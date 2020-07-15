import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoComponent } from './producto.component';
import { ProductoListadoComponent } from './producto-listado/producto-listado.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';

const routes: Routes = [
  {path: 'producto', component: ProductoComponent,
  children: [
    {path: '', component: ProductoListadoComponent},
    {path: ':id', component: ProductoDetalleComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
