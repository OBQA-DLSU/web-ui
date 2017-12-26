import { IProgram } from '../program/program.interface';
import { IProgramSopi } from '../programSopi/program-sopi.interface';
import { IProgramCourse } from '../programCourse/program-course.interface';
export interface IAssessment {
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
  program?: IProgram;
  programSopi?: IProgramSopi;
  programCourse?: IProgramCourse;
}
