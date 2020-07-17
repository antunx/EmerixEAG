import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComprobanteComponent } from './body/pago/comprobante/lista-comprobante.component';
import { InformarComprobanteComponent } from './body/pago/comprobante/informar-comprobante.component';
import { AuthGeneralGuard } from '@app/guards/auth-general.guard';
import { HomeComponent } from './home.component';
import { DefaultComponent } from './default.component';
import { ProductoListadoComponent } from './body/producto/producto-listado/producto-listado.component';
import { PromesaComponent } from './body/promesa/promesa.component';
import { PromesaHistoricaComponent } from './body/promesa/promesa-historica.component';
import { PromesaMensajeComponent } from './body/promesa/promesa-mensaje/promesa-mensaje.component';
import { PromesaDetalleComponent } from './body/promesa/promesa-detalle/promesa-detalle.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent,
    children: [
      {path: '', component: DefaultComponent, canActivate: [ AuthGeneralGuard ]},

      {path: 'promesa', component: PromesaComponent, canActivate: [ AuthGeneralGuard ]},
      {path: 'promesa-historica', component: PromesaHistoricaComponent, canActivate: [ AuthGeneralGuard ]},
      {path: 'promesa-detalle', component: PromesaDetalleComponent, canActivate: [ AuthGeneralGuard ]},
      {path: 'promesa-mensaje', component: PromesaMensajeComponent, canActivate: [ AuthGeneralGuard ]},

      {path: 'producto', component: ProductoListadoComponent},

      {path: 'lista_comprobante', component: ListaComprobanteComponent, canActivate: [ AuthGeneralGuard ]  },
      {path: 'informar_comprobante', component: InformarComprobanteComponent, canActivate: [ AuthGeneralGuard ]  },
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
