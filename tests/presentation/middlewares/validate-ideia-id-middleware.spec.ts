import { ValidateIdeiaIdMiddleware } from '@/presentation/middlewares';
import { MissingParamError } from '@/presentation/errors';
import { forbidden } from '@/presentation/helpers';

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

describe('AuthMiddleware', () => {
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
});
