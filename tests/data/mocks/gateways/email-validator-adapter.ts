import { EmailValidator } from '@/validations/protocols';

export class EmailValidatorSpy implements EmailValidator {
  isEmailValid = true;
  email?: string;
  callsCount = 0;

  isValid(email: string): boolean {
    this.email = email;
    this.callsCount++;
    return this.isEmailValid;
  }
}
