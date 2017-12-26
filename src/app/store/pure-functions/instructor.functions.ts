import { tassign } from 'tassign';
import * as _ from 'lodash';



export const instructorCreateAttempt = (state, action) => {
  return tassign(state, {
    ...state
  });
};

export const instructorCreateFulfilled = (state, action) => {
  return tassign(state, {
    instructors: [
      ...state.instructors,
      action.payload
    ],
    error: ''
  });
};

export const instructorCreateFailed = (state, action) => {
  return tassign(state, {
    ...state,
    error: action.error
  });
};

export const instructorUpdateAttempt = (state, action) => {
  return tassign(state, {
    instructors: state.instructors,
    error: ''
  });
};

export const instructorUpdateFulfilled = (state, action) => {
  const index = _.findIndex(state.instructors, (i) => { return i.id == action.payload.id });
  let newArray = state.instructors.slice();
  newArray.splice(index, 1, action.payload);
  return tassign(state, {
    instructors: newArray,
    error: ''
  });
};

export const instructorUpdateFailed = (state, action) => {
  return tassign(state, {
    instructors: state.instructors,
    error: action.error
  });
};

export const instructorGetAttempt = (state, action) => {
  return tassign(state, {
    instructors: state.instructors,
    error: ''
  });
};

export const instructorGetFulfilled = (state, action) => {
  return tassign(state, {
    instructors: action.payload,
    error: ''
  });
};

export const instructorGetFailed = (state, action) => {
  return tassign(state, {
    instructors: state.instructors,
    error: action.error
  });
};

export const instructorDeleteAttempt = (state, action) => {
  return tassign(state, {
    instructors: state.instructors,
    error: ''
  });
};

export const instructorDeleteFulfilled = (state, action) => {
  const newArray = _.remove(state.instructors, (n) => {
    return n.id != action.payload.id;
  });
  return tassign(state, {
    instructors: newArray,
    error: ''
  });
};

export const instructorDeleteFailed = (state, action) => {
  return tassign(state, {
    instructors: state.instructors,
    error: action.error
  });
};

