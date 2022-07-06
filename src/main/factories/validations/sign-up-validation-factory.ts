import { Validation } from '@/presentation/protocols';
import {
  CompareFieldsValidation,
  ValidationComposite,
  RequiredFieldValidation,
} from '@/presentation/validators';

export const makeSignUpValidation = (): Validation => {
  const validations: Validation[] = [];
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
  return new ValidationComposite(validations);
};
