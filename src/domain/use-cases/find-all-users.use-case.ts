import { FindAllUsersResponse } from '@/domain/dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllUsersUseCase {
  async perform(): Promise<FindAllUsersResponse> {
    return null;
  }
}
