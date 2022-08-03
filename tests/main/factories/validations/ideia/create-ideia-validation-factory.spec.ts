import { Validation } from '@/presentation/protocols';
import {
  RequiredFieldValidation,
  ValidationComposite,
  ModelledFieldValidation,
} from '@/validations/validators';
import { makeCreateIdeiaValidation } from '@/main/factories/validations';

jest.mock('@/validations/validators/validation-composite');

describe('CreateIdeiaValidationFactory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeCreateIdeiaValidation();
    const validations: Validation[] = [];

    for (const field of ['userId', 'title', 'description']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new ModelledFieldValidation('features', ['name', 'description', 'finished']));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
