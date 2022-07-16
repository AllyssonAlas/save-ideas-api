import { Validation } from '@/presentation/protocols';
import { ValidationComposite, RequiredFieldValidation } from '@/validations/validators';
import { makeAuthenticationValidation } from '@/main/factories/validations';

jest.mock('@/validations/validators/validation-composite');

describe('AuthenticationValidationFactory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAuthenticationValidation();
    const validations: Validation[] = [];

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field));
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
