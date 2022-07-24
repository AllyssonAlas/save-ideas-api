import { AuthMiddleware } from '@/presentation/middlewares';
import { AccessDeniedError } from '@/presentation/errors';
import { forbidden } from '@/presentation/helpers';

import { LoadUserByTokenUsecaseSpy } from '@/tests/presentation/mocks';

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

    await sut.handle({ accessToken: 'any_token' });

    expect(loadUserByTokenUsecaseSpy.params).toEqual({ accessToken: 'any_token' });
  });
});
