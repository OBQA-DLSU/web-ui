import { tassign } from 'tassign';
import * as _ from 'lodash';



export const assessmentCreateAttempt = (state, action) => {
  return tassign(state, {
    ...state
  });
};

export const assessmentCreateFulfilled = (state, action) => {
  return tassign(state, {
    assessments: [
      ...state.assessments,
      action.payload
    ],
    error: ''
  });
};

export const assessmentCreateFailed = (state, action) => {
  return tassign(state, {
    ...state,
    error: action.error
  });
};

export const assessmentUpdateAttempt = (state, action) => {
  return tassign(state, {
    assessments: state.assessments,
    error: ''
  });
};

export const assessmentUpdateFulfilled = (state, action) => {
  const index = _.findIndex(state.assessments, (a) => { return a.id == action.payload.id });
  let newArray = state.assessments.slice();
  newArray.splice(index, 1, action.payload);
  return tassign(state, {
    assessments: newArray,
    error: ''
  });
};

export const assessmentUpdateFailed = (state, action) => {
  return tassign(state, {
    assessments: state.assessments,
    error: action.error
  });
};

export const assessmentGetAttempt = (state, action) => {
  return tassign(state, {
    assessments: state.assessments,
    error: ''
  });
};

export const assessmentGetFulfilled = (state, action) => {
  return tassign(state, {
    assessments: action.payload,
    error: ''
  });
};

export const assessmentGetFailed = (state, action) => {
  return tassign(state, {
    assessments: state.assessments,
    error: action.error
  });
};

export const assessmentDeleteAttempt = (state, action) => {
  return tassign(state, {
    assessments: state.assessments,
    error: ''
  });
};

export const assessmentDeleteFulfilled = (state, action) => {
  const newArray = _.remove(state.assessments, (n) => {
    return n.id != action.payload.id;
  });
  return tassign(state, {
    assessments: newArray,
    error: ''
  });
};

export const assessmentDeleteFailed = (state, action) => {
  return tassign(state, {
    assessments: state.assessments,
    error: action.error
  });
};

