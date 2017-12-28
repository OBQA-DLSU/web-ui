import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Router } from '@angular/router';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationService } from '../../services/authentication.service';
import { DialogService } from '../../services/dialog.service';
import { IAppState } from '../app.store';
import {
  GET_INVITATION_CODE_FULFILLED,
  GET_MY_CLASS_ID_FULFILLED,
  TOGGLE_FORGOT_PASSWORD,
  SIGN_IN_BUFFER_PAGE_ON,
  SIGN_IN_BUFFER_PAGE_OFF
} from '../action/misc.actions';

@Injectable()

export class MiscActionCreator implements OnDestroy {

  private forgotPasswordSubscription: Subscription = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private authenticationService: AuthenticationService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnDestroy () {
    (this.forgotPasswordSubscription) ? this.forgotPasswordSubscription.unsubscribe() : null;
  }

  StoreInvitationCode (code: string) {
    this.ngRedux.dispatch({type: GET_INVITATION_CODE_FULFILLED, payload: code});
  }
  StoreMyClassId (myClassId: string) {
    this.ngRedux.dispatch({type: GET_MY_CLASS_ID_FULFILLED, payload: myClassId});
  }

  ToggleForgotPassword () {
    this.ngRedux.dispatch({ type: TOGGLE_FORGOT_PASSWORD });
  }

  SignInBUfferPageOn () {
    this.ngRedux.dispatch({ type: SIGN_IN_BUFFER_PAGE_ON });
  }

  SignInBUfferPageOff() {
    this.ngRedux.dispatch({ type: SIGN_IN_BUFFER_PAGE_OFF });
  }

  ForgotPassword (email: string) {
    this.forgotPasswordSubscription = this.authenticationService.ForgotPassword(email)
    .subscribe(
      message => {
        this.ngRedux.dispatch({ type: SIGN_IN_BUFFER_PAGE_ON });
      },
      error => {
        this.dialogService.showSwal('error-message', {
          title: 'Please try again.'
        });
      }
    );
  }
}