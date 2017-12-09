import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styles: []
})
export class AddClassComponent implements OnInit {

  constructor() { }
  private formDetails = [
    {
      "inputLabel": "Class Name",
      "inputClass": "form-group label-floating col-md-6",
      "inputType": "text"
    },
    {
      "inputLabel": "Room",
      "inputClass": "form-group label-floating col-md-2",
      "inputType": "number"
    },
    {
      "inputLabel": "Description",
      "inputClass": "form-group label-floating col-md-12",
      "inputType": "text"
    }
  ]

  private inputLabel = ['inputLabel'];
  private inputClass = ['inputClass'];
  private inputType = ['inputType'];

  ngOnInit() {
  }

}
