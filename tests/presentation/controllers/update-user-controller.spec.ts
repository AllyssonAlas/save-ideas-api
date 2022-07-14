import { UpdateUserController } from '@/presentation/controllers';

import { ValidationSpy } from '@/tests/presentation/mocks';

const mockRequest = (): UpdateUserController.Request => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
});

interface SutTypes {
  sut: UpdateUserController;
  validationSpy: ValidationSpy;
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = new UpdateUserController(validationSpy);
  return { sut, validationSpy };
};

describe('UpdateUserController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut();

    await sut.handle(mockRequest());

    expect(validationSpy.input).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
    });
    expect(validationSpy.callsCount).toBe(1);
  });
});
