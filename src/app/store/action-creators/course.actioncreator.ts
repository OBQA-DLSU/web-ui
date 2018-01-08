import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { CourseService } from '../../services/course.service';
import { DialogService } from '../../services/dialog.service';
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
import { MiscActionCreator } from './misc.actioncreator';

@Injectable()

export class CourseActionCreator implements OnDestroy {

  private createCourseSubscription: Subscription = null;
  private getCourseSubscription: Subscription = null;
  private updateCourseSubscription: Subscription = null;
  private deleteCourseSubscription: Subscription = null;

  private errorMessage: string = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private courseService: CourseService,
    private dialogService: DialogService,
    private miscActionCreator: MiscActionCreator
  ) {}

  ngOnDestroy () {
    (this.createCourseSubscription) ? this.createCourseSubscription.unsubscribe() : null;
    (this.getCourseSubscription) ? this.getCourseSubscription.unsubscribe() : null;
    (this.updateCourseSubscription) ? this.updateCourseSubscription.unsubscribe() : null;
    (this.deleteCourseSubscription) ? this.deleteCourseSubscription.unsubscribe() : null;
  }
  
  CreateCourse (course: ICourseView, programId: number) {
    this.createCourseSubscription = this.courseService.CreateCourse(programId, course)
    .map(data => this.programCourseToView(data))
    .subscribe(
      (course: ICourseView) => {
        this.ngRedux.dispatch({type: COURSE_CREATE_FULFILLED, payload: course});
        this.dialogService.showSwal('success-message', {
          title:  'Successful Course Creation',
          text: `${course.code} was successfully Created.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: COURSE_CREATE_FAILED, error: this.errorMessage });
          
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetCourse (programId: number) {
    this.miscActionCreator.LoadSpinner();
    this.getCourseSubscription = this.courseService.GetCourse(programId)
    .map(data => {
      let newData: ICourseView[];
      newData = data.map(d => this.programCourseToView(d))
      return newData;
    })
    .subscribe(
      (courses: any[]) => {
        this.ngRedux.dispatch({type: COURSE_GET_FULFILLED, payload: courses});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: COURSE_GET_FAILED, error: this.errorMessage });
        }
        this.miscActionCreator.UnloadSpinner();
      },
      () => {
        this.errorMessage = null;
        this.miscActionCreator.UnloadSpinner();
      }
    );
  }

  UpdateCourse (id: number, course: ICourseView) {
    this.updateCourseSubscription = this.courseService.UpdateCourse(id, course)
    .map(data => this.programCourseToView(data))
    .subscribe(
      (course: ICourseView) => {
        this.ngRedux.dispatch({type: COURSE_UPDATE_FULFILLED, payload: course});
        this.dialogService.showSwal('success-message', {
          title:  'Successful Course Update',
          text: `${course.code} was successfully Updated.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: COURSE_UPDATE_FAILED, error: this.errorMessage });
          // put error mesage here.
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  DeleteCourse (id: number, course: ICourseView) {
    this.deleteCourseSubscription = this.courseService.DeleteCourse(id)
    .subscribe(
      (data) => {
        this.ngRedux.dispatch({ type: COURSE_DELETE_FULFILLED, payload: data });
        this.dialogService.showSwal('success-message', {
          title:  'Successful Course Deletion',
          text: `${course.code} was successfully deleted.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: COURSE_DELETE_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
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
      programId: data.programId,
      toBeAssessed: data.toBeAssessed
    };
    return newData;
  };
}