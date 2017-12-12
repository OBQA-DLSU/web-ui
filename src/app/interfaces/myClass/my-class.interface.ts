import { IInstructor } from '../instructor/instructor.interface';
import { IProgramCourse } from '../programCourse/program-course.interface';
import { IStudent } from '../student/student.interface';

export interface IMyClass {
  id?: number;
  instructorId?: number;
  instructor?: IInstructor;
  programCourse?: IProgramCourse;
  term: number;
  academicYear: string;
  students: Array<IStudent>;
}