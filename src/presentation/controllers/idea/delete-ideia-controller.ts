import { DeleteIdeaById } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols';

export class DeleteIdeaController implements Controller {
  constructor(private readonly deleteIdeaById: DeleteIdeaById) {}

  async handle(request: DeleteIdeaController.Request): Promise<any> {
    await this.deleteIdeaById.perform(request);
  }
}

export namespace DeleteIdeaController {
  export type Request = DeleteIdeaById.Params;
}
