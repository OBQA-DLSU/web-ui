import { tassign } from 'tassign';

export const toggleUserCreate = (state, action) => {
  return tassign(state, {
    ...state,
    toggleSignup: true
  });
};

export const userCreateAttempt = (state, action) => {
  return tassign(state, {
    ...state
  });
};

export const userCreateFulfilled = (state, action) => {
  return tassign(state, {
    id: action.id,
    idNumber: action.idNumber,
    role: action.role,
    program: action.program,
    fname: action.fname,
    lname: action.lname,
    email: action.email,
    error: '',
    toggleSignup: false
  });
};

export const userCreateFailed = (state, action) => {
  return tassign(state, {
    ...state,
    error: action.error,
    toggleSignup: true
  });
};