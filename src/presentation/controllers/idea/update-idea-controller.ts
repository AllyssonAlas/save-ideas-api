import { UpdateIdea } from '@/domain/usecases';
import { Controller, Validation } from '@/presentation/protocols';
import { badRequest, noContent, serverError } from '@/presentation/helpers';

export class UpdateIdeaController implements Controller {
  constructor(private readonly validation: Validation, private readonly updateIdea: UpdateIdea) {}

  async handle(request: UpdateIdeaController.Request): Promise<any> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const { ideaId: id, ...ideaData } = request;
      await this.updateIdea.perform({ id, ...ideaData });
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace UpdateIdeaController {
  export type Request = Omit<UpdateIdea.Params & { ideaId: string }, 'id'>;
}
