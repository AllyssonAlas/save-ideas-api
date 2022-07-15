import { Validation } from '@/presentation/protocols';
import { EmailValidatorAdapter } from '@/presentation/utils';
import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/presentation/validators';
import { makeUpdateUserValidation } from '@/main/factories/validations';

jest.mock('@/presentation/validators/validation-composite');

describe('UpdateUserValidationFactory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdateUserValidation();
    const validations: Validation[] = [];

    for (const field of ['id', 'name', 'email']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
