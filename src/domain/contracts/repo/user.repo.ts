import { User } from '@/domain/entities';

export const USER_REPOSITORY = 'UserRepo';

export namespace CreateUser {
  export type Input = {
    email: string;
    name: string;
    isActive: boolean;
    password: string;
    cpf: string;
    birthDate: Date;
  };
  export type Output = User;
}

export interface CreateUser {
  create(input: CreateUser.Input): Promise<CreateUser.Output>;
}

export namespace FindUserById {
  export type Input = { userId: string };
  export type Output = User;
}

export interface FindUserById {
  findById(input: FindUserById.Input): Promise<FindUserById.Output>;
}

export namespace FindAllUsers {
  export type Input = void;
  export type Output = User[];
}

export interface FindAllUsers {
  findAll(input: FindAllUsers.Input): Promise<FindAllUsers.Output>;
}
