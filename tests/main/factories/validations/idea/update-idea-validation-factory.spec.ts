import { Validation } from '@/presentation/protocols';
import {
  RequiredFieldValidation,
  ValidationComposite,
  ModelledFieldValidation,
} from '@/validations/validators';
import { makeUpdateIdeaValidation } from '@/main/factories/validations';

jest.mock('@/validations/validators/validation-composite');

describe('UpdateIdeaValidationFactory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdateIdeaValidation();
    const validations: Validation[] = [];

    for (const field of ['title', 'description']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new ModelledFieldValidation('features', ['name', 'description', 'finished']));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
