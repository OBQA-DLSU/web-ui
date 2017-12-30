import { IAssessmentView } from '../interfaces/assessment/assessment-view.interface';
import {
  ASSESSMENT_CREATE_ATTEMPT,
  ASSESSMENT_CREATE_FAILED,
  ASSESSMENT_CREATE_FULFILLED,
  ASSESSMENT_DELETE_ATTEMPT,
  ASSESSMENT_DELETE_FAILED,
  ASSESSMENT_DELETE_FULFILLED,
  ASSESSMENT_GET_ATTEMPT,
  ASSESSMENT_GET_FAILED,
  ASSESSMENT_GET_FULFILLED,
  ASSESSMENT_UPDATE_ATTEMPT,
  ASSESSMENT_UPDATE_FAILED,
  ASSESSMENT_UPDATE_FULFILLED
} from './action/assessment.actions';
import * as assessment from './pure-functions/assessment.functions';
export interface IAssessmentStore {
  assessments: Array<IAssessmentView>;
  error: string;
}

export const ASSESSMENT_INITIAL_STORE: IAssessmentStore = {
  assessments: [],
  error: ''
}

export function assessmentReducer(state: IAssessmentStore = ASSESSMENT_INITIAL_STORE, action): IAssessmentStore {
  switch (action.type){
    case ASSESSMENT_CREATE_ATTEMPT: return assessment.assessmentCreateAttempt(state, action);
    case ASSESSMENT_CREATE_FAILED: return assessment.assessmentCreateFailed(state, action);
    case ASSESSMENT_CREATE_FULFILLED: return assessment.assessmentCreateFulfilled(state, action);
    case ASSESSMENT_GET_ATTEMPT: return assessment.assessmentGetAttempt(state, action);
    case ASSESSMENT_GET_FAILED: return assessment.assessmentGetFailed(state, action);
    case ASSESSMENT_GET_FULFILLED: return assessment.assessmentGetFulfilled(state, action);
    case ASSESSMENT_UPDATE_ATTEMPT: return assessment.assessmentUpdateAttempt(state, action);
    case ASSESSMENT_UPDATE_FAILED: return assessment.assessmentUpdateFailed(state, action);
    case ASSESSMENT_UPDATE_FULFILLED: return assessment.assessmentUpdateFulfilled(state, action);
    case ASSESSMENT_DELETE_ATTEMPT: return assessment.assessmentDeleteAttempt(state, action);
    case ASSESSMENT_DELETE_FAILED: return assessment.assessmentDeleteFailed(state, action);
    case ASSESSMENT_DELETE_FULFILLED: return assessment.assessmentDeleteFulfilled(state, action);
  }
  return state;
};
