import { CreateIdeiaController } from '@/presentation/controllers';
import { MissingParamError } from '@/presentation/errors';
import { badRequest, serverError } from '@/presentation/helpers';

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
});
