import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { IAppState } from '../app.store';
import { AuthenticationService } from '../../services/authentication.service';
import { IUserCreate } from '../../interfaces/user/user-create.interface';
import { ISession } from '../../interfaces/session/session.interface';
import { USER_CREATE_FULFILLED, USER_CREATE_FAILED, TOGGLE_USER_CREATE } from '../action/user.action';

@Injectable()

export class UserActionCreator implements OnDestroy {

  private signup: Subscription = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private authenticationService: AuthenticationService
  ) {}

  ngOnDestroy() {
    (this.signup) ? this.signup.unsubscribe() : null;    
  }

  CreateUser (user: IUserCreate) {
    this.signup = this.authenticationService.SignUp(user)
    .subscribe(
      (session: ISession) => {
        this.authenticationService.SessionSave(session);
        this.ngRedux.dispatch({type: USER_CREATE_FAILED, payload: session.user });
      }, err => {
        console.log(err);
        this.ngRedux.dispatch({type: USER_CREATE_FAILED, err});
      }
    );
  }

}