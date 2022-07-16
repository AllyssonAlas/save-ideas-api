import { Validation } from '@/presentation/protocols';
import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
} from '@/validations/validators';
import { EmailValidatorAdapter } from '@/infra/gateways';
import { makeAuthenticationValidation } from '@/main/factories/validations';

jest.mock('@/validations/validators/validation-composite');

describe('AuthenticationValidationFactory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAuthenticationValidation();
    const validations: Validation[] = [];

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
