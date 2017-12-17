import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { IAppState } from '../app.store';
import { AuthenticationService } from '../../services/authentication.service';
import { IUserCreate } from '../../interfaces/user/user-create.interface';
import { ISession } from '../../interfaces/session/session.interface';
import { ISessionCreate } from '../../interfaces/session/session-create.interface';
import { 
  SESSION_CREATE_ATTEMPT,
  SESSION_CREATE_FULFILLED,
  SESSION_CHECK_FULFILLED,
  SESSION_CREATE_FAILED,
  SESSION_CHECK_ATTEMPT,
  SESSION_CHECK_FAILED,
  SESSION_DESTROY_FULFILLED
} from '../action/session.actions';

@Injectable()

export class SessionActionCreator implements OnDestroy {

  private signin: Subscription = null;
  private errorMessage: string = null;
  constructor (
    private ngRedux: NgRedux<IAppState>,
    private authenticationService: AuthenticationService,
    private router: Router
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
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: SESSION_CREATE_FAILED, error: this.errorMessage });
          // put error mesage here.
        }
      },
      () => {
        this.errorMessage = null;
        this.router.navigate(['./dashboard']);
      }
    );
  }

  SessionCheck () {
    const session: ISession = this.authenticationService.SessionRead();
    (!session) ? this.ngRedux.dispatch({type: SESSION_CHECK_FAILED, error:`Session has Expired.` })
    : this.ngRedux.dispatch({type: SESSION_CHECK_FULFILLED, payload: session});
  }

  SessionDestroy () {
    this.authenticationService.SessionDestroy();
    this.ngRedux.dispatch({type: SESSION_DESTROY_FULFILLED});
  }
}