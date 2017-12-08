import { IUser } from './user.interface';

export interface IUserCreate extends IUser {
  password: string;
  confirmation: string;
  invitationCode: string;
}
