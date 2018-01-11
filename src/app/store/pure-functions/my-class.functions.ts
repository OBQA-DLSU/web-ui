import { tassign } from 'tassign';
import * as _ from 'lodash';

export const myClassCreateAttempt = (state, action) => {
  return tassign(state, {
    ...state
  });
};

export const myClassCreateFulfilled = (state, action) => {
  return tassign(state, {
    myClasses: [
      ...state.myClasses,
      action.payload
    ],
    selectedClass: state.selectedClass,
    error: ''
  });
};

export const myClassCreateFailed = (state, action) => {
  return tassign(state, {
    ...state,
    error: action.error
  });
};

export const myClassSelectAttempt = (state, action) => {
  return tassign(state, {
    myClasses: state.myClasses,
    selectedClass: state.selectedClass,
    error: ''
  });
};

export const myClassSelectFulfilled = (state, action) => {
  return tassign(state, {
    myClasses: state.myClasses,
    selectedClass: action.payload,
    error: ''
  });
};

export const myClassSelectFailed = (state, action) => {
  return tassign(state, {
    myClasses: state.myClasses,
    selectedClass: state.selectedClass,
    error: action.error
  });
};

export const myClassUpdateAttempt = (state, action) => {
  return tassign(state, {
    myClasses: state.myClasses,
    selectedClass: state.selectedClass,
    error: ''
  });
};

export const myClassUpdateFulfilled = (state, action) => {
  const index = _.findIndex(state.myClasses, (c) => { return c.id == action.payload.id });
  let newArray = state.myClasses.slice();
  newArray.splice(index, 1, action.payload);
  return tassign(state, {
    myClasses: newArray,
    selectedClass: state.selectedClass,
    error: ''
  });
};

export const myClassUpdateFailed = (state, action) => {
  return tassign(state, {
    myClasses: state.myClasses,
    selectedClass: state.selectedClass,
    error: action.error
  });
};

export const myClassGetAttempt = (state, action) => {
  return tassign(state, {
    myClasses: state.myClasses,
    selectedClass: state.selectedClass,
    error: ''
  });
};

export const myClassGetFulfilled = (state, action) => {
  return tassign(state, {
    myClasses: action.payload,
    selectedClass: state.selectedClass,
    error: ''
  });
};

export const myClassGetFailed = (state, action) => {
  return tassign(state, {
    myClasses: state.myClasses,
    selectedClass: state.selectedClass,
    error: action.error
  });
};

export const myClassDeleteAttempt = (state, action) => {
  return tassign(state, {
    myClasses: state.myClasses,
    selectedClass: state.selectedClass,
    error: ''
  });
};

export const myClassDeleteFulfilled = (state, action) => {
  const newArray = _.remove(state.myClasses, (n) => {
    return n.id != action.payload.id;
  });
  return tassign(state, {
    myClasses: newArray,
    selectedClass: state.selectedClass,
    error: ''
  });
};

export const myClassDeleteFailed = (state, action) => {
  return tassign(state, {
    myClasses: state.myClasses,
    selectedClass: state.selectedClass,
    error: action.error
  });
};
