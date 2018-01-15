import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';

import { DialogService, GradeService } from '../../services';
import { IAppState } from '../app.store';
import { IGradeView } from '../../interfaces/grade/grade-view.interface';
import { IGrade } from '../../interfaces/grade/grade.interface';
import {
  GRADE_CREATE_ATTEMPT,
  GRADE_CREATE_FAILED,
  GRADE_CREATE_FULFILLED,
  GRADE_DELETE_ATTEMPT,
  GRADE_DELETE_FAILED,
  GRADE_DELETE_FULFILLED,
  GRADE_GET_ATTEMPT,
  GRADE_GET_FAILED,
  GRADE_GET_FULFILLED,
  GRADE_UPDATE_ATTEMPT,
  GRADE_UPDATE_FAILED,
  GRADE_UPDATE_FULFILLED
} from '../action/grade.actions';
import { MiscActionCreator } from './misc.actioncreator';

@Injectable()

export class GradeActionCreator implements OnDestroy {

  private getMyClassGradeSubscription: Subscription = null;
  private getGradeWithQueryObjectSubscription: Subscription = null;
  private getOneGradeSubscription: Subscription = null;
  private updateGradeSubscription: Subscription = null;
  private deleteGradeSubscription: Subscription = null;
  private errorMessage: string = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private gradeService: GradeService,
    private dialogService: DialogService
  ) {}

  ngOnDestroy () {
    (this.getMyClassGradeSubscription) ? this.getMyClassGradeSubscription.unsubscribe() : null;
    (this.getGradeWithQueryObjectSubscription) ? this.getGradeWithQueryObjectSubscription.unsubscribe() : null;
    (this.getOneGradeSubscription) ? this.getMyClassGradeSubscription.unsubscribe() : null;
    (this.updateGradeSubscription) ? this.updateGradeSubscription.unsubscribe() : null;
    (this.deleteGradeSubscription) ? this.deleteGradeSubscription.unsubscribe() : null;
  }
  
  GetMyClassGrade (myClassId: number) {
    this.ngRedux.dispatch({ type: GRADE_GET_ATTEMPT });
    this.getMyClassGradeSubscription = this.gradeService.GetMyClassGrade(myClassId)
    .map(data => {
      let newData: IGradeView[];
      newData = data.map(d => this.gradeToViewFlat(d))
      return newData;
    })
    .subscribe(
      (grades: IGradeView[]) => {
        this.ngRedux.dispatch({type: GRADE_GET_FULFILLED, payload: grades});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: GRADE_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetGradeWithQueryObject (operator: string, queryObjectArray: any[]) {
    this.ngRedux.dispatch({ type: GRADE_GET_ATTEMPT });
    this.getGradeWithQueryObjectSubscription = this.gradeService.GetGradeWithQueryObject(operator, queryObjectArray)
    .map(data => {
      let newData: IGradeView[];
      newData = data.map(d => this.gradeToViewFlat(d))
      return newData;
    })
    .subscribe(
      (grades: IGradeView[]) => {
        this.ngRedux.dispatch({type: GRADE_GET_FULFILLED, payload: grades});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: GRADE_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetOneGrade (id: number) {
    this.ngRedux.dispatch({ type: GRADE_GET_ATTEMPT });
    this.getOneGradeSubscription = this.gradeService.GetOneGrade(id)
    .map(data => this.gradeToViewFlat(data))
    .subscribe(
      (grade: any) => {
        this.ngRedux.dispatch({type: GRADE_GET_FULFILLED, payload: [grade]});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: GRADE_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  UpdateGrade (id: number, gradeData: IGradeView) {
    this.ngRedux.dispatch({ type: GRADE_UPDATE_ATTEMPT });
    this.updateGradeSubscription = this.gradeService.UpdateGrade(id, gradeData)
    .map(data => this.gradeToViewFlat(data))
    .subscribe(
      (grade: IGradeView) => {
        this.ngRedux.dispatch({type: GRADE_UPDATE_FULFILLED, payload: grade});
        this.dialogService.showSwal('success-message', {
          title:  'Successful Grade Update',
          text: `Student with ID ${grade.studentNumber} grade was successfully Updated.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: GRADE_UPDATE_FAILED, error: this.errorMessage });
          // put error mesage here.
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  DeleteGrade (id: number, gradeData: IGradeView) {
    this.ngRedux.dispatch({ type: GRADE_DELETE_ATTEMPT });
    this.deleteGradeSubscription = this.gradeService.DeleteGrade(id)
    .subscribe(
      (data) => {
        this.ngRedux.dispatch({ type: GRADE_DELETE_FULFILLED, payload: data });
        this.dialogService.showSwal('success-message', {
          title:  'Successful Course Deletion',
          text: `Student ID ${gradeData.studentNumber} grade was successfully deleted.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: GRADE_DELETE_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  // functions
  private gradeToViewFlat: Function = (data: any): IGradeView => {
    let newData: IGradeView;
    newData = {
      id: data.id,
      academicYear: data.academicYear,
      term: data.term,
      cycle: data.cycle,
      studentId: data.studentId,
      studentUserId: data['student.user.id'],
      studentNumber: data['student.user.idNumber'],
      studentLname: data['student.user.lname'],
      studentFname: data['student.user.fname'],
      studentEmail: data['student.user.email'],
      instructorId: data.instructorId,
      instructorUserId: data['instructor.user.id'],
      instructorNumber: data['instructor.user.Number'],
      instructorFname: data['instructor.user.fname'],
      instructorLname: data['instructor.user.lname'],
      instructorEmail: data['instructor.user.email'],
      assessmentId: data.assessmentId,
      myClassId: data.myClassId,
      programSopiId: data.programSopiId,
      sopi: data['programSopi.sopi.code'],
      programCourseId: data.programCourseId,
      course: data['programCourse.course.code'],
      grade: data.grade

    };
    return newData;
  };

}
