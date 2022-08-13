import { ValidateIdeiaIdMiddleware } from '@/presentation/middlewares';
import { InvalidParamError, MissingParamError } from '@/presentation/errors';
import { forbidden, ok, serverError } from '@/presentation/helpers';

import { LoadIdeiaByIdUsecaseSpy } from '@/tests/presentation/mocks';

const mockRequest = (): ValidateIdeiaIdMiddleware.Request => ({
  ideiaId: 'any_ideia_id',
  userId: 'any_user_id',
});

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

    const httpResponse = await sut.handle({ userId: 'any_user_id' });

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

  test('Should return 403 if ideia ownerId is different from userId', async () => {
    const { sut, loadIdeiaByIdUsecaseSpy } = makeSut();
    loadIdeiaByIdUsecaseSpy.result!.ownerId = 'other_user_id';

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('ideiaId')));
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(ok({ ideiaId: 'any_ideia_id' }));
  });
});
