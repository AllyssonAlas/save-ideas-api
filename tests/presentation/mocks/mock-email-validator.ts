import { EmailValidator } from '@/presentation/protocols';

export class EmailValidatorSpy implements EmailValidator {
  isEmailValid = true;
  email?: string;

  isValid(email: string): boolean {
    return this.isEmailValid;
  }
}
