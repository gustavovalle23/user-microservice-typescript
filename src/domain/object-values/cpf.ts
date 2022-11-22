export class Cpf {
  number: string;
  issuingTaxRegion: string;
  verifyingDigit: string;

  toString(): string {
    return this.number + this.issuingTaxRegion + this.verifyingDigit;
  }

  toStringFormated(): string {
    const cpfNumbers = this.toString();
    return cpfNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
