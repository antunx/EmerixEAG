import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

/* CUSTOM FORM CONTROL*/
import { UtilidadesModule } from '@component/utilidades/utilidades.module';

/** COMPONENTES */
import { LoginComponent } from './login.component';
import { LoginBodyComponent } from './body/login-body.component';
import { LoginFooterComponent } from './footer/login-footer.component';
import { LoginHeaderComponent } from './header/login-header.component';
import { LoginChatbotComponent } from './login-chatbot/login-chatbot.component';

@NgModule({
  declarations: [
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
    UtilidadesModule
  ]
})
export class LoginModule { }
