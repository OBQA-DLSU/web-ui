import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { select } from '@angular-redux/store';
import { Subscription } from 'rxjs/Subscription';
import { CourseActionCreator } from '../../store/action-creators/course.actioncreator';
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
  @select(s => s.session.user) user;
  constructor(
    private formBuilder: FormBuilder,
    private courseActionCreator: CourseActionCreator
  ) { }

  ngOnInit() {
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

