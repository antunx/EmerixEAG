import { Component, OnInit } from '@angular/core';
import { GetService } from '../../../services/get.service';
import { Item } from '@app/models/rtagetpageinfo.model';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
})
export class ConsultaComponent implements OnInit {
  PageTitle = '';
  PageParagraph = '';
  items: Item[];
  constructor(private getservices: GetService) {}

  ngOnInit(): void {
    this.getservices.getPageInfo('PBLING').subscribe(
      (res) => {
        // console.log(res);
        this.PageTitle = res.PageTitle;
        this.PageParagraph = res.PageParagraph;
        this.items = res.Items;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
