import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { select } from '@angular-redux/store';
import { Subscription } from 'rxjs/Subscription';
import {
  CourseActionCreator,
  MiscActionCreator
} from '../../store/action-creators';
import { WEB_API_URL } from '../../config/web-api-address';
declare var $: any;


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html'
})

export class AddCourseComponent implements OnInit, OnDestroy {

  // code, name, description => body
  // toBeAssessed, programId => params
  
  private userSubscription: Subscription = null;
  private programId: number = 5;
  private courseForm: FormGroup;
  private uploadUrl: string = `${WEB_API_URL}/api/course/bulk/${this.programId}`;
  @select(s => s.session.user) user;
  @select(s => s.courses.spinner) spinner;
  constructor(
    private formBuilder: FormBuilder,
    private courseActionCreator: CourseActionCreator,
    private miscActionCreator: MiscActionCreator
  ) { }

  ngOnInit() {
    this.miscActionCreator.UpdatePageTitle('Add Course');
    this.courseForm = this.formBuilder.group({
      code: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      toBeAssessed: [true]
    });
    this.userSubscription = this.user.subscribe(
      result => {
        
      }
    );
  }

  ngOnDestroy() {
    (this.userSubscription)? this.userSubscription.unsubscribe() : null; 
  }

  submit (event) {
    if (this.courseForm.valid) {
      this.courseActionCreator.CreateCourse(this.courseForm.value, this.programId);
    }
  }
}

