import { ValidationComposite } from '@/validations/validators';
import { MissingParamError } from '@/presentation/errors';

import { ValidationSpy } from '@/tests/presentation/mocks';

interface SutTypes {
  sut: ValidationComposite;
  validationSpies: ValidationSpy[];
}

const makeSut = (): SutTypes => {
  const validationSpies = [new ValidationSpy(), new ValidationSpy()];
  const sut = new ValidationComposite(validationSpies);
  return { sut, validationSpies };
};

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationSpies } = makeSut();
    validationSpies[0].error = new MissingParamError('field');

    const error = sut.validate({ field: 'any_value' });

    expect(error).toEqual(new MissingParamError('field'));
  });

  test('Should return the first error if more than one validation fails', () => {
    const { sut, validationSpies } = makeSut();
    validationSpies[0].error = new Error();
    validationSpies[1].error = new MissingParamError('field');

    const error = sut.validate({ field: 'any_value' });

    expect(error).toEqual(new Error());
  });

  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut();

    const error = sut.validate({ field: 'any_value' });

    expect(error).toBeFalsy();
  });
});
