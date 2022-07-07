import { Validation } from '@/presentation/protocols';
import { EmailValidatorAdapter } from '@/presentation/utils';
import {
  CompareFieldsValidation,
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
} from '@/presentation/validators';

export const makeSignUpValidation = (): Validation => {
  const validations: Validation[] = [];
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
