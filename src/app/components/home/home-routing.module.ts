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
import { PreguntasComponent } from './body/preguntas/preguntas.component';
import { PagarComponent } from './body/pagar/pagar.component';
import { PagoMetodosComponent } from './body/pagar/pago-metodos/pago-metodos.component';
import { TuPerfilComponent } from './body/persona/tu-perfil/tu-perfil.component';
import { GrillaPromesaComponent } from './body/promesa/grilla-promesa/grilla-promesa.component';
import { AcuerdoHistoricoComponent } from './body/acuerdos/acuerdo-historico.component';
import { AcuerdosComponent } from './body/acuerdos/acuerdos.component';
import { PadFirmaComponent } from '../utilidades/pad-firma/pad-firma.component';

const routes: Routes = [
  {path: '', component: HomeComponent,
    children: [
      {path: 'default', component: DefaultComponent, canActivate: [ AuthGeneralGuard ]},

      {path: 'producto', component: ProductoListadoComponent , canActivate: [ AuthGeneralGuard ]},

      {path: 'promesa', component: PromesaComponent, canActivate: [ AuthGeneralGuard ]},
      {path: 'promesa-historica', component: PromesaHistoricaComponent, canActivate: [ AuthGeneralGuard ]},
      {path: 'promesa-detalle', component: PromesaDetalleComponent, canActivate: [ AuthGeneralGuard ]},
      {path: 'promesa-mensaje', component: PromesaMensajeComponent, canActivate: [ AuthGeneralGuard ]},

      {path: 'pagar', component: PagarComponent, canActivate: [ AuthGeneralGuard ]},
      {path: 'metodos-pago', component: PagoMetodosComponent, canActivate: [ AuthGeneralGuard ]},

      {path: 'comprobante', component: ListaComprobanteComponent, canActivate: [ AuthGeneralGuard ]  },
      {path: 'informar_comprobante', component: InformarComprobanteComponent, canActivate: [ AuthGeneralGuard ]},

      {path: 'acuerdo-historico', component: AcuerdoHistoricoComponent, canActivate: [ AuthGeneralGuard ]},
      {path: 'acuerdos', component: AcuerdosComponent, canActivate: [ AuthGeneralGuard ]},

      {path: 'tu_perfil', component: TuPerfilComponent, canActivate: [ AuthGeneralGuard ]},
      {path: 'preguntas', component: PreguntasComponent, canActivate: [ AuthGeneralGuard ]},
      {path: 'grilla', component: GrillaPromesaComponent, canActivate: [AuthGeneralGuard]},
      {path: 'firma', component: PadFirmaComponent, canActivate: [AuthGeneralGuard]},
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
