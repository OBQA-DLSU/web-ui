import { IAssessment } from '../assessment/assessment.interface';
export interface IMyClassAssessment {
  id?: number;
  myClassId?: number;
  assessmentId?: number;
  assessment: IAssessment;
}