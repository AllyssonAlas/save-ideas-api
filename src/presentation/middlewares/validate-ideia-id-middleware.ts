import { LoadIdeiaById } from '@/domain/usecases';
import { HttpResponse, Middleware } from '@/presentation/protocols';
import { forbidden, serverError } from '@/presentation/helpers';
import { MissingParamError } from '@/presentation/errors';

export class ValidateIdeiaIdMiddleware implements Middleware {
  constructor(private readonly loadIdeiaById: LoadIdeiaById) {}

  async handle(request: ValidateIdeiaIdMiddleware.Request): Promise<HttpResponse> {
    try {
      if (request.ideiaId) {
        await this.loadIdeiaById.perform({ ideiaId: request.ideiaId });
      }
      return Promise.resolve(forbidden(new MissingParamError('ideiaId')));
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace ValidateIdeiaIdMiddleware {
  export type Request = {
    userId?: string;
    ideiaId?: string;
  };
}
