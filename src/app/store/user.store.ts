import { IUser } from '../interfaces/user/user.interface';
import * as user from './pure-functions/user.functions';
import {
  USER_CREATE_ATTEMPT,
  USER_CREATE_FULFILLED,
  USER_CREATE_FAILED,
  TOGGLE_USER_CREATE
} from './action/user.action';

export interface IUserStore extends IUser {
  error: string;
  toggleSignUp: boolean;
}
export const USER_INITIAL_STATE: IUserStore = {
  id: null,
  idNumber: '',
  role: null,
  programId: null,
  fname: '',
  lname: '',
  email: '',
  error: '',
  toggleSignUp: false
}

export function userReducer(state: IUserStore = USER_INITIAL_STATE, action): IUserStore {
  switch (action.type){
    case USER_CREATE_ATTEMPT: return user.userCreateAttempt(state, action);
    case USER_CREATE_FULFILLED: return user.userCreateFulfilled(state, action);
    case USER_CREATE_FAILED: return user.userCreateFailed(state, action);
    case TOGGLE_USER_CREATE: return user.toggleUserCreate(state, action);
  }
  return state;
};
