import { Validation } from '@/presentation/protocols';
import { EmailValidatorAdapter } from '@/infra/gateways';
import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validations/validators';

export const makeUpdateUserValidation = (): Validation => {
  const validations: Validation[] = [];
  for (const field of [
    'userId',
    'name',
    'email',
    'password',
    'newPassword',
    'newPasswordConfirmation',
  ]) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new CompareFieldsValidation('newPassword', 'newPasswordConfirmation'));
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
