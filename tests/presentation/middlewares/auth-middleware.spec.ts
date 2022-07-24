import { AuthMiddleware } from '@/presentation/middlewares';
import { AccessDeniedError } from '@/presentation/errors';
import { forbidden } from '@/presentation/helpers';

import { LoadUserByTokenUsecaseSpy } from '@/tests/presentation/mocks';

describe('AuthMiddleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const loadUserByTokenUsecaseSpy = new LoadUserByTokenUsecaseSpy();
    const sut = new AuthMiddleware(loadUserByTokenUsecaseSpy);

    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('Should call LoadUserByToken with correct accessToken', async () => {
    const loadUserByTokenUsecaseSpy = new LoadUserByTokenUsecaseSpy();
    const sut = new AuthMiddleware(loadUserByTokenUsecaseSpy);

    await sut.handle({ accessToken: 'any_token' });

    expect(loadUserByTokenUsecaseSpy.params).toEqual({ accessToken: 'any_token' });
  });
});
