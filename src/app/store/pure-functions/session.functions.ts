import { tassign } from 'tassign';
import * as _ from 'lodash';

export const sessionCreateAttempt = (state, action) => {
  return tassign(state, {
    user: state.user,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    programId: state.programId,
    program: state.program,
    token: state.token,
    error: null
  });
};

export const sessionCreateFulfilled = (state, action) => {
  return tassign( state, {
    user: action.payload.user,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    programId: state.programId,
    program: state.program,
    token: action.payload.token,
    error: ''
  });
};

export const sessionCreateFailed = (state, action) => {
  return tassign( state, {
    user: state.user,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    programId: state.programId,
    program: state.program,
    token: state.token,
    error: action.error
  });
};

export const sessionCheckAttempt = (state, action) => {
  return tassign(state, {
    user: state.user,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    programId: state.programId,
    program: state.program,
    token: state.token,
    error: ''
  });
};

export const sessionCheckFulfilled = (state, action) => {
  return tassign(state, {
    isStudent: action.payload.isStudent,
    isAdmin: action.payload.isAdmin,
    programId: action.payload.programId,
    program: action.payload.program,
    user: action.payload.user,
    token: action.payload.token,
    error: ''
  });
};

export const sessionCheckFailed = (state, action) => {
  return tassign(state, {
    user: state.user,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    programId: state.programId,
    program: state.program,
    token: state.token,
    error: action.error
  });
};

export const sessionDestroy = (state, action) => {
  return tassign(state, {
    user: null,
    isStudent: null,
    isAdmin: null,
    programId: null,
    program: null,
    token: null,
    error: ''
  });
};

export const sessionUpdateFulfilled = (state, action) => {
  return tassign(state, {
    user: state.user,
    isStudent: action.payload.isStudent,
    isAdmin: action.payload.isAdmin,
    programId: action.payload.programId,
    program: action.payload.program,
    token: state.token,
    error: null
  });
};

export const sessionUpdateFailed = (state, action) => {
  return tassign(state, {
    user: state.user,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    programId: state.programId,
    program: state.program,
    token: state.token,
    error: action.error
  });
};

export const sessionPasswordChangeAttempt = (state, action) => {
  return tassign(state, {
    user: state.user,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    programId: state.programId,
    program: state.program,
    token: state.token,
    error: ''
  });
};

export const sessionPasswordChangeFulfilled = (state, action) => {
  return tassign(state, {
    user: state.user,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    programId: state.programId,
    program: state.program,
    token: action.payload.token,
    error: ''
  });
};

export const sessionPasswordChangeFailed = (state, action) => {
  return tassign(state, {
    user: state.user,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    programId: state.programId,
    program: state.program,
    token: state.token,
    error: action.error
  });
};
