import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { MyClassService } from '../../services/my-class.service';
import { IAppState } from '../app.store';
import { IMyClass} from '../../interfaces/myClass/my-class.interface';
import {
  MY_CLASS_CREATE_ATTEMPT,
  MY_CLASS_CREATE_FAILED,
  MY_CLASS_CREATE_FULFILLED,
  MY_CLASS_DELETE_ATTEMPT,
  MY_CLASS_DELETE_FAILED,
  MY_CLASS_DELETE_FULFILLED,
  MY_CLASS_GET_ATTEMPT,
  MY_CLASS_GET_FAILED,
  MY_CLASS_GET_FULFILLED,
  MY_CLASS_UPDATE_ATTEMPT,
  MY_CLASS_UPDATE_FAILED,
  MY_CLASS_UPDATE_FULFILLED
} from '../action/my-class.actions';

@Injectable()

export class MyClassActionCreator implements OnDestroy {

  private getMyClassPerProgramWithFilterSubscription: Subscription = null;
  private getMyClassWithFilterSubscription: Subscription = null;
  private getMyClassAllSubscription: Subscription = null;
  private createMyClassSubscription: Subscription = null;
  private updateMyClassSubscription: Subscription = null;
  private deleteMyClassSubscription: Subscription = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private myClassService: MyClassService
  ) {}

  ngOnDestroy () {
    (this.getMyClassPerProgramWithFilterSubscription) ? this.getMyClassPerProgramWithFilterSubscription.unsubscribe() : null;
    (this.getMyClassWithFilterSubscription) ? this.getMyClassWithFilterSubscription.unsubscribe() : null;
    (this.getMyClassAllSubscription) ? this.getMyClassAllSubscription.unsubscribe() : null;
    (this.createMyClassSubscription) ? this.createMyClassSubscription.unsubscribe() : null;
    (this.updateMyClassSubscription) ? this.updateMyClassSubscription.unsubscribe() : null;
    (this.deleteMyClassSubscription) ? this.deleteMyClassSubscription.unsubscribe() : null;
  }

  GetMyClassPerProgramWithFilter(programId: number, filterName: string, filterValue: string) {
    this.getMyClassPerProgramWithFilterSubscription = this.myClassService.GetMyClassPerProgramWithFilter(programId, filterName, filterValue)
    .subscribe(
      (myClasses: IMyClass[]) => {
        this.ngRedux.dispatch({type: MY_CLASS_GET_FULFILLED, myClasses});
      }, err => {
        let error, errorMessage;
        console.log(typeof err._body);
        (typeof err._body === 'string') ? errorMessage = JSON.parse(err._body) : errorMessage = null;
        if (!errorMessage || !errorMessage.errorMessage) {
          error = 'There is a server Error.';
        } else {
          error = errorMessage.errorMessage;
        }
        this.ngRedux.dispatch({type: MY_CLASS_GET_FAILED, error });
      }
    );
  }

  GetMyClassWithFilter(filterName: string, filterValue: string) {
    this.getMyClassWithFilterSubscription = this.myClassService.GetMyClassWithFilter(filterName, filterValue)
    .subscribe(
      (myClasses: IMyClass[]) => {
        this.ngRedux.dispatch({type: MY_CLASS_GET_FULFILLED, myClasses});
      }, err => {
        let error, errorMessage;
        console.log(typeof err._body);
        (typeof err._body === 'string') ? errorMessage = JSON.parse(err._body) : errorMessage = null;
        if (!errorMessage || !errorMessage.errorMessage) {
          error = 'There is a server Error.';
        } else {
          error = errorMessage.errorMessage;
        }
        this.ngRedux.dispatch({type: MY_CLASS_GET_FAILED, error });
      }
    );
  }

  GetMyClassAll() {
    this.getMyClassAllSubscription = this.myClassService.GetMyClassAll()
    .subscribe(
      (myClasses: IMyClass[]) => {
        this.ngRedux.dispatch({type: MY_CLASS_GET_FULFILLED, myClasses});
      }, err => {
        let error, errorMessage;
        console.log(typeof err._body);
        (typeof err._body === 'string') ? errorMessage = JSON.parse(err._body) : errorMessage = null;
        if (!errorMessage || !errorMessage.errorMessage) {
          error = 'There is a server Error.';
        } else {
          error = errorMessage.errorMessage;
        }
        this.ngRedux.dispatch({type: MY_CLASS_GET_FAILED, error });
      }
    );
  }

  CreateMyClass(programId: number, myClass: IMyClass) {
    this.createMyClassSubscription = this.myClassService.CreateMyClass(programId, myClass)
    .subscribe(
      (myClass: IMyClass) => {
        this.ngRedux.dispatch({ type: MY_CLASS_CREATE_FULFILLED, myClass });
      }, err => {
        let error, errorMessage;
        console.log(typeof err._body);
        (typeof err._body === 'string') ? errorMessage = JSON.parse(err._body) : errorMessage = null;
        if (!errorMessage || !errorMessage.errorMessage) {
          error = 'There is a server Error.';
        } else {
          error = errorMessage.errorMessage;
        }
        this.ngRedux.dispatch({type: MY_CLASS_CREATE_FAILED, error });
      }
    );
  }

  UpdateMyClass(id: number, myClass: IMyClass) {
    this.updateMyClassSubscription = this.myClassService.UpdateMyClass(id, myClass)
    .subscribe(
      (myClass: IMyClass) => {
        this.ngRedux.dispatch({ type: MY_CLASS_UPDATE_FULFILLED, myClass });
      }, err => {
        let error, errorMessage;
        console.log(typeof err._body);
        (typeof err._body === 'string') ? errorMessage = JSON.parse(err._body) : errorMessage = null;
        if (!errorMessage || !errorMessage.errorMessage) {
          error = 'There is a server Error.';
        } else {
          error = errorMessage.errorMessage;
        }
        this.ngRedux.dispatch({type: MY_CLASS_UPDATE_FAILED, error });
      }
    );
  }

  DeleteMyClass(id: number) {
    this.deleteMyClassSubscription = this.myClassService.DeleteMyClass(id)
    .subscribe(
      (myClass: IMyClass) => {
        this.ngRedux.dispatch({ type: MY_CLASS_DELETE_FULFILLED, myClass });
      }, err => {
        let error, errorMessage;
        console.log(typeof err._body);
        (typeof err._body === 'string') ? errorMessage = JSON.parse(err._body) : errorMessage = null;
        if (!errorMessage || !errorMessage.errorMessage) {
          error = 'There is a server Error.';
        } else {
          error = errorMessage.errorMessage;
        }
        this.ngRedux.dispatch({type: MY_CLASS_DELETE_FAILED, error });
      }
    );
  }

}
