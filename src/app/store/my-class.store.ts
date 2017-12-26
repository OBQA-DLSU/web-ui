import { IMyClassView } from '../interfaces/myClass/my-class-view.interface';
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
} from './action/my-class.actions';
import * as myClass from './pure-functions/my-class.functions';

export interface IMyClassStore {
  myClasses: IMyClassView[];
  error: string;
}

export const MY_CLASS_INITIAL_STATE: IMyClassStore = {
  myClasses: [],
  error: ''
}

export function myClassReducer (state: IMyClassStore = MY_CLASS_INITIAL_STATE, action) {
  switch (action.type) {
    case MY_CLASS_CREATE_ATTEMPT: return myClass.myClassCreateAttempt(state, action);
    case MY_CLASS_CREATE_FAILED: return myClass.myClassCreateFailed(state, action);
    case MY_CLASS_CREATE_FULFILLED: return myClass.myClassCreateFulfilled(state, action);
    case MY_CLASS_GET_ATTEMPT: return myClass.myClassGetAttempt(state, action);
    case MY_CLASS_GET_FAILED: return myClass.myClassGetFailed(state, action);
    case MY_CLASS_GET_FULFILLED: return myClass.myClassGetFulfilled(state, action);
    case MY_CLASS_UPDATE_ATTEMPT: return myClass.myClassUpdateAttempt(state, action);
    case MY_CLASS_UPDATE_FAILED: return myClass.myClassUpdateFailed(state, action);
    case MY_CLASS_UPDATE_FULFILLED: return myClass.myClassUpdateFulfilled(state, action);
    case MY_CLASS_DELETE_ATTEMPT: return myClass.myClassDeleteAttempt(state, action);
    case MY_CLASS_DELETE_FAILED: return myClass.myClassDeleteFailed(state, action);
    case MY_CLASS_DELETE_FULFILLED: return myClass.myClassDeleteFulfilled(state, action);
  }
  return state;
}