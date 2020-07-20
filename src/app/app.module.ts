import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** INTERCEPTOR */
import { InterceptorService } from './services/interceptor.service';

/** TRANSLATION */
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/** COMPONENTES */
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ConsultaComponent } from './components/login/body/consulta/consulta.component';
import { TerminoComponent } from './components/login/body/termino/termino.component';
import { LoginBodyComponent } from './components/login/body/login-body.component';
import { LoginFooterComponent } from './components/login/footer/login-footer.component';
import { LoginHeaderComponent } from './components/login/header/login-header.component';
import { NotFoundComponent } from './components/standard/not-found/not-found.component';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/terminosIdiomas/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ConsultaComponent,
    TerminoComponent,
    LoginComponent,
    LoginBodyComponent,
    LoginFooterComponent,
    LoginHeaderComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({ defaultLanguage: 'es',
                              loader: {
                                      provide: TranslateLoader,
                                      useFactory: (createTranslateLoader),
                                      deps: [HttpClient]
                                      }
                            }),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
