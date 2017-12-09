import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-add-sopi',
  templateUrl: './add-sopi.component.html'
})
export class AddSopiComponent implements OnInit {

  constructor() { }
  private formDetails = [
    {
      "inputLabel": "SOPI",
      "inputClass": "form-group label-floating col-md-3",
      "inputType": "number"
    },
    {
      "inputLabel": "Description",
      "inputClass": "form-group label-floating col-md-9",
      "inputType": "text"
    }
  ]

  private inputLabel = ['inputLabel'];
  private inputClass = ['inputClass'];
  private inputType = ['inputType'];

  ngOnInit() {
  }

}
