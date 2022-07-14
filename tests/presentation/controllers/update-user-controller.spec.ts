import { UpdateUserController } from '@/presentation/controllers';

import { ValidationSpy } from '@/tests/presentation/mocks';

describe('UpdateUserController', () => {
  test('Should call Validation with correct values', async () => {
    const validationSpy = new ValidationSpy();
    const sut = new UpdateUserController(validationSpy);
    const mockRequest = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
    };

    await sut.handle(mockRequest);

    expect(validationSpy.input).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
    });
    expect(validationSpy.callsCount).toBe(1);
  });
});
