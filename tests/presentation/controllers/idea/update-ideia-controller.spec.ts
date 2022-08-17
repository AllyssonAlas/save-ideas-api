import { UpdateIdeaController } from '@/presentation/controllers';

import { ValidationSpy } from '@/tests/presentation/mocks';

const mockRequest = (): UpdateIdeaController.Request => ({
  ideaId: 'any_idea_id',
  title: 'other_title',
  description: 'other_description',
});

interface SutTypes {
  sut: UpdateIdeaController;
  validationSpy: ValidationSpy;
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = new UpdateIdeaController(validationSpy);
  return { sut, validationSpy };
};

describe('UpdateIdeaController', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut();
    const request = mockRequest();

    await sut.handle(request);

    expect(validationSpy.input).toEqual(request);
    expect(validationSpy.callsCount).toBe(1);
  });
});
