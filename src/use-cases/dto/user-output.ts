import { User } from '@/domain/entities';

export type UserOutput = {
  id: string;
  cpf: string;
  name: string;
  email: string;
  isActive: boolean;
  birthDate: Date;
};

export class UserOutputMapper {
  static toOutput(entity: User): UserOutput {
    return entity.toJSON();
  }
}
