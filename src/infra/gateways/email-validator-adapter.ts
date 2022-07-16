import validator from 'validator';

import { EmailValidator } from '@/validations/protocols';

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
