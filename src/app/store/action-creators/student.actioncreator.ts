import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { StudentService } from '../../services/student.service';
import { DialogService } from '../../services/dialog.service';
import { IAppState } from '../app.store';
import { IMyClass} from '../../interfaces/myClass/my-class.interface';
import { IMyClassView } from '../../interfaces/myClass/my-class-view.interface';
import { IStudentView } from './../../interfaces/student/student-view.interface';
import { GET_MY_CLASS_STUDENT_ATTEMPT,
         GET_MY_CLASS_STUDENT_FULFILLED,
         GET_MY_CLASS_STUDENT_REJECT
        } from '../action/student.action';

@Injectable()

export class StudentActionCreator implements OnDestroy {

  private getMyClassStudentSubscription: Subscription = null;
  errorMessage: string = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private studentService: StudentService,
    private dialogService: DialogService
  ) {}

  ngOnDestroy() {
    (this.getMyClassStudentSubscription) ? this.getMyClassStudentSubscription.unsubscribe : null;
  }

  getMyClassStudent(id: number) {
    this.getMyClassStudentSubscription = this.studentService.getMyClassStudent(id)
    .map(data => data)
    .subscribe(
      (data) => {
        this.ngRedux.dispatch({ type: GET_MY_CLASS_STUDENT_FULFILLED, payload: data});
        console.log(data);
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: GET_MY_CLASS_STUDENT_REJECT, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    )
  }
}

