import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetService } from '@app/services/get.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-promesa-ultima',
  templateUrl: './promesa-ultima.component.html',
  styles: [],
})
export class PromesaUltimaComponent implements OnInit, OnDestroy {
  persona: string;
  promesas: any;
  private subs: Subscription;

  constructor(private router: Router, private getService: GetService) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.persona = localStorage.getItem('version_core');
    this.subs = this.getService
      .getPromesaPago(this.persona, 'true')
      .subscribe((data) => {
        // console.log(data['Promesas']);
        this.promesas = data.Promesas;
      });
  }

  IrPromesa(): void {
    this.router.navigateByUrl('/home/promesa');
  }

  IrPromesaHistorica(): void {
    this.router.navigateByUrl('/home/promesa-historica');
  }
}
