
import {
  GET_INVITATION_CODE_FULFILLED,
  TOGGLE_FORGOT_PASSWORD,
  SIGN_IN_BUFFER_PAGE_OFF,
  SIGN_IN_BUFFER_PAGE_ON,
  UPDATE_PAGE_TITLE_FULFILLED,
  LOAD_SPINNER,
  UNLOAD_SPINNER
} from './action/misc.actions';
import * as misc from './pure-functions/misc.functions';
export interface IMiscStore {
  invitationCode: string;
  toggleForgotPassword: boolean;
  signInBufferPage: boolean;
  pageTitle: string;
  spinner: boolean;
}

export const MISC_INITIAL_STATE: IMiscStore= {
  invitationCode: '',
  toggleForgotPassword: false,
  signInBufferPage: false,
  pageTitle: 'Dashboard',
  spinner: false
}

export function miscReducer(state: IMiscStore = MISC_INITIAL_STATE, action): IMiscStore {
  switch (action.type){
    case GET_INVITATION_CODE_FULFILLED: return misc.getInvitationCodeFulfilled(state, action);
    case TOGGLE_FORGOT_PASSWORD: return misc.toggleForgotPassword(state, action);
    case SIGN_IN_BUFFER_PAGE_OFF: return misc.signInBufferPageOff(state, action);
    case SIGN_IN_BUFFER_PAGE_ON: return misc.signInBufferPageOn(state, action);
    case UPDATE_PAGE_TITLE_FULFILLED: return misc.updatePageTitleFulfilled(state, action);
    case LOAD_SPINNER: return misc.loadSpinner(state, action);
    case UNLOAD_SPINNER: return misc.unloadSpinner(state, action);
  }
  return state;
};
