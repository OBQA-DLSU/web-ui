import { ICourse } from '../course/course.interface';
import { IProgram } from '../program/program.interface';

export interface IProgramCourse {
  id?: number;
  programId?: number;
  courseId?: number;
  program?: IProgram;
  course?: ICourse;
  description?: string;
  toBeAssessed?: boolean;
}
