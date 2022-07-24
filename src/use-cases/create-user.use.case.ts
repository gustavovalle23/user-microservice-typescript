import { CreateUserInput, CreateUserResponse } from '@/dtos';
import { UserRepository } from '@/infra/repositories';

export class CreateUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async perform(user: CreateUserInput): Promise<CreateUserResponse> {
    return this.userRepo.createUser(user);
  }
}
