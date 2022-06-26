import { SignUpController } from '@/presentation/controllers';
import {
  InvalidParamError,
  MissingParamError,
  ServerError,
  EmailInUseError,
} from '@/presentation/errors';

import { EmailValidatorSpy, SignUpSpy } from '@/tests/presentation/mocks';

interface SutTypes {
  sut: SignUpController;
  emailValidatorSpy: EmailValidatorSpy;
  signUpSpy: SignUpSpy;
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy();
  const signUpSpy = new SignUpSpy();
  const sut = new SignUpController(emailValidatorSpy, signUpSpy);
  return { sut, emailValidatorSpy, signUpSpy };
};

describe('SignUpController', () => {
  test('Should 400 if no name is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@mail',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  test('Should 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  test('Should 400 if no password is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  test('Should 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail',
        password: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'));
  });

  test('Should 400 if password confirmation fails', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail',
        password: 'any_password',
        passwordConfirmation: 'invalid_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'));
  });

  test('Should 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorSpy } = makeSut();
    emailValidatorSpy.isEmailValid = false;
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  test('Should call EmailValidator with correct value', async () => {
    const { sut, emailValidatorSpy } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'valid_email@mail',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    await sut.handle(httpRequest);

    expect(emailValidatorSpy.email).toBe(httpRequest.body.email);
    expect(emailValidatorSpy.callsCount).toBe(1);
  });

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorSpy } = makeSut();
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'valid_email@mail',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

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
});