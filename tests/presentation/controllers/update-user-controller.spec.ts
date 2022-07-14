import { UpdateUserController } from '@/presentation/controllers';
import { InvalidParamError, MissingParamError } from '@/presentation/errors';
import { badRequest, forbidden, serverError } from '@/presentation/helpers';

import { ValidationSpy, LoadUserUsecaseSpy } from '@/tests/presentation/mocks';

const mockRequest = (): UpdateUserController.Request => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
});

interface SutTypes {
  sut: UpdateUserController;
  loadUserUsecaseSpy: LoadUserUsecaseSpy;
  validationSpy: ValidationSpy;
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const loadUserUsecaseSpy = new LoadUserUsecaseSpy();
  const sut = new UpdateUserController(validationSpy, loadUserUsecaseSpy);
  return { sut, validationSpy, loadUserUsecaseSpy };
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

  test('Should return 500 if Validation throws', async () => {
    const { sut, validationSpy } = makeSut();
    jest.spyOn(validationSpy, 'validate').mockImplementation(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should call LoadUserUsecase with correct values', async () => {
    const { sut, loadUserUsecaseSpy } = makeSut();

    await sut.handle(mockRequest());

    expect(loadUserUsecaseSpy.params).toEqual({ id: 'any_id' });
    expect(loadUserUsecaseSpy.callsCount).toBe(1);
  });

  test('Should return 500 if LoadUserUsecaseSpy throws', async () => {
    const { sut, loadUserUsecaseSpy } = makeSut();
    jest.spyOn(loadUserUsecaseSpy, 'perform').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 403 if invalid email is provided', async () => {
    const { sut, loadUserUsecaseSpy } = makeSut();
    loadUserUsecaseSpy.result = null;

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('id')));
  });
});
