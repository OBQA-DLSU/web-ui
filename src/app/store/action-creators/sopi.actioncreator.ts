import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { IAppState } from '../app.store';
import { ISopi } from '../../interfaces/sopi/sopi.interface';
import { SopiService } from '../../services/sopi.service';
import {
  SOPI_CREATE_ATTEMPT,
  SOPI_CREATE_FAILED,
  SOPI_CREATE_FULFILLED,
  SOPI_GET_ATTEMPT,
  SOPI_GET_FAILED,
  SOPI_GET_FULFILLED,
  SOPI_UPDATE_ATTEMPT,
  SOPI_UPDATE_FAILED,
  SOPI_UPDATE_FULFILLED,
  SOPI_DELETE_ATTEMPT,
  SOPI_DELETE_FAILED,
  SOPI_DELETE_FULFILLED
} from '../action/sopi.actions';
import { Subscribable } from 'rxjs/Observable';

@Injectable()

export class SopiActionCreator implements OnDestroy {

  private createSopiSubscription: Subscription = null;
  private getSopiSubscription: Subscription = null;
  private updateSopiSubscription: Subscription = null;
  private deleteSopiSubscription: Subscription = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private sopiService: SopiService
  ) {}

  ngOnDestroy () {
    (this.createSopiSubscription) ? this.createSopiSubscription.unsubscribe() : null;
    (this.getSopiSubscription) ? this.getSopiSubscription.unsubscribe() : null;
    (this.updateSopiSubscription) ? this.updateSopiSubscription.unsubscribe() : null;
    (this.deleteSopiSubscription) ? this.deleteSopiSubscription.unsubscribe() : null;
  }

  CreateSopi (programId: number, sopi: ISopi) {
    this.createSopiSubscription = this.sopiService.CreateSopi(programId, sopi)
    .subscribe(
      (sopi: ISopi) => {
        this.ngRedux.dispatch({ type: SOPI_CREATE_FULFILLED, sopi });
      }, err => {
        let error, errorMessage;
        console.log(typeof err._body);
        (typeof err._body === 'string') ? errorMessage = JSON.parse(err._body) : errorMessage = null;
        if (!errorMessage || !errorMessage.errorMessage) {
          error = 'There is a server Error.';
        } else {
          error = errorMessage.errorMessage;
        }
        this.ngRedux.dispatch({type: SOPI_CREATE_FAILED, error });
      }
    );
  }

  GetSopi (programId: number) {
    this.getSopiSubscription = this.sopiService.GetSopi(programId)
    .subscribe(
      (sopis: ISopi[]) => {
        this.ngRedux.dispatch({ type: SOPI_GET_FULFILLED, sopis });
      }, err => {
        let error, errorMessage;
        (typeof err._body === 'string') ? errorMessage = JSON.parse(err._body) : errorMessage = null;
        if (!errorMessage || !errorMessage.errorMessage) {
          error = 'There is a server Error.';
        } else {
          error = errorMessage.errorMessage;
        }
        this.ngRedux.dispatch({type: SOPI_GET_FAILED, error });
      }
    );
  }

  UpdateSopi (id: number, sopi: ISopi) {
    this.updateSopiSubscription = this.sopiService.UpdateSopi(id, sopi)
    .subscribe(
      (sopi: ISopi) => {
        this.ngRedux.dispatch({ type: SOPI_UPDATE_FULFILLED, sopi });
      }, err => {
        let error, errorMessage;
        (typeof err._body === 'string') ? errorMessage = JSON.parse(err._body) : errorMessage = null;
        if (!errorMessage || !errorMessage.errorMessage) {
          error = 'There is a server Error.';
        } else {
          error = errorMessage.errorMessage;
        }
        this.ngRedux.dispatch({type: SOPI_UPDATE_FAILED, error });
      }
    );
  }

  DeleteSopi (id: number) {
    this.deleteSopiSubscription = this.sopiService.DeleteSopi(id)
    .subscribe(
      (sopi: ISopi) => {
        this.ngRedux.dispatch({ type: SOPI_DELETE_FULFILLED, sopi });
      }, err => {
        let error, errorMessage;
        (typeof err._body === 'string') ? errorMessage = JSON.parse(err._body) : errorMessage = null;
        if (!errorMessage || !errorMessage.errorMessage) {
          error = 'There is a server Error.';
        } else {
          error = errorMessage.errorMessage;
        }
        this.ngRedux.dispatch({type: SOPI_DELETE_FAILED, error });
      }
    );
  }
}