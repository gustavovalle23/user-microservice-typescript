import { User } from '@/domain/entities';

export abstract class UserRepository {
  abstract create(input: CreateUser.Input): Promise<CreateUser.Output>;
  abstract findById(input: FindUserById.Input): Promise<FindUserById.Output>;
  abstract findAll(input: FindAllUsers.Input): Promise<FindAllUsers.Output>;
}

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

export namespace FindUserById {
  export type Input = { userId: string };
  export type Output = User;
}

export namespace FindAllUsers {
  export type Input = void;
  export type Output = User[];
}
