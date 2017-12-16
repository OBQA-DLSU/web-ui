import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assessment-list',
  templateUrl: './assessment-list.component.html',
  styles: []
})
export class AssessmentListComponent implements OnInit {

  constructor() { }
  private data = [
    {
      "id":"1",
      "assessment": "Dummy Assessment 1",
      "description": "Dummy Assessment description 1"
    },
    {
      "id":"2",
      "assessment": "Dummy Assessment 1",
      "description": "Dummy Assessment description 1"
    },
    {
      "id":"3",
      "assessment": "Dummy Assessment 1",
      "description": "Dummy Assessment description 1"
    }
  ];

  private dataNames = ['id', 'assessment', 'description'];
  private dataNameAlias = ['ID', 'Assessment', 'Description'];

  ngOnInit() {
  }

}
