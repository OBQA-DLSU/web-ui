import { tassign } from 'tassign';
import { lodash as _ } from 'lodash';



export const courseCreateAttempt = (state, action) => {
  return tassign(state, {
    ...state
  });
};

export const courseCreateFulfilled = (state, action) => {
  return tassign(state, {
    courses: [
      ...state.courses,
      action.course
    ],
    error: ''
  });
};

export const courseCreateFailed = (state, action) => {
  return tassign(state, {
    ...state,
    error: action.error
  });
};

export const courseUpdateAttempt = (state, action) => {
  return tassign(state, {
    courses: state.courses,
    error: ''
  });
};

export const courseUpdateFulfilled = (state, action) => {
  const index = _.find(state.courses, 'id', action.course.id);
  let newArray = state.courses.slice();
  newArray.splice(index, 0, action.course);

  return tassign(state, {
    courses: newArray,
    error: ''
  });
};

export const courseUpdateFailed = (state, action) => {
  return tassign(state, {
    courses: state.courses,
    error: action.error
  });
};

export const courseGetAttempt = (state, action) => {
  return tassign(state, {
    courses: state.courses,
    error: ''
  });
};

export const courseGetFulfilled = (state, action) => {
  console.log(action);
  return tassign(state, {
    courses: action.courses,
    error: ''
  });
};

export const courseGetFailed = (state, action) => {
  return tassign(state, {
    courses: state.courses,
    error: action.error
  });
};