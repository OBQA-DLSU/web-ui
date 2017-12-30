import { tassign } from 'tassign';
import * as _ from 'lodash';

export const getMyClassStudentAttempt = (state, action) => {
  return tassign(state, {
    myClassStudents: state.students,
    error: ''
  });
};

export const getMyClassStudentFulfilled = (state, action) => {
  return tassign(state, {
    myClassStudents: action.payload,
    error: ''
  });
};

export const getMyClassStudentFailed = (state, action) => {
  return tassign(state, {
    myClassStudents: state.students,
    error: action.error
  });
};