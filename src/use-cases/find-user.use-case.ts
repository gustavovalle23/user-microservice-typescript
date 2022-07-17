import { User } from '@/infra/entities';
import { UserRepository } from '@/infra/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async perform(userId: string): Promise<User> {
    return this.userRepo.findOne(userId);
  }
}
