import { LoadIdeiaById } from '@/domain/usecases';
import { HttpResponse, Middleware } from '@/presentation/protocols';
import { forbidden, ok, serverError } from '@/presentation/helpers';
import { InvalidParamError, MissingParamError } from '@/presentation/errors';

export class ValidateIdeiaIdMiddleware implements Middleware {
  constructor(private readonly loadIdeiaById: LoadIdeiaById) {}

  async handle(request: ValidateIdeiaIdMiddleware.Request): Promise<HttpResponse> {
    try {
      if (!request.ideiaId) {
        return forbidden(new MissingParamError('ideiaId'));
      }
      const ideia = await this.loadIdeiaById.perform({ ideiaId: request.ideiaId });
      if (!ideia || ideia.ownerId !== request.userId) {
        return forbidden(new InvalidParamError('ideiaId'));
      }
      return ok({ ideiaId: request.ideiaId });
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace ValidateIdeiaIdMiddleware {
  export type Request = {
    userId: string;
    ideiaId?: string;
  };
}
