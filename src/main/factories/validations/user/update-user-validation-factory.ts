import { EmailValidatorAdapter } from '@/infra/gateways';
import { Validation } from '@/presentation/protocols';
import {
  CompareFieldsValidation,
  EmailValidation,
  RelatedRequiredFieldsValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validations/validators';

export const makeUpdateUserValidation = (): Validation => {
  const validations: Validation[] = [];
  for (const field of ['name', 'email']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(
    new RelatedRequiredFieldsValidation(['password', 'newPassword', 'newPasswordConfirmation']),
  );
  validations.push(new CompareFieldsValidation('newPassword', 'newPasswordConfirmation'));
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
