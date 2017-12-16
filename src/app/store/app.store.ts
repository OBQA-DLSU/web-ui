import { combineReducers } from 'redux';
import { SESSION_INITIAL_STATE, sessionReducer as session, ISessionStore } from './session.store';
import { USER_INITIAL_STATE, userReducer as user, IUserStore } from './user.store';
import { COURSE_INITIAL_STATE, courseReducer as courses, ICourseStore } from './course.store';
import { MY_CLASS_INITIAL_STORE, myClassReducer as myClasses, IMyClassStore } from './my-class.store';

export interface IAppState {
  session: ISessionStore;
  user: IUserStore;
  courses: ICourseStore;
  myClasses: IMyClassStore;
}

export const INITIAL_STATE: IAppState = {
  session: SESSION_INITIAL_STATE,
  user: USER_INITIAL_STATE,
  courses: COURSE_INITIAL_STATE,
  myClasses: MY_CLASS_INITIAL_STORE
}

export const rootReducer = combineReducers<IAppState>({
  session,
  user,
  courses,
  myClasses
});
