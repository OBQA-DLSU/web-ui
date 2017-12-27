import { tassign } from 'tassign';
import * as _ from 'lodash';

export const getInvitationCodeFulfilled = (state, action) => {
  return tassign(state, {
    invitationCode: action.payload,
    toggleForgotPassword: false
  });
};

export const toggleForgotPassword = (state, action) => {
  return tassign(state, {
    invitationCode: state.invitationCode,
    toggleForgotPassword: (state.toggleForgotPassword) ? false : true
  });
};

export const signInBufferPageOn = (state, action) => {
  return tassign(state, {
    invitationCode: state.invitationCode,
    toggleForgotPassword: false,
    signInBufferPage: true
  });
};

export const signInBufferPageOff = (state, action) => {
  return tassign(state, {
    invitationCode: state.invitationCode,
    toggleForgotPassword: false,
    signInBufferPage: false
  });
};
