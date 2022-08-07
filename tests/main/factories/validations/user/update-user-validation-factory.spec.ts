import { Validation } from '@/presentation/protocols';
import { EmailValidatorAdapter } from '@/infra/gateways';
import {
  CompareFieldsValidation,
  EmailValidation,
  RelatedRequiredFieldsValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validations/validators';
import { makeUpdateUserValidation } from '@/main/factories/validations';

jest.mock('@/validations/validators/validation-composite');

describe('UpdateUserValidationFactory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdateUserValidation();
    const validations: Validation[] = [];

    for (const field of ['name', 'email']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(
      new RelatedRequiredFieldsValidation(['password', 'newPassword', 'newPasswordConfirmation']),
    );
    validations.push(new CompareFieldsValidation('newPassword', 'newPasswordConfirmation'));
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
