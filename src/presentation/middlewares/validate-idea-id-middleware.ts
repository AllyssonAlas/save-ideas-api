import { LoadIdeaById } from '@/domain/usecases';
import { HttpResponse, Middleware } from '@/presentation/protocols';
import { forbidden, ok, serverError } from '@/presentation/helpers';
import { InvalidParamError } from '@/presentation/errors';

export class ValidateIdeaIdMiddleware implements Middleware {
  constructor(private readonly loadIdeaById: LoadIdeaById) {}

  async handle(request: ValidateIdeaIdMiddleware.Request): Promise<HttpResponse> {
    try {
      const idea = await this.loadIdeaById.perform({ ideaId: request.ideaId });
      if (!idea || idea.ownerId !== request.userId) {
        return forbidden(new InvalidParamError('ideaId'));
      }
      return ok({ ideaId: request.ideaId });
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace ValidateIdeaIdMiddleware {
  export type Request = {
    userId: string;
    ideaId: string;
  };
}
