import { SignUpController } from '@/presentation/controllers';
import { badRequest, serverError, forbidden } from '@/presentation/helpers';
import { MissingParamError, EmailInUseError } from '@/presentation/errors';

import { SignUpSpy, ValidationSpy, AuthenticationUsecaseSpy } from '@/tests/presentation/mocks';

const mockRequest = (): SignUpController.Request => ({
  name: 'any_name',
  email: 'any_email@mail',
  password: 'any_password',
  passwordConfirmation: 'any_password',
});

interface SutTypes {
  sut: SignUpController;
  validationSpy: ValidationSpy;
  signUpSpy: SignUpSpy;
  authenticationUsecaseSpy: AuthenticationUsecaseSpy;
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const signUpSpy = new SignUpSpy();
  const authenticationUsecaseSpy = new AuthenticationUsecaseSpy();
  const sut = new SignUpController(validationSpy, signUpSpy, authenticationUsecaseSpy);
  return { sut, validationSpy, signUpSpy, authenticationUsecaseSpy };
};

describe('SignUpController', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut();
    const request = mockRequest();

    await sut.handle(request);

    expect(validationSpy.input).toEqual(request);
    expect(validationSpy.callsCount).toBe(1);
  });

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new MissingParamError('any_field');

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')));
  });

  test('Should return 500 if Validation throws', async () => {
    const { sut, validationSpy } = makeSut();
    jest.spyOn(validationSpy, 'validate').mockImplementation(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should call SignUpUsecase with correct values', async () => {
    const { sut, signUpSpy } = makeSut();

    await sut.handle(mockRequest());

    expect(signUpSpy.params).toEqual({
      name: 'any_name',
      email: 'any_email@mail',
      password: 'any_password',
    });
    expect(signUpSpy.callsCount).toBe(1);
  });

  test('Should return 403 if invalid email is provided', async () => {
    const { sut, signUpSpy } = makeSut();
    signUpSpy.result = { wasSigned: false };

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(forbidden(new EmailInUseError()));
  });

  test('Should return 500 if SignUpUsecase throws', async () => {
    const { sut, signUpSpy } = makeSut();
    jest.spyOn(signUpSpy, 'perform').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should call AuthenticationUsecase with correct values', async () => {
    const { sut, authenticationUsecaseSpy } = makeSut();

    await sut.handle(mockRequest());

    expect(authenticationUsecaseSpy.params).toEqual({
      email: 'any_email@mail',
      password: 'any_password',
    });
    expect(authenticationUsecaseSpy.callsCount).toBe(1);
  });

  test('Should return 500 if AuthenticationUsecase throws', async () => {
    const { sut, authenticationUsecaseSpy } = makeSut();
    jest.spyOn(authenticationUsecaseSpy, 'perform').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
