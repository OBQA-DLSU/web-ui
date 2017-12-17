import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { IAppState } from '../app.store';
import { ISopiView } from '../../interfaces/sopi/sopi-view.interface';
import { IProgramSopi } from '../../interfaces/programSopi/program-sopi.interface';
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

  private errorMessage: string = null;

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

  CreateSopi (programId: number, sopi: ISopiView) {
    this.createSopiSubscription = this.sopiService.CreateSopi(programId, sopi)
    .map(data => this.programSopiToView(data))
    .subscribe(
      (sopi: ISopiView) => {
        this.ngRedux.dispatch({ type: SOPI_CREATE_FULFILLED, payload: sopi });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: SOPI_CREATE_FAILED, error: this.errorMessage });
          // put error mesage here.
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetSopi (programId: number) {
    this.getSopiSubscription = this.sopiService.GetSopi(programId)
    .map(data => {
      let newData: ISopiView[];
      newData = data.map(d => this.programSopiToView(d));
      return newData;
    })
    .subscribe(
      (sopis: ISopiView[]) => {
        this.ngRedux.dispatch({ type: SOPI_GET_FULFILLED, payload: sopis });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: SOPI_GET_FAILED, error: this.errorMessage });
          // put error mesage here.
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  UpdateSopi (id: number, sopi: ISopiView) {
    this.updateSopiSubscription = this.sopiService.UpdateSopi(id, sopi)
    .map(data => this.programSopiToView(data))
    .subscribe(
      (sopi: ISopiView) => {
        this.ngRedux.dispatch({ type: SOPI_UPDATE_FULFILLED, payload: sopi });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: SOPI_UPDATE_FAILED, error: this.errorMessage });
          // put error mesage here.
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  DeleteSopi (id: number) {
    this.deleteSopiSubscription = this.sopiService.DeleteSopi(id)
    .map(data => this.programSopiToView(data))
    .subscribe(
      (sopi: ISopiView) => {
        this.ngRedux.dispatch({ type: SOPI_DELETE_FULFILLED, payload: sopi });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: SOPI_DELETE_FAILED, error: this.errorMessage });
          // put error mesage here.
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  // functions
  private programSopiToView: Function = (data: IProgramSopi): ISopiView => {
    let newData: ISopiView;
    newData = {
      id: data.id,
      code: data.sopi.code,
      so: data.sopi.so.code,
      description: data.description,
      programId: data.programId,
      program: data.program.name
    };
    return newData;
  };
}