import { IInstructor } from '../instructor/instructor.interface';
import { IProgramCourse } from '../programCourse/program-course.interface';
import { IStudent } from '../student/student.interface';

export interface IMyClass {
  id?: number;
  instructorId?: number;
  instructor?: IInstructor;
  programCourseId?: number;
  programCourse?: IProgramCourse;
  term: number;
  academicYear: string;
  cycle: number;
  students: Array<IStudent>;
}