import { IUser } from '../user/user.interface';
import { IProgram } from '../program/program.interface';

export interface IStudent extends IUser {
  program?: IProgram;
}