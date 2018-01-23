import { IProgram } from '../program/program.interface';
import { IAssessment } from '../assessment/assessment.interface';
import { IMyClass } from '../myClass/my-class.interface';
import { IProgramCourse } from '../programCourse/program-course.interface';
import { IProgramSopi } from '../programSopi/program-sopi.interface';

export interface IEvidence {
  id: number;
  name?: string;
  googleId?: string;
  mimeType?: string;
  type?: string;
  programId?: number;
  program?: IProgram;
  assessmentId?: number;
  assessment?: IAssessment;
  myClassId?: number;
  myClass?: IMyClass;
  programCourseId?: number;
  programCourse?: IProgramCourse;
  programSopiId?: number;
  programSopi?: IProgramSopi;
}
