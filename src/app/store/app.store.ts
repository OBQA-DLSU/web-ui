import { combineReducers } from 'redux';
import { SESSION_INITIAL_STATE, sessionReducer as session, ISessionStore } from './session.store';
import { USER_INITIAL_STATE, userReducer as user, IUserStore } from './user.store';

export interface IAppState {
  session: ISessionStore;
  user: IUserStore
}

export const INITIAL_STATE: IAppState = {
  session: SESSION_INITIAL_STATE,
  user: USER_INITIAL_STATE
}

export const rootReducer = combineReducers<IAppState>({
  session,
  user
});
