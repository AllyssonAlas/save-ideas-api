import { CreateIdeiaController } from '@/presentation/controllers';

import { ValidationSpy } from '@/tests/presentation/mocks';

const mockRequest = (): CreateIdeiaController.Request => ({
  userId: 'any_id',
  title: 'any_title',
  description: 'any_description',
  features: [
    {
      name: 'any_feature_name',
      description: 'any_feature_description',
      finished: false,
    },
  ],
});

interface SutTypes {
  sut: CreateIdeiaController;
  validationSpy: ValidationSpy;
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = new CreateIdeiaController(validationSpy);
  return { sut, validationSpy };
};

describe('CreateIdeiaController', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut();
    const request = mockRequest();

    await sut.handle(request);

    expect(validationSpy.input).toEqual(request);
    expect(validationSpy.callsCount).toBe(1);
  });
});
