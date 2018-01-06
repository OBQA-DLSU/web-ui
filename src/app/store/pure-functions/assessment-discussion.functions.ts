import { tassign } from 'tassign';
import * as _ from 'lodash';



export const assessmentDiscussionCreateAttempt = (state, action) => {
  return tassign(state, {
    ...state
  });
};

export const assessmentDiscussionCreateFulfilled = (state, action) => {
  return tassign(state, {
    assessmentDiscussions: [
      action.payload,
      ...state.assessmentDiscussions
    ],
    error: ''
  });
};

export const assessmentDiscussionCreateFailed = (state, action) => {
  return tassign(state, {
    ...state,
    error: action.error
  });
};

export const assessmentDiscussionUpdateAttempt = (state, action) => {
  return tassign(state, {
    assessmentDiscussions: state.assessmentDiscussions,
    error: ''
  });
};

export const assessmentDiscussionUpdateFulfilled = (state, action) => {
  const index = _.findIndex(state.assessmentDiscussions, (a) => { return a.id == action.payload.id });
  let newArray = state.assessmentDiscussions.slice();
  newArray.splice(index, 1, action.payload);
  return tassign(state, {
    assessmentDiscussions: newArray,
    error: ''
  });
};

export const assessmentDiscussionUpdateFailed = (state, action) => {
  return tassign(state, {
    assessmentDiscussions: state.assessmentDiscussions,
    error: action.error
  });
};

export const assessmentDiscussionGetAttempt = (state, action) => {
  return tassign(state, {
    assessmentDiscussions: state.assessmentDiscussions,
    error: ''
  });
};

export const assessmentDiscussionGetFulfilled = (state, action) => {
  return tassign(state, {
    assessmentDiscussions: action.payload,
    error: ''
  });
};

export const assessmentDiscussionGetFailed = (state, action) => {
  return tassign(state, {
    assessmentDiscussions: state.assessmentDiscussions,
    error: action.error
  });
};

export const assessmentDiscussionDeleteAttempt = (state, action) => {
  return tassign(state, {
    assessmentDiscussions: state.assessmentDiscussions,
    error: ''
  });
};

export const assessmentDiscussionDeleteFulfilled = (state, action) => {
  const newArray = _.remove(state.assessmentDiscussions, (n) => {
    return n.id != action.payload.id;
  });
  return tassign(state, {
    assessmentDiscussions: newArray,
    error: ''
  });
};

export const assessmentDiscussionDeleteFailed = (state, action) => {
  return tassign(state, {
    assessmentDiscussions: state.assessmentDiscussions,
    error: action.error
  });
};
