import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/** TRANSLATION */
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

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
import { InputDateComponent } from './utilidades/input-date.component';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/terminosIdiomas/', '.json');
}

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
    InputDateComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HomeRoutingModule,
    TranslateModule.forRoot({ defaultLanguage: 'es',
                              loader: {
                                      provide: TranslateLoader,
                                      useFactory: (createTranslateLoader),
                                      deps: [HttpClient]
                                      }
                            })
  ],
  exports: [
    InputDateComponent
  ],
  providers: [
    {
      provide: DatePipe
    }
  ],
})
export class HomeModule { }
