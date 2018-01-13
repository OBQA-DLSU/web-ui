import { tassign } from 'tassign';
import * as _ from 'lodash';

export const sessionCreateAttempt = (state, action) => {
  return tassign(state, {
    user: state.user,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    programId: state.programId,
    instructorId: state.instructorId,
    program: state.program,
    token: state.token,
    spinner: true,
    error: null
  });
};

export const sessionCreateFulfilled = (state, action) => {
  return tassign( state, {
    user: action.payload.user,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    programId: state.programId,
    instructorId: state.instructorId,
    program: state.program,
    token: action.payload.token,
    spinner: false,
    error: ''
  });
};

export const sessionCreateFailed = (state, action) => {
  return tassign( state, {
    user: state.user,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    programId: state.programId,
    instructorId: state.instructorId,
    program: state.program,
    token: state.token,
    spinner: false,
    error: action.error
  });
};

export const sessionCheckAttempt = (state, action) => {
  return tassign(state, {
    user: state.user,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    programId: state.programId,
    instructorId: state.instructorId,
    program: state.program,
    token: state.token,
    spinner: true,
    error: ''
  });
};

export const sessionCheckFulfilled = (state, action) => {
  return tassign(state, {
    isStudent: action.payload.isStudent,
    isAdmin: action.payload.isAdmin,
    programId: action.payload.programId,
    program: action.payload.program,
    instructorId: action.payload.instructorId,
    user: action.payload.user,
    token: action.payload.token,
    spinner: false,
    error: ''
  });
};

export const sessionCheckFailed = (state, action) => {
  return tassign(state, {
    user: state.user,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    programId: state.programId,
    instructorId: state.instructorId,
    program: state.program,
    token: state.token,
    spinner: false,
    error: action.error
  });
};

export const sessionDestroy = (state, action) => {
  return tassign(state, {
    user: null,
    isStudent: null,
    isAdmin: null,
    programId: null,
    instructorId: null,
    program: null,
    token: null,
    spinner: false,
    error: ''
  });
};

export const sessionUpdateAttempt = (state, action) => {
  return tassign(state, {
    user: state.user,
    isStudent: state.payload.isStudent,
    isAdmin: state.payload.isAdmin,
    programId: state.payload.programId,
    instructorId: state.instructorId,
    program: state.payload.program,
    token: state.token,
    spinner: false,
    error: null
  });
};

export const sessionUpdateFulfilled = (state, action) => {
  const index = _.findIndex(state.user.instructors, (i) => { return i.programId === action.payload.programId });
  return tassign(state, {
    user: state.user,
    isStudent: action.payload.isStudent,
    isAdmin: action.payload.isAdmin,
    programId: action.payload.programId,
    instructorId: state.user.instructors[index].id,
    program: action.payload.program,
    token: state.token,
    spinner: false,
    error: null
  });
};

export const sessionUpdateFailed = (state, action) => {
  return tassign(state, {
    user: state.user,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    programId: state.programId,
    instructorId: state.instructorId,
    program: state.program,
    token: state.token,
    spinner: false,
    error: action.error
  });
};

export const sessionPasswordChangeAttempt = (state, action) => {
  return tassign(state, {
    user: state.user,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    programId: state.programId,
    instructorId: state.instructorId,
    program: state.program,
    token: state.token,
    spinner: true,
    error: ''
  });
};

export const sessionPasswordChangeFulfilled = (state, action) => {
  return tassign(state, {
    user: state.user,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    programId: state.programId,
    instructorId: state.instructorId,
    program: state.program,
    token: action.payload.token,
    spinner: false,
    error: ''
  });
};

export const sessionPasswordChangeFailed = (state, action) => {
  return tassign(state, {
    user: state.user,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    programId: state.programId,
    instructorId: state.instructorId,
    program: state.program,
    token: state.token,
    spinner: false,
    error: action.error
  });
};
