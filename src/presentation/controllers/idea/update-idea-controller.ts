import { UpdateIdea } from '@/domain/usecases';
import { Controller, Validation } from '@/presentation/protocols';

export class UpdateIdeaController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(request: UpdateIdeaController.Request): Promise<any> {
    this.validation.validate(request);
    return Promise.resolve();
  }
}

export namespace UpdateIdeaController {
  export type Request = Omit<UpdateIdea.Params & { ideaId: string }, 'id'>;
}
