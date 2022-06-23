export class EmailInUseError extends Error {
  constructor() {
    super('Email received is already in use');
    this.name = 'EmailInUseError';
  }
}
