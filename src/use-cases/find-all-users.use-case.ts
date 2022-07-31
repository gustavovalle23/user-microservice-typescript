import { AllUsersResponse } from '@/dtos';
import { UserRepository } from '@/infra/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async perform(): Promise<AllUsersResponse> {
    return this.userRepo.findAll();
  }
}
