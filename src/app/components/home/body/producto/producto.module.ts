import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/** TRANSLATION */
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoComponent } from './producto.component';
import { ProductoListadoComponent } from './producto-listado/producto-listado.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { HttpClient } from '@angular/common/http';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/terminosIdiomas/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    ProductoRoutingModule,
    TranslateModule.forRoot({ defaultLanguage: 'es',
                              loader: {
                                      provide: TranslateLoader,
                                      useFactory: (createTranslateLoader),
                                      deps: [HttpClient]
                                      }
                            }),
  ],
  declarations: [
    ProductoComponent,
    ProductoListadoComponent,
    ProductoDetalleComponent
  ]
})
export class ProductoModule { }
