import { CreateIdeaController } from '@/presentation/controllers';
import { MissingParamError } from '@/presentation/errors';
import { badRequest, ok, serverError } from '@/presentation/helpers';

import { ValidationSpy, CreateIdeaUsecaseSpy } from '@/tests/presentation/mocks';

const mockRequest = (): CreateIdeaController.Request => ({
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
  sut: CreateIdeaController;
  validationSpy: ValidationSpy;
  createIdeaUsecaseSpy: CreateIdeaUsecaseSpy;
}

const makeSut = (): SutTypes => {
  const createIdeaUsecaseSpy = new CreateIdeaUsecaseSpy();
  const validationSpy = new ValidationSpy();
  const sut = new CreateIdeaController(validationSpy, createIdeaUsecaseSpy);
  return { sut, validationSpy, createIdeaUsecaseSpy };
};

describe('CreateIdeaController', () => {
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

  test('Should call CreateIdeaUsecase with correct values', async () => {
    const { sut, createIdeaUsecaseSpy } = makeSut();

    await sut.handle(mockRequest());

    expect(createIdeaUsecaseSpy.params).toEqual({
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
    expect(createIdeaUsecaseSpy.callsCount).toBe(1);
  });

  test('Should return 500 if CreateIdeaUsecase throws', async () => {
    const { sut, createIdeaUsecaseSpy } = makeSut();
    jest.spyOn(createIdeaUsecaseSpy, 'perform').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(
      ok({
        id: 'any_id',
        ownerId: 'any_user_id',
        title: 'any_title_idea',
        description: 'any_description_idea',
        features: [
          {
            name: 'any_feature_name',
            description: 'any_feature_description',
            finished: false,
          },
        ],
      }),
    );
  });
});
