import { SignUpController } from '@/presentation/controllers';
import { MissingParamError, ServerError, EmailInUseError } from '@/presentation/errors';

import { SignUpSpy, ValidationSpy } from '@/tests/presentation/mocks';

interface SutTypes {
  sut: SignUpController;
  signUpSpy: SignUpSpy;
  validationSpy: ValidationSpy;
}

const makeSut = (): SutTypes => {
  const signUpSpy = new SignUpSpy();
  const validationSpy = new ValidationSpy();
  const sut = new SignUpController(signUpSpy, validationSpy);
  return { sut, signUpSpy, validationSpy };
};

describe('SignUpController', () => {
  test('Should call SignUpUsecase with correct values', async () => {
    const { sut, signUpSpy } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    await sut.handle(httpRequest);

    expect(signUpSpy.params).toEqual({
      name: 'any_name',
      email: 'any_email@mail',
      password: 'any_password',
    });
    expect(signUpSpy.callsCount).toBe(1);
  });

  test('Should return 500 if SignUpUsecase throws', async () => {
    const { sut, signUpSpy } = makeSut();
    jest.spyOn(signUpSpy, 'perform').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 200 if valid is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(204);
    expect(httpResponse.body).toBeNull();
  });

  test('Should return 403 if invalid is provided', async () => {
    const { sut, signUpSpy } = makeSut();
    signUpSpy.result = false;
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(403);
    expect(httpResponse.body).toEqual(new EmailInUseError());
  });

  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'valid_email@mail',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    await sut.handle(httpRequest);

    expect(validationSpy.input).toEqual(httpRequest.body);
    expect(validationSpy.callsCount).toBe(1);
  });

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new MissingParamError('any_field');
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('any_field'));
  });
});
