import { IInstructorView } from '../instructor/instructor-view.interface';
export interface IMyClassView {
  id: number;
  instructorId: number;
  instructor?: IInstructorView;
  programId: number;
  program?: string;
  programCourseId: number;
  course?: string;
  term: number;
  academicYear: string;
  cycle: number;
  students?: Array<any>;
  assessments?: Array<any>;
}
