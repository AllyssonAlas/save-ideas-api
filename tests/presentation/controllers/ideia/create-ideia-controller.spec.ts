import { CreateIdeiaController } from '@/presentation/controllers';
import { InvalidParamError, MissingParamError } from '@/presentation/errors';
import { badRequest, forbidden, serverError } from '@/presentation/helpers';

import {
  ValidationSpy,
  LoadUserByIdUsecaseSpy,
  CreateIdeiaUsecaseSpy,
} from '@/tests/presentation/mocks';

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
  loadUserByIdUsecaseSpy: LoadUserByIdUsecaseSpy;
  createIdeiaUsecaseSpy: CreateIdeiaUsecaseSpy;
}

const makeSut = (): SutTypes => {
  const createIdeiaUsecaseSpy = new CreateIdeiaUsecaseSpy();
  const loadUserByIdUsecaseSpy = new LoadUserByIdUsecaseSpy();
  const validationSpy = new ValidationSpy();
  const sut = new CreateIdeiaController(
    validationSpy,
    loadUserByIdUsecaseSpy,
    createIdeiaUsecaseSpy,
  );
  return { sut, validationSpy, loadUserByIdUsecaseSpy, createIdeiaUsecaseSpy };
};

describe('CreateIdeiaController', () => {
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

  test('Should call LoadUserByIdUsecase with correct values', async () => {
    const { sut, loadUserByIdUsecaseSpy } = makeSut();

    await sut.handle(mockRequest());

    expect(loadUserByIdUsecaseSpy.params).toEqual({ id: 'any_id' });
    expect(loadUserByIdUsecaseSpy.callsCount).toBe(1);
  });

  test('Should return 500 if LoadUserByIdUsecaseSpy throws', async () => {
    const { sut, loadUserByIdUsecaseSpy } = makeSut();
    jest.spyOn(loadUserByIdUsecaseSpy, 'perform').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 403 if invalid id is provided', async () => {
    const { sut, loadUserByIdUsecaseSpy } = makeSut();
    loadUserByIdUsecaseSpy.result = null;

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('id')));
  });

  test('Should call CreateIdeiaUsecase with correct values', async () => {
    const { sut, createIdeiaUsecaseSpy } = makeSut();

    await sut.handle(mockRequest());

    expect(createIdeiaUsecaseSpy.params).toEqual({
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
    expect(createIdeiaUsecaseSpy.callsCount).toBe(1);
  });
});
