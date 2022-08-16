import { DeleteIdeaById } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols';
import { noContent, serverError } from '@/presentation/helpers';

export class DeleteIdeaController implements Controller {
  constructor(private readonly deleteIdeaById: DeleteIdeaById) {}

  async handle(request: DeleteIdeaController.Request): Promise<any> {
    try {
      await this.deleteIdeaById.perform(request);
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace DeleteIdeaController {
  export type Request = DeleteIdeaById.Params;
}
