import { LoadUserByToken } from '@/domain/usecases';
import { HttpResponse, Middleware } from '@/presentation/protocols';
import { forbidden } from '@/presentation/helpers';
import { AccessDeniedError } from '@/presentation/errors';

export class AuthMiddleware implements Middleware {
  constructor(private readonly loadUserByToken: LoadUserByToken) {}

  async handle(request: any): Promise<HttpResponse> {
    await this.loadUserByToken.perform({ accessToken: request.accessToken });
    return Promise.resolve(forbidden(new AccessDeniedError()));
  }
}
