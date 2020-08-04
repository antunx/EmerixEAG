import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetService } from '@app/services/get.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styles: [
  ]
})
export class PreguntasComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  PageTitle = '';
  PageParagraph = '';
  Items = [];
  constructor( private getservices: GetService ) { }

  ngOnInit(): void {
    this.PreguntasFrecuentes();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  PreguntasFrecuentes(): void {
    this.getservices.getPageInfo('PREGFRE').subscribe( (res) => {
      // console.log(res);
      this.PageTitle = res.PageTitle;
      this.PageParagraph = res.PageParagraph;
      this.Items = res.Items;
    }, (err) => {
        // console.log(err);
      }
    );
  }
}
