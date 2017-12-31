import { IInstructor } from '../instructor/instructor.interface';
export interface IAssessmentDiscussion {
  id?: number;
  instructorId?: number;
  instructor?: IInstructor;
  assessmentId?: number;
  discussion?: string;
  createdAt?: any;
}
