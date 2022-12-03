import { ValueObject } from '@/@shared/domain/value-objects';

type CpfProps = {
  number: string;
  issuingTaxRegion: string;
  verifyingDigit: string;
};

export class Cpf extends ValueObject {
  constructor(public readonly props: CpfProps) {
    super(props);
  }

  onlyNumbers(): string {
    return (
      this.props.number +
      this.props.issuingTaxRegion +
      this.props.verifyingDigit
    );
  }

  formated(): string {
    const cpfNumbers = this.toString();
    return cpfNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
