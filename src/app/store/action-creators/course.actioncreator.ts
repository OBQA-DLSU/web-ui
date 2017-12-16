import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { CourseService } from '../../services/course.service';
import { IAppState } from '../app.store';
import { ICourseView } from '../../interfaces/course/course-view.interface';
import { IProgramCourse } from '../../interfaces/programCourse/program-course.interface';
import {
  COURSE_CREATE_ATTEMPT,
  COURSE_CREATE_FAILED,
  COURSE_CREATE_FULFILLED,
  COURSE_GET_ATTEMPT,
  COURSE_GET_FAILED,
  COURSE_GET_FULFILLED,
  COURSE_UPDATE_ATTEMPT,
  COURSE_UPDATE_FAILED,
  COURSE_UPDATE_FULFILLED,
  COURSE_DELETE_ATTEMPT,
  COURSE_DELETE_FAILED,
  COURSE_DELETE_FULFILLED
} from '../action/course.actions';

@Injectable()

export class CourseActionCreator implements OnDestroy {

  private createCourseSubscription: Subscription = null;
  private getCourseSubscription: Subscription = null;
  private updateCourseSubscription: Subscription = null;
  private deleteCourseSubscription: Subscription = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private courseService: CourseService
  ) {}

  ngOnDestroy () {
    (this.createCourseSubscription) ? this.createCourseSubscription.unsubscribe() : null;
    (this.getCourseSubscription) ? this.getCourseSubscription.unsubscribe() : null;
    (this.updateCourseSubscription) ? this.updateCourseSubscription.unsubscribe() : null;
    (this.deleteCourseSubscription) ? this.deleteCourseSubscription.unsubscribe() : null;
  }
  
  CreateCourse (course: ICourseView, programId: number, toBeAssessed: boolean) {
    this.createCourseSubscription = this.courseService.CreateCourse(programId, course, toBeAssessed)
    .map(data => this.programCourseToView(data))
    .subscribe(
      (course: ICourseView) => {
        this.ngRedux.dispatch({type: COURSE_CREATE_FULFILLED, payload: course});
      }, err => {
        let error, errorMessage;
        console.log(typeof err._body);
        (typeof err._body === 'string') ? errorMessage = JSON.parse(err._body) : errorMessage = null;
        if (!errorMessage || !errorMessage.errorMessage) {
          error = 'There is a server Error.';
        } else {
          error = errorMessage.errorMessage;
        }
        this.ngRedux.dispatch({type: COURSE_CREATE_FAILED, error });
      }
    );
  }

  GetCourse (programId: number) {
    this.getCourseSubscription = this.courseService.GetCourse(programId)
    .map(data => {
      let newData: ICourseView[];
      newData = data.map(d => this.programCourseToView(d))
      return newData;
    })
    .subscribe(
      (courses: ICourseView[]) => {
        this.ngRedux.dispatch({type: COURSE_GET_FULFILLED, payload: courses});
      }, err => {
        let error, errorMessage;
        console.log(typeof err._body);
        (typeof err._body === 'string') ? errorMessage = JSON.parse(err._body) : errorMessage = null;
        if (!errorMessage || !errorMessage.errorMessage) {
          error = 'There is a server Error.';
        } else {
          error = errorMessage.errorMessage;
        }
        this.ngRedux.dispatch({type: COURSE_GET_FAILED, error });
      }
    );
  }

  UpdateCourse (id: number, course: ICourseView) {
    this.updateCourseSubscription = this.courseService.UpdateCourse(id, course)
    .map(data => this.programCourseToView(data))
    .subscribe(
      (course: ICourseView) => {
        this.ngRedux.dispatch({type: COURSE_UPDATE_FULFILLED, payload: course});
      }, err => {
        let error, errorMessage;
        console.log(typeof err._body);
        (typeof err._body === 'string') ? errorMessage = JSON.parse(err._body) : errorMessage = null;
        if (!errorMessage || !errorMessage.errorMessage) {
          error = 'There is a server Error.';
        } else {
          error = errorMessage.errorMessage;
        }
        this.ngRedux.dispatch({type: COURSE_UPDATE_FAILED, error });
      }
    );
  }

  DeleteCourse (id: number) {
    this.deleteCourseSubscription = this.courseService.DeleteCourse(id)
    .map(data => this.programCourseToView(data))
    .subscribe(
      (course: ICourseView) => {
        this.ngRedux.dispatch({ type: COURSE_DELETE_FULFILLED, paylaod: course });
      }, err => {
        let error, errorMessage;
        console.log(typeof err._body);
        (typeof err._body === 'string') ? errorMessage = JSON.parse(err._body) : errorMessage = null;
        if (!errorMessage || !errorMessage.errorMessage) {
          error = 'There is a server Error.';
        } else {
          error = errorMessage.errorMessage;
        }
        this.ngRedux.dispatch({type: COURSE_DELETE_FAILED, error });
      }
    );
  }
  // functions
  private programCourseToView: Function = (data: IProgramCourse): ICourseView => {
    let newData: ICourseView;
    newData = {
      id: data.id,
      code: data.course.code,
      name: data.course.name,
      description: data.description,
      program: data.program.name,
      programId: data.programId
    };
    return newData;
  };
}