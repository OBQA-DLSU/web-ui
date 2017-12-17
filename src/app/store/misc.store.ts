
import {
  GET_INVITATION_CODE_FULFILLED
} from './action/misc.actions';
import * as misc from './pure-functions/misc.functions';
export interface IMiscStore {
  invitationCode: string;
}

export const MISC_INITIAL_STATE: IMiscStore= {
  invitationCode: ''
}

export function miscReducer(state: IMiscStore = MISC_INITIAL_STATE, action): IMiscStore {
  switch (action.type){
    case GET_INVITATION_CODE_FULFILLED: return misc.getInvitationCodeFulfilled(state, action);
  }
  return state;
};
