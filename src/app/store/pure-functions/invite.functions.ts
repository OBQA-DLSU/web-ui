import { tassign } from 'tassign';
import * as _ from 'lodash';

export const sendInvtesFulfilled = (state, action) => {
  return tassign(state, {
    groupInviteStatus: action.payload,
    error: ''
  });
};

export const sendInvtesFailed = (state, action) => {
  return tassign(state, {
    groupInviteStatus: state.groupInviteStatus,
    error: action.error
  });
};