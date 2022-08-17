import { UpdateIdeaController } from '@/presentation/controllers';
import { MissingParamError } from '@/presentation/errors';
import { badRequest, serverError } from '@/presentation/helpers';

import { ValidationSpy, UpdateIdeaUsecaseSpy } from '@/tests/presentation/mocks';

const mockRequest = (): UpdateIdeaController.Request => ({
  ideaId: 'any_idea_id',
  title: 'other_title',
  description: 'other_description',
});

interface SutTypes {
  sut: UpdateIdeaController;
  validationSpy: ValidationSpy;
  updateIdeaUsecaseSpy: UpdateIdeaUsecaseSpy;
}

const makeSut = (): SutTypes => {
  const updateIdeaUsecaseSpy = new UpdateIdeaUsecaseSpy();
  const validationSpy = new ValidationSpy();
  const sut = new UpdateIdeaController(validationSpy, updateIdeaUsecaseSpy);
  return { sut, validationSpy, updateIdeaUsecaseSpy };
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

  test('Should call return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new MissingParamError('field');

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(badRequest(new MissingParamError('field')));
  });

  test('Should call UpdateIdeaUsecase with correct values', async () => {
    const { sut, updateIdeaUsecaseSpy } = makeSut();

    await sut.handle(mockRequest());

    expect(updateIdeaUsecaseSpy.params).toEqual({
      id: 'any_idea_id',
      title: 'other_title',
      description: 'other_description',
    });
    expect(updateIdeaUsecaseSpy.callsCount).toBe(1);
  });

  test('Should return 500 if UpdateIdeaUsecase throws', async () => {
    const { sut, updateIdeaUsecaseSpy } = makeSut();
    jest.spyOn(updateIdeaUsecaseSpy, 'perform').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
