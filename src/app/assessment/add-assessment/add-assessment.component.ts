import { Component, OnInit } from '@angular/core';
import { FieldConfig } from './../../obqa-forms/models/field-config.interface';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-assessment',
  templateUrl: './add-assessment.component.html',
  styles: []
})
export class AddAssessmentComponent implements OnInit {

  constructor() { }
  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Assessment',
      name: 'assessment',
      placeholder: '',
      validation: [Validators.required, Validators.minLength(4)]
    },
    {
      type: 'input',
      label: 'Description',
      name: 'description',
      placeholder: '',
      validation: [Validators.required, Validators.minLength(10)]
    },
    {
      type: 'select',
      label: 'Favourite Food',
      name: 'food',
      options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      placeholder: 'Select an option',
      validation: [Validators.required]
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button'
    }
  ];
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
