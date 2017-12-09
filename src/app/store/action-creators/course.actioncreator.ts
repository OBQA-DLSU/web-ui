import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { CourseService } from '../../services/course.service';
import { IAppState } from '../app.store';
import { ICourse } from '../../interfaces/course/course.interface';
import {
  COURSE_CREATE_ATTEMPT,
  COURSE_CREATE_FAILED,
  COURSE_CREATE_FULFILLED,
  COURSE_GET_ATTEMPT,
  COURSE_GET_FAILED,
  COURSE_GET_FULFILLED,
  COURSE_UPDATE_ATTEMPT,
  COURSE_UPDATE_FAILED,
  COURSE_UPDATE_FULFILLED
} from '../action/course.actions';

@Injectable()

export class CourseActionCreator implements OnDestroy {

  private createCourseSubscription: Subscription;
  private getCourseSubscription: Subscription;
  private updateCourseSubscription: Subscription;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private courseService: CourseService
  ) {}

  ngOnDestroy () {
    (this.createCourseSubscription) ? this.createCourseSubscription.unsubscribe() : null;
    (this.getCourseSubscription) ? this.getCourseSubscription.unsubscribe() : null;
    (this.updateCourseSubscription) ? this.updateCourseSubscription.unsubscribe() : null;
  }
  
  CreateCourse (course: ICourse, programId: number) {
    this.createCourseSubscription = this.courseService.CreateCourse(programId, course)
    .subscribe(
      (course: ICourse) => {
        this.ngRedux.dispatch({type: COURSE_CREATE_FULFILLED, payload: course});
      }, err => {
        console.log(err);
        this.ngRedux.dispatch({type: COURSE_CREATE_FAILED, payload: err});
      }
    );
  }

  GetCourse (programId: number) {
    this.getCourseSubscription = this.courseService.GetCourse(programId)
    .subscribe(
      (courses: Array<ICourse>) => {
        this.ngRedux.dispatch({type: COURSE_GET_FULFILLED, payload: courses});
      }, err => {
        console.log(err);
        this.ngRedux.dispatch({type: COURSE_GET_FAILED, payload: err });
      }
    );
  }

  UpdateCourse (id: number, course: ICourse) {
    this.updateCourseSubscription = this.courseService.UpdateCourse(id, course)
    .subscribe(
      (course: ICourse) => {
        this.ngRedux.dispatch({type: COURSE_UPDATE_FULFILLED, payload: course});
      }, err => {
        console.log(err);
        this.ngRedux.dispatch({type: COURSE_UPDATE_FAILED, payload: err});
      }
    );
  }

}