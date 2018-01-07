import { tassign } from 'tassign';
import * as _ from 'lodash';

export const getInvitationCodeFulfilled = (state, action) => {
  return tassign(state, {
    invitationCode: action.payload,
    toggleForgotPassword: false,
    pageTitle: state.pageTitle
  });
};

export const toggleForgotPassword = (state, action) => {
  return tassign(state, {
    invitationCode: state.invitationCode,
    toggleForgotPassword: (state.toggleForgotPassword) ? false : true,
    pageTitle: state.pageTitle
  });
};

export const signInBufferPageOn = (state, action) => {
  return tassign(state, {
    invitationCode: state.invitationCode,
    toggleForgotPassword: false,
    signInBufferPage: true,
    pageTitle: state.pageTitle
  });
};

export const signInBufferPageOff = (state, action) => {
  return tassign(state, {
    invitationCode: state.invitationCode,
    toggleForgotPassword: false,
    signInBufferPage: false,
    pageTitle: state.pageTitle
  });
};

export const updatePageTitleFulfilled = (state, action) => {
  return tassign(state, {
    invitationCode: state.invitationCode,
    toggleForgotPassword: state.toggleForgotPassword,
    signInBufferPage: state.signInBufferPage,
    pageTitle: action.payload
  });
};
