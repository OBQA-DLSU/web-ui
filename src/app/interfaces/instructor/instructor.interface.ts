import { IUser } from '../user/user.interface';
import { IProgram } from '../program/program.interface';

export interface IInstructor {
  id?: number;
  isAdmin?: boolean;
  user?: IUser;
  programId?: number;
  program: IProgram;
  userId?: number;
}

