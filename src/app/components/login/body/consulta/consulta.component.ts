import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GetService } from '../../../../services/get.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html'
})
export class ConsultaComponent implements OnInit {
  PageTitle = '';
  PageParagraph = '';

  constructor( private getservices: GetService) { }

  ngOnInit(): void {
    this.getservices.getPageInfo('PBLING').subscribe( (res) => {
      // console.log(res);
      this.PageTitle = res.PageTitle;
      this.PageParagraph = res.PageParagraph;
    }, (err) => {
        // console.log(err);
      }
    );
  }
}
