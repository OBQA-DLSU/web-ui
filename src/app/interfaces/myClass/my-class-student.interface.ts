import { IStudent } from '../student/student.interface';

export interface IMyClassStudent {
  id?: number;
  studentId?: number;
  myClassId?: number;
  student?: IStudent;
}
