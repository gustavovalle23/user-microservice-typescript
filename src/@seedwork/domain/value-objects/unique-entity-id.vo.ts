import { ValueObject } from '@/@seedwork/domain/value-objects';

export class UniqueEntityId extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id || Math.floor(Math.random() * 100 + 1).toString());
  }
}
