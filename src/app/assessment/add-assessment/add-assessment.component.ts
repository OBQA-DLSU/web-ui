import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-assessment',
  templateUrl: './add-assessment.component.html',
  styles: []
})
export class AddAssessmentComponent implements OnInit {

  constructor() { }
  private formDetails = [
    {
      "inputLabel": "Assessment Name",
      "inputClass": "form-group label-floating col-md-6",
      "inputType": "text"
    },
    {
      "inputLabel": "details here",
      "inputClass": "form-group label-floating col-md-6",
      "inputType": "text"
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
