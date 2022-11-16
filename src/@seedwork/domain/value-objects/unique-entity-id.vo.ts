import { ValueObject } from '@/@seedwork/domain/value-objects';

export class UniqueEntityId extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id || UniqueEntityId.generateId());
  }

  private static generateId() {
    const ObjectId = (
      m = Math,
      d = Date,
      h = 16,
      s = (s: number) => m.floor(s).toString(h),
    ) =>
      s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
    return ObjectId();
  }
}
