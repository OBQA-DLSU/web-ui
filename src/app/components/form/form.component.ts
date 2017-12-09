import { Component, OnInit, Input } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  // tableTitle = "Form Title";
  constructor() { }

  @Input() formTitle: String;
  @Input() numberOfInputs: Array<object>; //Number of input
  @Input() inputLabel: Array<string>; //Label of input
  @Input() inputClass: Array<string>; //Classname of input
  @Input() inputType: Array<string>;  //Type of input

  ngOnInit() {
  }

}
