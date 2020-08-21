import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* CUSTOM FORM CONTROL*/
import { UtilidadesModule } from '../utilidades/utilidades.module';

/* ROUTING */
import { HomeRoutingModule } from './home-routing.module';

/* COMPONENTES */
import { DefaultComponent } from './default.component';
import { HomeComponent } from './home.component';
import { DeudaComponent } from './body/deuda/deuda.component';
import { PersonaComponent } from './body/persona/persona.component';
import { InformarComprobanteComponent } from './body/pago/comprobante/informar-comprobante.component';
import { ListaComprobanteComponent } from './body/pago/comprobante/lista-comprobante.component';

import { TopbarComponent } from './topbar/topbar.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { ProductoListadoComponent } from './body/producto/producto-listado/producto-listado.component';
import { ProductoDetalleComponent } from './body/producto/producto-detalle/producto-detalle.component';

import { PromesaHistoricaComponent } from './body/promesa/promesa-historica.component';
import { PromesaUltimaComponent } from './body/promesa/promesa-ultima.component';
import { PromesaComponent } from './body/promesa/promesa.component';
import { PromesaMensajeComponent } from './body/promesa/promesa-mensaje/promesa-mensaje.component';
import { PromesaDetalleComponent } from './body/promesa/promesa-detalle/promesa-detalle.component';
import { PreguntasComponent } from './body/preguntas/preguntas.component';
import { UltimosComprobantesComponent } from './body/pago/comprobante/ultimos-comprobantes.component';
// import { InputDateComponent } from './utilidades/input-date.component';

import { PagarComponent } from './body/pagar/pagar.component';
import { DetallePlanpagoComponent } from './body/pagar/detalle-planpago/detalle-planpago.component';
import { ConfirmarPagoComponent } from './body/pagar/confirmar-pago/confirmar-pago.component';
import { PagoMetodosComponent } from './body/pagar/pago-metodos/pago-metodos.component';
import { NotificacionesComponent } from './body/notificaciones/notificaciones/notificaciones.component';
import { TuPerfilComponent } from './body/persona/tu-perfil/tu-perfil.component';
import { MensajeMpComponent } from './body/pagar/mercado_pago/mensaje-mp.component';
import { NotificacionMpComponent } from './body/pagar/mercado_pago/notificacion-mp/notificacion-mp.component';
import { GrillaPromesaComponent } from './body/promesa/grilla-promesa/grilla-promesa.component';
import { MontoPromesaComponent } from './body/promesa/monto-promesa/monto-promesa.component';
import { PromesaExitoComponent } from './body/promesa/promesa-exito/promesa-exito.component';
import { GrillaPagoComponent } from './body/pagar/grilla-pago/grilla-pago.component';
import { MontoPagoComponent } from './body/pagar/monto-pago/monto-pago.component';
import { EstadoPagoComponent } from './body/pagar/estado-pago/estado-pago.component';

@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    DeudaComponent,
    PersonaComponent,
    InformarComprobanteComponent,
    ListaComprobanteComponent,

    TopbarComponent,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,

    ProductoListadoComponent,
    ProductoDetalleComponent,

    PromesaHistoricaComponent,
    PromesaUltimaComponent,
    PromesaComponent,
    PromesaMensajeComponent,
    PromesaDetalleComponent,
    PreguntasComponent,
    UltimosComprobantesComponent,
    // InputDateComponent,

    PagarComponent,
    DetallePlanpagoComponent,
    ConfirmarPagoComponent,
    PagoMetodosComponent,
    NotificacionesComponent,
    TuPerfilComponent,
    MensajeMpComponent,
    NotificacionMpComponent,
    GrillaPromesaComponent,
    MontoPromesaComponent,
    PromesaExitoComponent,
    GrillaPagoComponent,
    MontoPagoComponent,
    EstadoPagoComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HomeRoutingModule,
    UtilidadesModule
  ],
  exports: [
  ],
  providers: [
    {
      provide: DatePipe
    }
  ],
})
export class HomeModule { }
