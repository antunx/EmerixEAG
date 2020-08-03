import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { GetService } from '@services/get.service';
import { AuthService } from '@app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-chatbot',
  templateUrl: './login-chatbot.component.html',
  styles: [
  ]
})
export class LoginChatbotComponent implements OnInit, OnDestroy {
  versionWeb = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private getservices: GetService,
              private authService: AuthService,
              private translate: TranslateService
              ) { }

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.versionWeb = this.route.snapshot.params.versionWeb;
    this.subscription.add(this.getservices.getChatBotJwt(this.versionWeb).subscribe( (res) => {
      // console.log(res);
      if (res.IsValid){
        // localStorage.setItem('token', res.Jwt );
        this.authService.login(res.Jwt);
        localStorage.setItem('version_core', res.Person );
        localStorage.setItem('Cliente', res.Name);
        this.router.navigateByUrl('/home/default');
      }else {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      }
    }, (err) => {
        console.log(err);
        this.router.navigateByUrl('/login');
      }
    ));
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
