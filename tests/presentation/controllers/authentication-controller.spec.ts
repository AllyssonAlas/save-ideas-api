import { AuthenticationController } from '@/presentation/controllers';
import { MissingParamError } from '@/presentation/errors';
import { badRequest, serverError } from '@/presentation/helpers';

import { AuthenticationUsecaseSpy, ValidationSpy } from '@/tests/presentation/mocks';

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
    const request = {
      email: 'any_email@mail.com',
      password: 'any_password',
    };

    await sut.handle(request);

    expect(validationSpy.input).toEqual(request);
    expect(validationSpy.callsCount).toBe(1);
  });

  test('Should call return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new MissingParamError('field');
    const request = {
      email: 'any_email@mail.com',
      password: 'any_password',
    };

    const httpResponse = await sut.handle(request);

    expect(httpResponse).toEqual(badRequest(new MissingParamError('field')));
  });

  test('Should return 500 if Validation throws', async () => {
    const { sut, validationSpy } = makeSut();
    jest.spyOn(validationSpy, 'validate').mockImplementation(() => {
      throw new Error();
    });
    const request = {
      email: 'any_email@mail.com',
      password: 'any_password',
    };

    const httpResponse = await sut.handle(request);

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should call AuthenticationUsecase with correct values', async () => {
    const { sut, authenticationUsecaseSpy } = makeSut();
    const request = {
      email: 'any_email@mail.com',
      password: 'any_password',
    };

    await sut.handle(request);

    expect(authenticationUsecaseSpy.params).toEqual(request);
    expect(authenticationUsecaseSpy.callsCount).toBe(1);
  });
});
