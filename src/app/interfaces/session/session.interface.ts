import { IUser } from '../user/user.interface';
import { IProgram } from '../program/program.interface';
export interface ISession {
	user: IUser;
	token: string;
	isStudent: boolean;
	program: IProgram;
	programId: number;
	isAdmin: boolean;
}