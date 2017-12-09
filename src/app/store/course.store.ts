import { ICourse } from '../interfaces/course/course.interface';
import {
  COURSE_CREATE_ATTEMPT,
  COURSE_CREATE_FULFILLED,
  COURSE_CREATE_FAILED,
  COURSE_UPDATE_ATTEMPT,
  COURSE_UPDATE_FULFILLED,
  COURSE_UPDATE_FAILED,
  COURSE_GET_ATTEMPT,
  COURSE_GET_FULFILLED,
  COURSE_GET_FAILED
} from './action/course.actions';
import * as course from './pure-functions/course.functions';
export interface ICourseStore {
  courses: Array<ICourse>;
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
  }
  return state;
};
