import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetService } from '@app/services/get.service';
import { Subscription } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

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
  ItemsOriginal = [];
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
      this.ItemsOriginal = res.Items;
    }, (err) => {
        // console.log(err);
      }
    );
  }

  Desplegar(): void{
    const accordion = document.querySelector('#accordion-7530753671');
    const items = accordion.querySelectorAll('li');

    accordion.querySelectorAll('.accordion-title > a').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        items.forEach((item) => item.classList.remove('active'));
        trigger.closest('li').classList.add('active');
      });
    });
  }

  Buscar(strBuscar: string): void{
    if (strBuscar === '') {
      this.Items = this.ItemsOriginal;
    } else{
      this.Items = this.ItemsOriginal.filter(
        item =>
        item.ItemTitle.toLowerCase().indexOf(strBuscar.toLowerCase()) > -1
        ||
        item.ItemParagraph.toLowerCase().indexOf(strBuscar.toLowerCase()) > -1);
    }
  }

  Foco(): void{
    this.Desplegar();
  }
}
