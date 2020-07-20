import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGeneralGuard } from '@app/guards/auth-general.guard';

import { DefaultComponent } from './default.component';
import { HomeComponent } from './home.component';
import { ListaComprobanteComponent } from './body/pago/comprobante/lista-comprobante.component';
import { InformarComprobanteComponent } from './body/pago/comprobante/informar-comprobante.component';

import { ProductoListadoComponent } from './body/producto/producto-listado/producto-listado.component';

import { PromesaComponent } from './body/promesa/promesa.component';
import { PromesaHistoricaComponent } from './body/promesa/promesa-historica.component';
import { PromesaMensajeComponent } from './body/promesa/promesa-mensaje/promesa-mensaje.component';
import { PromesaDetalleComponent } from './body/promesa/promesa-detalle/promesa-detalle.component';

const routes: Routes = [
  {path: '', component: HomeComponent,
    children: [
      {path: 'default', component: DefaultComponent, canActivateChild: [ AuthGeneralGuard ]},

      {path: 'promesa', component: PromesaComponent, canActivate: [ AuthGeneralGuard ]},
      {path: 'promesa-historica', component: PromesaHistoricaComponent, canActivate: [ AuthGeneralGuard ]},
      {path: 'promesa-detalle', component: PromesaDetalleComponent, canActivate: [ AuthGeneralGuard ]},
      {path: 'promesa-mensaje', component: PromesaMensajeComponent, canActivate: [ AuthGeneralGuard ]},

      {path: 'producto', component: ProductoListadoComponent},

      {path: 'comprobante', component: ListaComprobanteComponent, canActivate: [ AuthGeneralGuard ]  },
      {path: 'informar_comprobante', component: InformarComprobanteComponent, canActivate: [ AuthGeneralGuard ]  },
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
