import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styles: []
})
export class ClassListComponent implements OnInit {

  constructor() { }
  private data = [
    {
      "id":"1",
      "class": "CHE",
      "description": "s"
    },
    {
      "id":"2",
      "class": "ELECGE",
      "description": "s"
    },
    {
      "id":"3",
      "class": "FLAS",
      "description": "s"
    }
  ];

  private dataNames = ['id', 'class', 'description'];
  private dataNameAlias = ['ID', 'class', 'Description'];
  ngOnInit() {
  }

}
