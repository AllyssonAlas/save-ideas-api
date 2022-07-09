import { EmailValidation } from '@/presentation/validators';
import { InvalidParamError } from '@/presentation/errors';

import { EmailValidatorSpy } from '@/tests/presentation/mocks';

interface SutTypes {
  sut: EmailValidation;
  emailValidatorSpy: EmailValidatorSpy;
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy();
  const sut = new EmailValidation('email', emailValidatorSpy);
  return { sut, emailValidatorSpy };
};

describe('EmailValidation', () => {
  test('Should returns an  error if EmailValidator returns false', () => {
    const { sut, emailValidatorSpy } = makeSut();
    emailValidatorSpy.isEmailValid = false;

    const error = sut.validate({ email: 'any_email@mail.com' });

    expect(error).toEqual(new InvalidParamError('email'));
  });

  test('Should call EmailValidator with correct value', () => {
    const { sut, emailValidatorSpy } = makeSut();

    sut.validate({ email: 'any_email@mail.com' });

    expect(emailValidatorSpy.email).toBe('any_email@mail.com');
    expect(emailValidatorSpy.callsCount).toBe(1);
  });

  test('Should throws 500 if EmailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut();
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });

    expect(sut.validate).toThrow();
  });
});
