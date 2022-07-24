import { LoadUserByToken } from '@/domain/usecases';
import { HttpResponse, Middleware } from '@/presentation/protocols';
import { forbidden, ok } from '@/presentation/helpers';
import { AccessDeniedError } from '@/presentation/errors';

export class AuthMiddleware implements Middleware {
  constructor(private readonly loadUserByToken: LoadUserByToken) {}

  async handle(request: any): Promise<HttpResponse> {
    if (request.accessToken) {
      const user = await this.loadUserByToken.perform({ accessToken: request.accessToken });
      if (user) {
        return ok({ userId: user.id });
      }
    }
    return forbidden(new AccessDeniedError());
  }
}
