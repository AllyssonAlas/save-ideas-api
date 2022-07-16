import { Validation } from '@/presentation/protocols';
import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
} from '@/validations/validators';
import { EmailValidatorAdapter } from '@/infra/gateways';

export const makeAuthenticationValidation = (): Validation => {
  const validations: Validation[] = [];
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
