import { UpdateIdea } from '@/domain/usecases';
import { Controller, Validation } from '@/presentation/protocols';
import { badRequest, serverError } from '@/presentation/helpers';

export class UpdateIdeaController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(request: UpdateIdeaController.Request): Promise<any> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      return Promise.resolve();
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace UpdateIdeaController {
  export type Request = Omit<UpdateIdea.Params & { ideaId: string }, 'id'>;
}
