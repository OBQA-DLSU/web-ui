import { IAssessmentDiscussionView } from './assessment-discussion-view.interface';
export interface IAssessmentView {
  id?: number;
  assessmentLevel?: number;
  assessmentTask?: string;
  target?: number;
  passingGrade?: number;
  performance?: number;
  improvementPlan?: string;
  term?: number;
  academicYear?: string;
  cycle?: number;
  programId?: number;
  programSopiId?: number;
  programCourseId?: number;
  program?: string;
  sopi?: string;
  course?: string;
  assessmentDiscussions?: IAssessmentDiscussionView[]
}
