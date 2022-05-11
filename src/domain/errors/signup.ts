export class SignUpError extends Error {
  constructor() {
    super('Sign up failed');
    this.name = 'SignUpError';
  }
}
