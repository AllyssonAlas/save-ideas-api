import { Validation } from '@/presentation/protocols';
import { EmailValidatorAdapter } from '@/presentation/utils';
import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/presentation/validators';

export const makeUpdateUserValidation = (): Validation => {
  const validations: Validation[] = [];
  for (const field of ['id', 'name', 'email']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new CompareFieldsValidation('newPassword', 'newPasswordConfirmation'));
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
