import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** TRANSLATION */
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

/** COMPONENTES */
import { NotFoundComponent } from './not-found/not-found.component';
import { ComboBoxComponent } from './utilidades/combo-box.component';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/terminosIdiomas/', '.json');
}

@NgModule({
  declarations: [NotFoundComponent, ComboBoxComponent],
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    TranslateModule,
    NotFoundComponent,
    ComboBoxComponent
  ],
})
export class StandardModule { }
