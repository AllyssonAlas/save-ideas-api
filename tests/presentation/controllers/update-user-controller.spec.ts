import { UpdateUserController } from '@/presentation/controllers';
import { MissingParamError } from '@/presentation/errors';
import { badRequest } from '@/presentation/helpers';

import { ValidationSpy } from '@/tests/presentation/mocks';

const mockRequest = (): UpdateUserController.Request => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
});

interface SutTypes {
  sut: UpdateUserController;
  validationSpy: ValidationSpy;
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = new UpdateUserController(validationSpy);
  return { sut, validationSpy };
};

describe('UpdateUserController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut();

    await sut.handle(mockRequest());

    expect(validationSpy.input).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
    });
    expect(validationSpy.callsCount).toBe(1);
  });

  test('Should call return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new MissingParamError('field');

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(badRequest(new MissingParamError('field')));
  });
});
