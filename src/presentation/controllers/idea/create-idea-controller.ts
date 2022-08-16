import { CreateIdea } from '@/domain/usecases';
import { Controller, Validation, HttpResponse } from '@/presentation/protocols';
import { badRequest, ok, serverError } from '@/presentation/helpers';

export class CreateIdeaController implements Controller {
  constructor(private readonly validation: Validation, private readonly createIdea: CreateIdea) {}

  async handle(request: CreateIdeaController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const ideaData = await this.createIdea.perform(request);
      return ok(ideaData);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace CreateIdeaController {
  export type Request = CreateIdea.Params;
}
