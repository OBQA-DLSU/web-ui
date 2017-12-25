import { tassign } from 'tassign';
import * as _ from 'lodash';

export const getInvitationCodeFulfilled = (state, action) => {
  return tassign(state, {
    invitationCode: action.payload
  });
};
