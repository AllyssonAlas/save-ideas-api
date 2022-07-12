import { AuthenticationController } from '@/presentation/controllers';
import { MissingParamError } from '@/presentation/errors';
import { badRequest, serverError } from '@/presentation/helpers';

import { AuthenticationUsecaseSpy, ValidationSpy } from '@/tests/presentation/mocks';

const mockRequest = (): AuthenticationController.Request => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});

interface SutTypes {
  sut: AuthenticationController;
  validationSpy: ValidationSpy;
  authenticationUsecaseSpy: AuthenticationUsecaseSpy;
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const authenticationUsecaseSpy = new AuthenticationUsecaseSpy();
  const sut = new AuthenticationController(validationSpy, authenticationUsecaseSpy);
  return { sut, validationSpy, authenticationUsecaseSpy };
};

describe('AuthenticationController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut();

    await sut.handle(mockRequest());

    expect(validationSpy.input).toEqual({
      email: 'any_email@mail.com',
      password: 'any_password',
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

  test('Should call AuthenticationUsecase with correct values', async () => {
    const { sut, authenticationUsecaseSpy } = makeSut();

    await sut.handle(mockRequest());

    expect(authenticationUsecaseSpy.params).toEqual({
      email: 'any_email@mail.com',
      password: 'any_password',
    });
    expect(authenticationUsecaseSpy.callsCount).toBe(1);
  });

  test('Should return 500 if AuthenticationUsecase throws', async () => {
    const { sut, authenticationUsecaseSpy } = makeSut();
    jest.spyOn(authenticationUsecaseSpy, 'perform').mockImplementation(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
