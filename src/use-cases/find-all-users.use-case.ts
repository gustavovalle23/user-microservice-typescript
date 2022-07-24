import { User } from '@/infra/entities';
import { UserRepository } from '@/infra/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async perform(): Promise<User[]> {
    return this.userRepo.findAll();
  }
}
