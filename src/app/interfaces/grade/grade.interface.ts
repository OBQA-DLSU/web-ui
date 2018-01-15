import { IStudent } from '../student/student.interface';
import { IInstructor } from '../instructor/instructor.interface';
import { IProgramSopi } from '../programSopi/program-sopi.interface';
import { IProgramCourse } from '../programCourse/program-course.interface';
import { IAssessment } from '../assessment/assessment.interface';
import { IMyClass } from '../myClass/my-class.interface';

export interface IGrade {
  id: number;
  academicYear?: string;
  term?: number;
  cycle?: number;
  student?: IStudent;
  studentId?: number;
  instructor?: IInstructor;
  instructorId?: number;
  programCourse?: IProgramCourse;
  programCourseId?: number;
  programSopi?: IProgramSopi;
  programSopiId?: number;
  assessment?: IAssessment;
  assessmentId?: number;
  myClass?: IMyClass;
  myClassId?: number;
  grade: number;
}
