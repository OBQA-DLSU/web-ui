import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { IAppState } from '../app.store';
import {
  GET_INVITATION_CODE_FULFILLED
} from '../action/misc.actions';

@Injectable()

export class MiscActionCreator implements OnDestroy {

  constructor (
    private ngRedux: NgRedux<IAppState>
  ) {}

  ngOnDestroy () {}

  StoreInvitationCode (code: string) {
    this.ngRedux.dispatch({type: GET_INVITATION_CODE_FULFILLED, payload: code});
  }

}