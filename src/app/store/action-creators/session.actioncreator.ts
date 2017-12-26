import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { IAppState } from '../app.store';
import { AuthenticationService } from '../../services/authentication.service';
import { IUserCreate } from '../../interfaces/user/user-create.interface';
import { DialogService } from '../../services/dialog.service';
import { ISession } from '../../interfaces/session/session.interface';
import { ISessionCreate } from '../../interfaces/session/session-create.interface';
import { IProgram } from '../../interfaces/program/program.interface';
import { 
  SESSION_CREATE_ATTEMPT,
  SESSION_CREATE_FULFILLED,
  SESSION_CHECK_FULFILLED,
  SESSION_CREATE_FAILED,
  SESSION_CHECK_ATTEMPT,
  SESSION_CHECK_FAILED,
  SESSION_DESTROY_FULFILLED,
  SESSION_UPDATE_FULFILLED,
  SESSION_UPDATE_FAILED
} from '../action/session.actions';

import {
  USER_SIGNIN_FULFILLED,
  USER_SIGNIN_FAILED,
  USER_SESSION_DESTROY
} from '../action/user.action';

@Injectable()

export class SessionActionCreator implements OnDestroy {

  private signin: Subscription = null;
  private errorMessage: string = null;
  constructor (
    private ngRedux: NgRedux<IAppState>,
    private authenticationService: AuthenticationService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  ngOnDestroy () {
    (this.signin) ? this.signin.unsubscribe() : null;
  }

  SessionCreate (sessionCreate: ISessionCreate) {
    this.signin = this.authenticationService.SignIn(sessionCreate)
    .subscribe(
      (session: ISession) => {
        this.authenticationService.SessionSave(session);
        this.ngRedux.dispatch({type: SESSION_CREATE_FULFILLED, payload: session});
        this.ngRedux.dispatch({ type: USER_SIGNIN_FULFILLED, payload: session.user});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: SESSION_CREATE_FAILED, error: this.errorMessage });
          this.ngRedux.dispatch({ type: USER_SIGNIN_FAILED, error: this.errorMessage });
          this.dialogService.showSwal('error-message', {
            title: 'Signin Error!',
            text: 'Email or Password is incorrect.'
          });
        }
      },
      () => {
        this.errorMessage = null;
        this.router.navigate(['./pages/authentication']);
      }
    );
  }

  SessionCheck () {
    const session: ISession = this.authenticationService.SessionRead();
    if (!session) { 
      this.ngRedux.dispatch({type: SESSION_CHECK_FAILED, error:`Session has Expired.` });
      this.ngRedux.dispatch({ type: USER_SIGNIN_FAILED, error: `Session has Expired.`  });
    } else {
      this.ngRedux.dispatch({type: SESSION_CHECK_FULFILLED, payload: session});
      this.ngRedux.dispatch({ type: USER_SIGNIN_FULFILLED, payload: session.user});
    }
  }

  SessionUpdate (isStudent: boolean, isAdmin: boolean, programId: number, program: IProgram) {
    const session = this.authenticationService.SessionUpdate(isStudent, isAdmin, programId, program);
    this.ngRedux.dispatch({ type: SESSION_UPDATE_FULFILLED, payload: session });
  }

  SessionDestroy () {
    this.authenticationService.SessionDestroy();
    this.ngRedux.dispatch({type: SESSION_DESTROY_FULFILLED});
    this.ngRedux.dispatch({ type: USER_SESSION_DESTROY });
  }
}
