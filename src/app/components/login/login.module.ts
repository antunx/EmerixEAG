import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/** TRANSLATION */
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/** COMPONENTES */
import { LoginComponent } from './login.component';
import { ConsultaComponent } from './body/consulta/consulta.component';
import { TerminoComponent } from './body/termino/termino.component';
import { LoginBodyComponent } from './body/login-body.component';
import { LoginFooterComponent } from './footer/login-footer.component';
import { LoginHeaderComponent } from './header/login-header.component';
import { LoginChatbotComponent } from './login-chatbot/login-chatbot.component';
import { HttpClient } from '@angular/common/http';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/terminosIdiomas/', '.json');
}

@NgModule({
  declarations: [
    ConsultaComponent,
    TerminoComponent,
    LoginComponent,
    LoginBodyComponent,
    LoginFooterComponent,
    LoginHeaderComponent,
    LoginChatbotComponent
  ],
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ]
})
export class LoginModule { }
