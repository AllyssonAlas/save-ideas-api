import { Validation } from '@/presentation/protocols';
import { ValidationComposite, RequiredFieldValidation } from '@/presentation/validators';

export const makeSignUpValidation = (): Validation => {
  const validations: Validation[] = [];

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field));
  }

  return new ValidationComposite(validations);
};
