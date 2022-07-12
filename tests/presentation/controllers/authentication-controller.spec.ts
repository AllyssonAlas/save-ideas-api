import { AuthenticationController } from '@/presentation/controllers';

import { ValidationSpy } from '@/tests/presentation/mocks';

describe('AuthenticationController', () => {
  test('Should call Validation with correct values', async () => {
    const validationSpy = new ValidationSpy();
    const sut = new AuthenticationController(validationSpy);
    const request = {
      email: 'any_email@mail.com',
      password: 'any_password',
    };

    await sut.handle(request);

    expect(validationSpy.input).toEqual(request);
    expect(validationSpy.callsCount).toBe(1);
  });
});
