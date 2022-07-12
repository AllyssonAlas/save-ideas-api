import { AuthenticationController } from '@/presentation/controllers';

import { ValidationSpy } from '@/tests/presentation/mocks';

interface SutTypes {
  sut: AuthenticationController;
  validationSpy: ValidationSpy;
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = new AuthenticationController(validationSpy);
  return { sut, validationSpy };
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
});
