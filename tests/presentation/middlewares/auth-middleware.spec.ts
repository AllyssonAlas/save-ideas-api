import { AuthMiddleware } from '@/presentation/middlewares';
import { AccessDeniedError } from '@/presentation/errors';
import { forbidden, ok, serverError } from '@/presentation/helpers';

import { LoadUserByTokenUsecaseSpy } from '@/tests/presentation/mocks';

const mockRequest = (): AuthMiddleware.Request => ({ accessToken: 'any_token' });

interface SutTypes {
  sut: AuthMiddleware;
  loadUserByTokenUsecaseSpy: LoadUserByTokenUsecaseSpy;
}

const makeSut = (): SutTypes => {
  const loadUserByTokenUsecaseSpy = new LoadUserByTokenUsecaseSpy();
  const sut = new AuthMiddleware(loadUserByTokenUsecaseSpy);
  return { sut, loadUserByTokenUsecaseSpy };
};

describe('AuthMiddleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('Should call LoadUserByToken with correct accessToken', async () => {
    const { sut, loadUserByTokenUsecaseSpy } = makeSut();

    await sut.handle(mockRequest());

    expect(loadUserByTokenUsecaseSpy.params).toEqual({ accessToken: 'any_token' });
  });

  test('Should return 500 if loadUserByTokenUsecaseSpy throws', async () => {
    const { sut, loadUserByTokenUsecaseSpy } = makeSut();
    jest.spyOn(loadUserByTokenUsecaseSpy, 'perform').mockImplementation(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 403 if LoadUserByToken returns null', async () => {
    const { sut, loadUserByTokenUsecaseSpy } = makeSut();
    loadUserByTokenUsecaseSpy.result = null;

    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('Should return 200 if LoadUserByToken returns an valid id', async () => {
    const { sut, loadUserByTokenUsecaseSpy } = makeSut();

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(ok({ userId: loadUserByTokenUsecaseSpy.result?.id }));
  });
});
