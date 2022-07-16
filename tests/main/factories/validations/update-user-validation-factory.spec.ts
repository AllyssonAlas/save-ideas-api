import { Validation } from '@/presentation/protocols';
import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validations/validators';
import { EmailValidatorAdapter } from '@/infra/gateways';
import { makeUpdateUserValidation } from '@/main/factories/validations';

jest.mock('@/validations/validators/validation-composite');

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
