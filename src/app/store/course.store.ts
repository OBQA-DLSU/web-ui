import { ICourseView } from '../interfaces/course/course-view.interface';
import {
  COURSE_CREATE_ATTEMPT,
  COURSE_CREATE_FULFILLED,
  COURSE_CREATE_FAILED,
  COURSE_UPDATE_ATTEMPT,
  COURSE_UPDATE_FULFILLED,
  COURSE_UPDATE_FAILED,
  COURSE_GET_ATTEMPT,
  COURSE_GET_FULFILLED,
  COURSE_GET_FAILED,
  COURSE_DELETE_ATTEMPT,
  COURSE_DELETE_FAILED,
  COURSE_DELETE_FULFILLED
} from './action/course.actions';
import * as course from './pure-functions/course.functions';
export interface ICourseStore {
  courses: Array<ICourseView>;
  error: string;
}

export const COURSE_INITIAL_STATE: ICourseStore = {
  courses: [],
  error: ''
}

export function courseReducer(state: ICourseStore = COURSE_INITIAL_STATE, action): ICourseStore {
  switch (action.type){
    case COURSE_CREATE_ATTEMPT: return course.courseCreateAttempt(state, action);
    case COURSE_CREATE_FULFILLED: return course.courseCreateFulfilled(state, action);
    case COURSE_CREATE_FAILED: return course.courseCreateFailed(state, action);
    case COURSE_UPDATE_ATTEMPT: return course.courseUpdateAttempt(state, action);
    case COURSE_UPDATE_FULFILLED: return course.courseUpdateFulfilled(state, action);
    case COURSE_UPDATE_FAILED: return course.courseUpdateFailed(state, action);
    case COURSE_GET_ATTEMPT: return course.courseGetAttempt(state, action);
    case COURSE_GET_FULFILLED: return course.courseGetFulfilled(state, action);
    case COURSE_GET_FAILED: return course.courseGetFailed(state, action);
    case COURSE_DELETE_ATTEMPT: return course.courseDeleteAttempt(state, action);
    case COURSE_DELETE_FAILED: return course.courseDeleteFailed(state, action);
    case COURSE_DELETE_FULFILLED: return course.courseDeleteFulfilled(state, action);
  }
  return state;
};
