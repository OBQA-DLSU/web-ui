import { ISopi } from '../sopi/sopi.interface';
import { IProgram } from '../program/program.interface';

export interface IProgramSopi {
  id: number;
  code: string;
  name: string;
  sopiId: number;
  sopi: ISopi;
  programId: number;
  program: IProgram;
  description: string;
}
