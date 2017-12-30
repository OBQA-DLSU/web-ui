import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import {
  StudentService,
  DialogService
} from '../../services'
import { IAppState } from '../app.store';
import { IStudent } from '../../interfaces/student/student.interface';
import { IStudentView } from './../../interfaces/student/student-view.interface';
import { IMyClassStudent } from '../../interfaces/myClass/my-class-student.interface';
import { IMyClassStudentView } from './../../interfaces/myClass/my-class-student-view.interface';
import {
  STUDENT_CREATE_ATTEMPT,
  STUDENT_CREATE_FAILED,
  STUDENT_CREATE_FULFILLED,
  STUDENT_DELETE_ATTEMPT,
  STUDENT_DELETE_FAILED,
  STUDENT_DELETE_FULFILLED,
  STUDENT_GET_ATTEMPT,
  STUDENT_GET_FAILED,
  STUDENT_GET_FULFILLED,
  STUDENT_UPDATE_ATTEMPT,
  STUDENT_UPDATE_FAILED,
  STUDENT_UPDATE_FULFILLED
} from '../action/student.action';

@Injectable()

export class StudentActionCreator implements OnDestroy {

  private getMyClassStudentSubscription: Subscription = null;
  private getOneMyClassStudentSubscription: Subscription = null;
  private updateMyClassStudentSubscription: Subscription = null;
  private deleteMyClassStudentSubscription: Subscription = null;

  errorMessage: string = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private studentService: StudentService,
    private dialogService: DialogService
  ) {}

  ngOnDestroy() {
    (this.getMyClassStudentSubscription) ? this.getMyClassStudentSubscription.unsubscribe() : null;
    (this.getOneMyClassStudentSubscription) ? this.getOneMyClassStudentSubscription.unsubscribe() : null;
    (this.updateMyClassStudentSubscription) ? this.updateMyClassStudentSubscription.unsubscribe() : null;
    (this.deleteMyClassStudentSubscription) ? this.deleteMyClassStudentSubscription.unsubscribe() : null;
  }

  GetMyClassStudent (myClassId: number) {
    this.getMyClassStudentSubscription = this.studentService.GetMyClassStudent(myClassId)
    .map(data => {
      let newData: IMyClassStudentView[];
      newData = data.map(d => this.myClassStudentToView(d))
      return newData;
    })
    .subscribe(
      (students: IMyClassStudentView[]) => {
        this.ngRedux.dispatch({type: STUDENT_GET_FULFILLED, payload: students});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: STUDENT_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetOneMyClassStudent (id: number) {
    this.getOneMyClassStudentSubscription = this.studentService.GetOneMyClassStudent(id)
    .map(data => this.myClassStudentToView(data))
    .subscribe(
      (student: IMyClassStudentView) => {
        const students: IMyClassStudentView[] = [student];
        this.ngRedux.dispatch({type: STUDENT_GET_FULFILLED, payload: students});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: STUDENT_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  UpdateMyClassStudent (student: IStudentView, id: number) {
    this.updateMyClassStudentSubscription = this.studentService.UpdateMyClassStudent(student, id)
    .map(data => this.myClassStudentToView(data))
    .subscribe(
      (student: IMyClassStudentView) => {
        this.ngRedux.dispatch({type: STUDENT_UPDATE_FULFILLED, payload: student});
        this.dialogService.showSwal('success-message', {
          title:  'Successful Course Update',
          text: `$Student was successfully Updated.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: STUDENT_UPDATE_FAILED, error: this.errorMessage });
          // put error mesage here.
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  DeleteMyClassStudent (id: number) {
    this.deleteMyClassStudentSubscription = this.studentService.DeleteMyClassStudent(id)
    .subscribe(
      (data) => {
        this.ngRedux.dispatch({ type: STUDENT_DELETE_FULFILLED, payload: data });
        this.dialogService.showSwal('success-message', {
          title:  'Successful Course Deletion',
          text: `Student was successfully deleted.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: STUDENT_DELETE_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }
  // functions
  private myClassStudentToView: Function = (data: IMyClassStudent): IMyClassStudentView => {
    let newData: IMyClassStudentView;
    newData = {
      id: data.id,
      studentId: data.studentId,
      myClassId: data.myClassId,
      idNumber: data['student.user.idNumber'],
      email: data['student.user.email'],
      fname: data['student.user.fname'],
      lname: data['student.user.lname'],
      programId: data['student.programId'],
      program: data['student.program.name']
    };
    return newData;
  };
}
