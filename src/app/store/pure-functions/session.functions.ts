import { tassign } from 'tassign';
import * as _ from 'lodash';

export const sessionCreateAttempt = (state, action) => {
  return tassign(state, {
    user: state.user,
    token: state.token,
    error: null
  });
};

export const sessionCreateFulfilled = (state, action) => {
  return tassign( state, {
    user: action.payload.user,
    token: action.payload.token,
    error: null
  });
};

export const sessionCreateFailed = (state, action) => {
  return tassign( state, {
    user: state.user,
    token: state.token,
    error: action.error
  });
};

export const sessionCheckAttempt = (state, action) => {
  return tassign(state, {
    user: state.user,
    token: state.token,
    error: null
  });
};

export const sessionCheckFulfilled = (state, action) => {
  return tassign(state, {
    user: action.payload.user,
    token: action.payload.token,
    error: null
  });
};

export const sessionCheckFailed = (state, action) => {
  return tassign(state, {
    user: state.user,
    token: state.token,
    error: action.error
  });
};

export const sessionDestroy = (state, action) => {
  return tassign(state, {
    user: null,
    token: null,
    error: null
  });
};
