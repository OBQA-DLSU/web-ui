import { IMyClassView } from '../interfaces/myClass/my-class-view.interface';
import {
  GET_MY_CLASS_STUDENT_ATTEMPT,
  GET_MY_CLASS_STUDENT_FULFILLED,
  GET_MY_CLASS_STUDENT_REJECT
} from './action/student.action';
import * as myStudent from './pure-functions/student.functions';

export interface IMyStudentStore {
  myClassStudents: IMyClassView[];
  error: string;
}

export const MY_CLASS_STUDENT_INITIAL_STATE: IMyStudentStore = {
  myClassStudents: [],
  error: ''
}

export function myStudentReducer (state: IMyStudentStore = MY_CLASS_STUDENT_INITIAL_STATE, action) {
  switch (action.type) {
    case GET_MY_CLASS_STUDENT_ATTEMPT: return myStudent.getMyClassStudentAttempt(state, action);
    case GET_MY_CLASS_STUDENT_FULFILLED: return myStudent.getMyClassStudentFulfilled(state, action);
    case GET_MY_CLASS_STUDENT_REJECT: return myStudent.getMyClassStudentFailed(state, action);
  }
  return state;
}
