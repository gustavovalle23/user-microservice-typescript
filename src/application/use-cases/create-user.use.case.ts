import { User } from '@/application/dtos';
import { Inject } from '@nestjs/common';
import {
  CreateUser,
  FindUserById,
  USER_REPOSITORY,
} from '@/domain/contracts/repo';
import { Jwt, JWT_SERVICE } from '@/domain/contracts/gateways';
import DefaultUseCase from '@/@seedwork/application/use-case';

export namespace CreateUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      @Inject(USER_REPOSITORY)
      private readonly userRepo: CreateUser & FindUserById,
      @Inject(JWT_SERVICE)
      private readonly jwt: Jwt,
    ) {}

    async execute(createUserInput: Input): Promise<Output> {
      const { id } = await this.userRepo.createUser(createUserInput);
      const user = await this.userRepo.findUserById({
        userId: id,
      });

      const { accessToken, refreshToken } = await this.jwt.validate({
        email: createUserInput.email,
        password: createUserInput.password,
      });

      return {
        user,
        accessToken,
        refreshToken,
      };
    }
  }

  type Input = {
    email: string;
    name: string;
    isActive: boolean;
    password: string;
    documentNo: string;
    birthDate: Date;
  };

  type Output = {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}
