import { Validation } from '@/presentation/protocols';
import { ValidationComposite, RequiredFieldValidation } from '@/presentation/validators';

export const makeAuthenticationValidation = (): Validation => {
  const validations: Validation[] = [];
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
