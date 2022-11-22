import { User } from '@/domain/entities';

export type UserOutput = {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  cpf: {
    number: string;
    issuingTaxRegion: string;
    verifyingDigit: string;
  };
  birthDate: Date;
};

export class UserOutputMapper {
  static toOutput(entity: User): UserOutput {
    return entity.toJSON();
  }
}
