import { ValidationComposite } from '@/presentation/validators';
import { MissingParamError } from '@/presentation/errors';

import { ValidationSpy } from '@/tests/presentation/mocks';

interface SutTypes {
  sut: ValidationComposite;
  validationSpy: ValidationSpy;
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = new ValidationComposite([validationSpy]);
  return { sut, validationSpy };
};

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new MissingParamError('field');

    const error = sut.validate({ field: 'any_value' });

    expect(error).toEqual(new MissingParamError('field'));
  });
});
