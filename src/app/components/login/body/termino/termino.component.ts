import { Component, OnInit } from '@angular/core';
import { GetService } from '../../../../services/get.service';

@Component({
  selector: 'app-termino',
  templateUrl: './termino.component.html'
})
export class TerminoComponent implements OnInit {
  titulo = '';
  subTitulo = '';
  parrafo = '';
  items = [];

  constructor( private getservices: GetService) { }

  ngOnInit(): void {
    this.getservices.getPageInfo('TERCOND').subscribe( (res) => {
      // console.log(res);
      this.titulo = res.PageTitle;
      this.parrafo = res.PageParagraph;
      this.subTitulo = res.PageSubTitle;
      this.items = res.Items;
    }, (err) => {
        // console.log(err);
      }
    );
  }
}
