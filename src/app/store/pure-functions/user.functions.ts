import { tassign } from 'tassign';

export const toggleUserCreate = (state, action) => {
  return tassign(state, {
    ...state
  });
};

export const userCreateAttempt = (state, action) => {
  return tassign(state, {
    ...state
  });
};

export const userCreateFulfilled = (state, action) => {
  return tassign(state, {
    user: action.payload.user,
    error: ''
  });
};

export const userCreateFailed = (state, action) => {
  return tassign(state, {
    user: state.user,
    error: action.error
  });
};