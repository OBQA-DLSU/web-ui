import { Component, OnInit, ElementRef } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-sopi-list',
  templateUrl: './sopi-list.component.html'
})
export class SopiListComponent implements OnInit {

  constructor() { }
  private data = [
    {
      "id":"69",
      "SOPICode": "A1",
      "description": "sasd2222fasdfasdfasdfasdf"
    },
    {
      "id":"69",
      "SOPICode": "A2",
      "description": "s"
    },
    {
      "id":"69",
      "SOPICode": "C3",
      "description": "s"
    },
    {
      "id":"69",
      "SOPICode": "D1",
      "description": "s"
    },
    {
      "id":"69",
      "SOPICode": "F1",
      "description": "s"
    }
  ];

  private dataNames = ['id', 'SOPICode', 'description'];
  private dataNameAlias = ['ID', 'SOPI Code', 'Description'];
  ngOnInit() {
  }

}
