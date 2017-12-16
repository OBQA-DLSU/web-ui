import { ISession } from '../interfaces/session/session.interface';
import {
  SESSION_CREATE_ATTEMPT,
  SESSION_CREATE_FULFILLED,
  SESSION_CREATE_FAILED,
  SESSION_DESTROY_FULFILLED,
  SESSION_CHECK_ATTEMPT,
  SESSION_CHECK_FULFILLED,
  SESSION_CHECK_FAILED
} from './action/session.actions';
import * as session from './pure-functions/session.functions';
export interface ISessionStore extends ISession {
  error: any;
}

export const SESSION_INITIAL_STATE: ISessionStore = {
  user: {
    id: null,
    idNumber: '',
    roleId: null,
    role: null,
    fname: '',
    lname: '',
    email: '',
    instructor: [],
    student: []
  },
  token: '',
  error: null
}

export function sessionReducer(state: ISessionStore = SESSION_INITIAL_STATE, action): ISessionStore {
  switch (action.type){
    case SESSION_CREATE_ATTEMPT: return session.sessionCreateAttempt(state, action);
    case SESSION_CREATE_FULFILLED: return session.sessionCreateFulfilled(state, action);
    case SESSION_CREATE_FAILED: return session.sessionCreateFailed(state, action);
    case SESSION_DESTROY_FULFILLED: return session.sessionDestroy(state, action);
    case SESSION_CHECK_ATTEMPT: return session.sessionCheckAttempt(state, action);
    case SESSION_CHECK_FULFILLED: return session.sessionCheckFulfilled(state, action);
    case SESSION_CHECK_FAILED: return session.sessionCheckFailed(state, action);
  }
  return state;
};
