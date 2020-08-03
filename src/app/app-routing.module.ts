import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/standard/not-found/not-found.component';
import { LoginChatbotComponent } from './components/login-chatbot/login-chatbot.component';

const routes: Routes = [
  {
    path: 'home', loadChildren: () =>
      import('./components/home/home.module').then(m => m.HomeModule)
  },

  { path: 'login', component: LoginComponent },
  { path: 'loginchatbot/:versionWeb', component: LoginChatbotComponent },
  { path: '', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
