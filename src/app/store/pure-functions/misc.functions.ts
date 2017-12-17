import { tassign } from 'tassign';
import { lodash as _ } from 'lodash';

export const getInvitationCodeFulfilled = (state, action) => {
  return tassign(state, {
    invitationCode: action.payload
  });
};
