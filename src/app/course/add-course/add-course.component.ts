import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { WEB_API_URL } from '../../config/web-api-address';

declare var $: any;


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html'
})

export class AddCourseComponent implements OnInit {

  // code, name, description => body
  // toBeAssessed, programId => params
  private programId: number = 5;
  private courseForm: FormGroup;
  private uploadUrl: string = `${WEB_API_URL}/api/course/bulk/${this.programId}`;

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
