import { AuthMiddleware } from '@/presentation/middlewares';
import { AccessDeniedError } from '@/presentation/errors';
import { forbidden } from '@/presentation/helpers';

describe('AuthMiddleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const sut = new AuthMiddleware();

    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });
});
