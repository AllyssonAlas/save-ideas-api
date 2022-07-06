import { Validation } from '@/presentation/protocols';
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/validators';
import { makeSignUpValidation } from '@/main/factories/validations';

jest.mock('@/presentation/validators/validation-composite');

describe('SignUpValidationFactory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation();
    const validations: Validation[] = [];

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field));
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
