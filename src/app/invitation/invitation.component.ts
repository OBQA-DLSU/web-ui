import { Component, OnInit } from '@angular/core';
import { FieldConfig } from './../obqa-forms/models/field-config.interface';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styles: []
})
export class InvitationComponent implements OnInit {

  constructor() { }
  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Assessment',
      class: 'col-lg-1',
      name: 'assessment',
      placeholder: '',
      validation: [Validators.required, Validators.minLength(4)]
    },
    {
      type: 'input',
      label: 'Description',
      class: 'col-lg-1',
      name: 'description',
      placeholder: '',
      validation: [Validators.required, Validators.minLength(10)]
    },
    {
      type: 'select',
      label: 'Favourite Food',
      class: 'col-lg-1',
      name: 'food',
      options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      placeholder: 'Select an option',
      validation: [Validators.required]
    },
    {
      label: 'Submit',
      class: 'col-md-1',
      name: 'submit',
      type: 'button'
    }
  ];
  ngOnInit() {
  }

}
