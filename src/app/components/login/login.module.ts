import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

/* CUSTOM FORM CONTROL*/
import { StandardModule } from '../standard/standard.module';

/** COMPONENTES */
import { LoginComponent } from './login.component';
import { ConsultaComponent } from './body/consulta/consulta.component';
import { TerminoComponent } from './body/termino/termino.component';
import { LoginBodyComponent } from './body/login-body.component';
import { LoginFooterComponent } from './footer/login-footer.component';
import { LoginHeaderComponent } from './header/login-header.component';
import { LoginChatbotComponent } from './login-chatbot/login-chatbot.component';

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
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    StandardModule
  ]
})
export class LoginModule { }
