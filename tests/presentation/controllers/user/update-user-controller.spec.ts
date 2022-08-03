import { UpdateUserController } from '@/presentation/controllers';
import { EmailInUseError, InvalidParamError, MissingParamError } from '@/presentation/errors';
import { badRequest, forbidden, noContent, serverError } from '@/presentation/helpers';

import {
  ValidationSpy,
  LoadUserByIdUsecaseSpy,
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
  loadUserByIdUsecaseSpy: LoadUserByIdUsecaseSpy;
  updateUserUsecaseSpy: UpdateUserUsecaseSpy;
}

const makeSut = (): SutTypes => {
  const updateUserUsecaseSpy = new UpdateUserUsecaseSpy();
  const loadUserByIdUsecaseSpy = new LoadUserByIdUsecaseSpy();
  const validationSpy = new ValidationSpy();
  const sut = new UpdateUserController(validationSpy, loadUserByIdUsecaseSpy, updateUserUsecaseSpy);
  return { sut, validationSpy, loadUserByIdUsecaseSpy, updateUserUsecaseSpy };
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

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new MissingParamError('field');

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(badRequest(new MissingParamError('field')));
  });

  test('Should return 400 if Validation returns optional field missing', async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new MissingParamError('newPassword');
    const request = {
      userId: 'any_id',
      name: 'other_name',
      email: 'other_email@mail.com',
      password: '123456',
    };

    const httpResponse = await sut.handle(request);

    expect(httpResponse).toEqual(badRequest(new MissingParamError('newPassword')));
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
    const { sut, loadUserByIdUsecaseSpy } = makeSut();

    await sut.handle(mockRequest());

    expect(loadUserByIdUsecaseSpy.params).toEqual({ id: 'any_id' });
    expect(loadUserByIdUsecaseSpy.callsCount).toBe(1);
  });

  test('Should return 500 if LoadUserByIdUsecaseSpy throws', async () => {
    const { sut, loadUserByIdUsecaseSpy } = makeSut();
    jest.spyOn(loadUserByIdUsecaseSpy, 'perform').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 403 if invalid id is provided', async () => {
    const { sut, loadUserByIdUsecaseSpy } = makeSut();
    loadUserByIdUsecaseSpy.result = null;

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

  test('Should return 403 if UpdateUserUsecase returns success false and password as invalid field', async () => {
    const { sut, updateUserUsecaseSpy } = makeSut();
    updateUserUsecaseSpy.result = { success: false, invalidField: 'password' };

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('password')));
  });

  test('Should return 403 if UpdateUserUsecase returns success false and email as invalid field', async () => {
    const { sut, updateUserUsecaseSpy } = makeSut();
    updateUserUsecaseSpy.result = { success: false, invalidField: 'email' };

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(forbidden(new EmailInUseError()));
  });

  test('Should return 204 on success', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(noContent());
  });
});
