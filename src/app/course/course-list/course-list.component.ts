import { Component, OnInit, ElementRef } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html'
})
export class CourseListComponent implements OnInit {

  private data = [
    {
      "id":"69",
      "code": "INOPER1",
      "name": "Inoper sample name",
      "description": "sasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf"
    },
    {
      "id":"69",
      "code": "INOPER1",
      "name": "Inoper sample name",
      "description": "s"
    },
    {
      "id":"69",
      "code": "INOPER1",
      "name": "Inoper sample name",
      "description": "s"
    },
    {
      "id":"69",
      "code": "INOPER1",
      "name": "Inoper sample name",
      "description": "s"
    },
    {
      "id":"69",
      "code": "INOPER1",
      "name": "Inoper sample name",
      "description": "s"
    }
  ];

  private dataNames = ['id', 'code', 'name', 'description', 'toBeAssessed'];
  private dataNameAlias = ['ID', 'Code', 'Name', 'Description', 'To Be Assessed?'];

  ngOnInit () {
    
  }

}
