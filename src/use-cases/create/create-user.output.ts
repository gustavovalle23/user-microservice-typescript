import { UserOutput } from '../dto';

export type CreateUserOutput = {
  user: UserOutput;
  accessToken: string;
};
