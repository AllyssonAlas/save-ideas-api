import { UpdateUserController } from '@/presentation/controllers';
import { InvalidParamError, MissingParamError } from '@/presentation/errors';
import { badRequest, forbidden, noContent, serverError } from '@/presentation/helpers';

import {
  ValidationSpy,
  LoadUserUsecaseSpy,
  UpdateUserUsecaseSpy,
} from '@/tests/presentation/mocks';

const mockRequest = (): UpdateUserController.Request => ({
  userId: 'any_id',
  name: 'other_name',
  email: 'other_email@mail.com',
});

interface SutTypes {
  sut: UpdateUserController;
  validationSpy: ValidationSpy;
  loadUserUsecaseSpy: LoadUserUsecaseSpy;
  updateUserUsecaseSpy: UpdateUserUsecaseSpy;
}

const makeSut = (): SutTypes => {
  const updateUserUsecaseSpy = new UpdateUserUsecaseSpy();
  const loadUserUsecaseSpy = new LoadUserUsecaseSpy();
  const validationSpy = new ValidationSpy();
  const sut = new UpdateUserController(validationSpy, loadUserUsecaseSpy, updateUserUsecaseSpy);
  return { sut, validationSpy, loadUserUsecaseSpy, updateUserUsecaseSpy };
};

describe('UpdateUserController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut();

    await sut.handle(mockRequest());

    expect(validationSpy.input).toEqual({
      userId: 'any_id',
      name: 'other_name',
      email: 'other_email@mail.com',
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

  test('Should return 403 if invalid id is provided', async () => {
    const { sut, loadUserUsecaseSpy } = makeSut();
    loadUserUsecaseSpy.result = null;

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('id')));
  });

  test('Should call UpdateUserUsecase with correct values', async () => {
    const { sut, updateUserUsecaseSpy } = makeSut();

    await sut.handle(mockRequest());

    expect(updateUserUsecaseSpy.params).toEqual({
      id: 'any_id',
      name: 'other_name',
      email: 'other_email@mail.com',
      passwordHash: 'any_hashed_password',
    });
    expect(updateUserUsecaseSpy.callsCount).toBe(1);
  });

  test('Should call UpdateUserUsecase with newPassword', async () => {
    const { sut, updateUserUsecaseSpy } = makeSut();
    const mockRequestWithNewPassword = {
      ...mockRequest(),
      newPassword: 'other_password',
      password: 'any_password',
    };

    await sut.handle(mockRequestWithNewPassword);

    expect(updateUserUsecaseSpy.params).toEqual({
      id: 'any_id',
      name: 'other_name',
      email: 'other_email@mail.com',
      newPassword: 'other_password',
      password: 'any_password',
      passwordHash: 'any_hashed_password',
    });
    expect(updateUserUsecaseSpy.callsCount).toBe(1);
  });

  test('Should return 500 if UpdateUserUsecase throws', async () => {
    const { sut, updateUserUsecaseSpy } = makeSut();
    jest.spyOn(updateUserUsecaseSpy, 'perform').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 403 if UpdateUserUsecase returns wasSuccessful false', async () => {
    const { sut, updateUserUsecaseSpy } = makeSut();
    updateUserUsecaseSpy.result = { wasSuccessful: false };

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('password')));
  });

  test('Should return 204 on success', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(noContent());
  });
});
