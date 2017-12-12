import { tassign } from 'tassign';
import { lodash as _ } from 'lodash';

export const myClassCreateAttempt = (state, action) => {
  return tassign(state, {
    ...state
  });
};

export const myClassCreateFulfilled = (state, action) => {
  return tassign(state, {
    myClasses: [
      ...state.myClasses,
      action.myClass
    ],
    error: ''
  });
};

export const myClassCreateFailed = (state, action) => {
  return tassign(state, {
    ...state,
    error: action.error
  });
};

export const myClassUpdateAttempt = (state, action) => {
  return tassign(state, {
    myClasses: state.myClasses,
    error: ''
  });
};

export const myClassUpdateFulfilled = (state, action) => {
  const index = _.find(state.myClasses, 'id', action.myClass.id);
  let newArray = state.myClasses.slice();
  newArray.splice(index, 0, action.myClass);

  return tassign(state, {
    myClasses: newArray,
    error: ''
  });
};

export const myClassUpdateFailed = (state, action) => {
  return tassign(state, {
    myClasses: state.myClasses,
    error: action.error
  });
};

export const myClassGetAttempt = (state, action) => {
  return tassign(state, {
    myClasses: state.myClasses,
    error: ''
  });
};

export const myClassGetFulfilled = (state, action) => {
  return tassign(state, {
    myClasses: action.myClasses,
    error: ''
  });
};

export const myClassGetFailed = (state, action) => {
  return tassign(state, {
    myClasses: state.myClasses,
    error: action.error
  });
};

export const myClassDeleteAttempt = (state, action) => {
  return tassign(state, {
    myClasses: state.myClasses,
    error: ''
  });
};

export const myClassDeleteFulfilled = (state, action) => {
  const index = _.find(state.myClasses, 'id', action.myClass.id);
  const newArray = _.remove(state.myClasses, (n) => {
    return n.id !== index;
  });
  return tassign(state, {
    myClasses: newArray,
    error: ''
  });
};

export const myClassDeleteFailed = (state, action) => {
  return tassign(state, {
    myClasses: state.myClasses,
    error: action.error
  });
};
