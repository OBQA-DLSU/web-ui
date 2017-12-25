import { tassign } from 'tassign';
import * as _ from 'lodash';

export const sopiCreateAttempt = (state, action) => {
  return tassign(state, {
    ...state
  });
};

export const sopiCreateFulfilled = (state, action) => {
  return tassign(state, {
    sopis: [
      ...state.sopis,
      action.sopi
    ],
    error: ''
  });
};

export const sopiCreateFailed = (state, action) => {
  return tassign(state, {
    ...state,
    error: action.error
  });
};

export const sopiUpdateAttempt = (state, action) => {
  return tassign(state, {
    sopis: state.sopis,
    error: ''
  });
};

export const sopiUpdateFulfilled = (state, action) => {
  const index = _.find(state.sopis, 'id', action.sopi.id);
  let newArray = state.sopis.slice();
  newArray.splice(index, 0, action.sopi);

  return tassign(state, {
    sopis: newArray,
    error: ''
  });
};

export const sopiUpdateFailed = (state, action) => {
  return tassign(state, {
    sopis: state.sopis,
    error: action.error
  });
};

export const sopiGetAttempt = (state, action) => {
  return tassign(state, {
    sopis: state.sopis,
    error: ''
  });
};

export const sopiGetFulfilled = (state, action) => {
  return tassign(state, {
    sopis: action.sopis,
    error: ''
  });
};

export const sopiGetFailed = (state, action) => {
  return tassign(state, {
    sopis: state.sopis,
    error: action.error
  });
};

export const sopiDeleteAttempt = (state, action) => {
  return tassign(state, {
    sopis: state.sopis,
    error: ''
  });
};

export const sopiDeleteFulfilled = (state, action) => {
  const index = _.find(state.sopis, 'id', action.sopi.id);
  const newArray = _.remove(state.sopis, (n) => {
    return n.id !== index;
  });
  return tassign(state, {
    sopis: newArray,
    error: ''
  });
};

export const sopiDeleteFailed = (state, action) => {
  return tassign(state, {
    sopis: state.sopis,
    error: action.error
  });
};
