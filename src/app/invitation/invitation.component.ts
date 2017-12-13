import { Component, OnInit } from '@angular/core';
import { FieldConfig } from './../obqa-forms/models/field-config.interface';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html'
})
export class InvitationComponent implements OnInit {

  constructor() { }
  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Email',
      class: 'col-md-6 form-control',
      name: 'assessment',
      placeholder: '',
      validation: [Validators.required, Validators.minLength(4)]
    },
    {
      type: 'input',
      label: 'Description',
      class: 'col-md-6 form-control',
      name: 'description',
      placeholder: '',
      validation: [Validators.required, Validators.minLength(10)]
    },
    {
      type: 'select',
      label: 'Favourite Food',
      class: 'btn btn-primary col-md-3 dropdown-toggle',
      name: 'food',
      options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      placeholder: 'Select an option',
      validation: [Validators.required]
    },
    {
      label: 'Submit',
      class: 'btn btn-primary col-md-3',
      name: 'submit',
      type: 'button'
    }
  ];
  ngOnInit() {
  }

}
