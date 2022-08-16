import { Validation } from '@/presentation/protocols';
import {
  RequiredFieldValidation,
  ValidationComposite,
  ModelledFieldValidation,
} from '@/validations/validators';

export const makeCreateIdeaValidation = (): Validation => {
  const validations: Validation[] = [];

  for (const field of ['userId', 'title', 'description']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new ModelledFieldValidation('features', ['name', 'description', 'finished']));

  return new ValidationComposite(validations);
};
