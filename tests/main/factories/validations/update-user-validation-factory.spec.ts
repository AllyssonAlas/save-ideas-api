import { Validation } from '@/presentation/protocols';
import { EmailValidatorAdapter } from '@/presentation/utils';
import {
  CompareFieldsValidation,
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

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
