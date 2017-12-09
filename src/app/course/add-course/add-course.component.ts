import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

declare var $: any;


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html'
})
export class AddCourseComponent implements OnInit {

  // code, name, description => body
  // toBeAssessed, programId => params

  private courseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      code: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      toBeAssessed: [null, Validators.required]
    });
  }

}
