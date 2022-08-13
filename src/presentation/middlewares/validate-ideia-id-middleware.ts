import { HttpResponse, Middleware } from '@/presentation/protocols';
import { forbidden } from '@/presentation/helpers';
import { MissingParamError } from '@/presentation/errors';

export class ValidateIdeiaIdMiddleware implements Middleware {
  constructor() {}

  async handle(request: ValidateIdeiaIdMiddleware.Request): Promise<HttpResponse> {
    return Promise.resolve(forbidden(new MissingParamError('ideiaId')));
  }
}

export namespace ValidateIdeiaIdMiddleware {
  export type Request = {
    userId?: string;
    ideiaId?: string;
  };
}
