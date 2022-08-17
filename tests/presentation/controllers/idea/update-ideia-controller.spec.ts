import { UpdateIdeaController } from '@/presentation/controllers';
import { serverError } from '@/presentation/helpers';

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

  test('Should return 500 if Validation throws', async () => {
    const { sut, validationSpy } = makeSut();
    jest.spyOn(validationSpy, 'validate').mockImplementation(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
