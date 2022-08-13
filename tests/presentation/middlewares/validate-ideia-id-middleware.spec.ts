import { ValidateIdeiaIdMiddleware } from '@/presentation/middlewares';
import { InvalidParamError, MissingParamError } from '@/presentation/errors';
import { forbidden, serverError } from '@/presentation/helpers';

import { LoadIdeiaByIdUsecaseSpy } from '@/tests/presentation/mocks';

const mockRequest = (): ValidateIdeiaIdMiddleware.Request => ({ ideiaId: 'any_ideia_id' });

interface SutTypes {
  sut: ValidateIdeiaIdMiddleware;
  loadIdeiaByIdUsecaseSpy: LoadIdeiaByIdUsecaseSpy;
}

const makeSut = (): SutTypes => {
  const loadIdeiaByIdUsecaseSpy = new LoadIdeiaByIdUsecaseSpy();
  const sut = new ValidateIdeiaIdMiddleware(loadIdeiaByIdUsecaseSpy);
  return { sut, loadIdeiaByIdUsecaseSpy };
};

describe('ValidateIdeiaIdMiddleware', () => {
  test('Should return 403 if there is no ideiaId on request', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(forbidden(new MissingParamError('ideiaId')));
  });

  test('Should call LoadIdeiaByIdUsescase with correct ideiaId', async () => {
    const { sut, loadIdeiaByIdUsecaseSpy } = makeSut();

    await sut.handle(mockRequest());

    expect(loadIdeiaByIdUsecaseSpy.params).toEqual({ ideiaId: 'any_ideia_id' });
  });

  test('Should return 500 if LoadIdeiaByIdUsescase throws', async () => {
    const { sut, loadIdeiaByIdUsecaseSpy } = makeSut();
    jest.spyOn(loadIdeiaByIdUsecaseSpy, 'perform').mockImplementation(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 403 if ideiaId is invalid', async () => {
    const { sut, loadIdeiaByIdUsecaseSpy } = makeSut();
    loadIdeiaByIdUsecaseSpy.result = null;

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('ideiaId')));
  });
});
