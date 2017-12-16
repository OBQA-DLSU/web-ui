import { IStudent } from '../student/student.interface';
import { IInstructor } from '../instructor/instructor.interface';
import { IRole } from '../role/role.interface';

export interface IUser {
  id?: number;
  idNumber?: string;
  role?: IRole;
  roleId?: number;
  instructor?: IInstructor[];
  student?: IStudent[];
  fname?: string;
  lname?: string;
  email: string;
}