import {
  CreateUserInput,
  FindAllUsersResponse,
  FindUserByIdInput,
  FindUserByIdResponse,
} from '@/domain/dtos';

export namespace CreateUser {
  export type Input = CreateUserInput;
  export type Output = { id: string };
}

export interface CreateUser {
  createUser(input: CreateUser.Input): Promise<CreateUser.Output>;
}

export namespace FindUserById {
  export type Input = FindUserByIdInput;
  export type Output = FindUserByIdResponse;
}

export interface FindUserById {
  findUserById(input: FindUserById.Input): Promise<FindUserById.Output>;
}

export namespace FindAllUsers {
  export type Input = void;
  export type Output = FindAllUsersResponse;
}

export interface FindAllUsers {
  findAllUsers(input: FindAllUsers.Input): Promise<FindAllUsers.Output>;
}
