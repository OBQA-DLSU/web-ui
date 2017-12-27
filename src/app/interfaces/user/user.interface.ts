import { IStudent } from '../student/student.interface';
import { IInstructor } from '../instructor/instructor.interface';
import { IRole } from '../role/role.interface';

export interface IUser {
  id?: number;
  idNumber: string;
  role?: IRole;
  roleId?: number;
  instructors?: IInstructor[];
  students?: IStudent[];
  fname?: string;
  lname?: string;
  email: string;
}
