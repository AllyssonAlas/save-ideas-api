import { Validation } from '@/presentation/protocols';
import {
  RequiredFieldValidation,
  ValidationComposite,
  ModelledFieldValidation,
} from '@/validations/validators';
import { makeCreateIdeaValidation } from '@/main/factories/validations';

jest.mock('@/validations/validators/validation-composite');

describe('CreateIdeaValidationFactory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeCreateIdeaValidation();
    const validations: Validation[] = [];

    for (const field of ['userId', 'title', 'description']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new ModelledFieldValidation('features', ['name', 'description', 'finished']));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
