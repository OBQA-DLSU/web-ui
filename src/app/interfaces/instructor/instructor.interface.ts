import { IUser } from '../user/user.interface';
import { IProgram } from '../program/program.interface';

export interface IInstructor extends IUser {
  program: IProgram;
}