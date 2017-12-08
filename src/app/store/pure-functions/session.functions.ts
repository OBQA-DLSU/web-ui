import { tassign } from 'tassign';
export const sessionCreateAttempt = (state, action) => {
  return tassign(state, {
    user: state.user,
    token: state.token
  });
};

export const sessionCreate = (state, action) => {
  return tassign( state, {
    user: action.user,
    token: action.token
  });
};

export const sessionCreateFailed = (state, action) => {
  return tassign( state, {
    user: state.user,
    token: state.token
  });
};

export const sessionCheckAttempt = (state, action) => {
  return tassign(state, {
    user: state.user,
    token: state.token
  });
};

export const sessionCheckFulfilled = (state, action) => {
  return tassign(state, {
    user: action.user,
    token: action.token
  });
};

export const sessionCheckFailed = (state, action) => {
  return tassign(state, {
    user: state.user,
    token: state.token
  });
};

export const sessionDestroy = (state, action) => {
  return tassign(state, {
    user: null,
    token: ''
  });
};
