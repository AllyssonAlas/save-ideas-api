import { UpdateUserController } from '@/presentation/controllers';
import { MissingParamError } from '@/presentation/errors';
import { badRequest, serverError } from '@/presentation/helpers';

import { ValidationSpy, UpdateUserUsecaseSpy } from '@/tests/presentation/mocks';

const mockRequest = (): UpdateUserController.Request => ({
  userId: 'any_id',
  name: 'other_name',
  email: 'any_email@mail.com',
});

interface SutTypes {
  sut: UpdateUserController;
  validationSpy: ValidationSpy;
  updateUserUsecaseSpy: UpdateUserUsecaseSpy;
}

const makeSut = (): SutTypes => {
  const updateUserUsecaseSpy = new UpdateUserUsecaseSpy();
  const validationSpy = new ValidationSpy();
  const sut = new UpdateUserController(validationSpy, updateUserUsecaseSpy);
  return { sut, validationSpy, updateUserUsecaseSpy };
};

describe('UpdateUserController', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut();
    const request = mockRequest();

    await sut.handle(request);

    expect(validationSpy.input).toEqual(request);
    expect(validationSpy.callsCount).toBe(1);
  });

  test('Should return 500 if Validation throws', async () => {
    const { sut, validationSpy } = makeSut();
    jest.spyOn(validationSpy, 'validate').mockImplementation(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should call return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new MissingParamError('field');

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(badRequest(new MissingParamError('field')));
  });

  test('Should call UpdateUserUsecase with correct values', async () => {
    const { sut, updateUserUsecaseSpy } = makeSut();

    await sut.handle(mockRequest());

    expect(updateUserUsecaseSpy.params).toEqual({
      userId: 'any_id',
      name: 'other_name',
      email: 'any_email@mail.com',
    });
    expect(updateUserUsecaseSpy.callsCount).toBe(1);
  });
});
