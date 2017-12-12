import { ISopi } from '../interfaces/sopi/sopi.interface';
import {
  SOPI_CREATE_ATTEMPT,
  SOPI_CREATE_FAILED,
  SOPI_CREATE_FULFILLED,
  SOPI_GET_ATTEMPT,
  SOPI_GET_FAILED,
  SOPI_GET_FULFILLED,
  SOPI_UPDATE_ATTEMPT,
  SOPI_UPDATE_FAILED,
  SOPI_UPDATE_FULFILLED
} from './action/sopi.actions';
import * as sopi from './pure-functions/sopi.functions';

export interface ISopiStore {
  sopis: ISopi[];
  error: string;
}

export const SOPI_INITIAL_STORE: ISopiStore = {
  sopis: [],
  error: ''
}

export function sopiReducer (state: ISopiStore = SOPI_INITIAL_STORE, action) {
  switch (action.type) {
    case SOPI_CREATE_ATTEMPT: return sopi.sopiCreateAttempt(state, action);
    case SOPI_CREATE_FAILED: return sopi.sopiCreateFailed(state, action);
    case SOPI_CREATE_FULFILLED: return sopi.sopiCreateFulfilled(state, action);
    case SOPI_GET_ATTEMPT: return sopi.sopiGetAttempt(state, action);
    case SOPI_GET_FAILED: return sopi.sopiGetFailed(state, action);
    case SOPI_GET_FULFILLED: return sopi.sopiGetFulfilled(state, action);
    case SOPI_UPDATE_ATTEMPT: return sopi.sopiUpdateAttempt(state, action);
    case SOPI_UPDATE_FAILED: return sopi.sopiUpdateFailed(state, action);
    case SOPI_UPDATE_FULFILLED: return sopi.sopiUpdateFulfilled(state, action);
  }
  return state;
}